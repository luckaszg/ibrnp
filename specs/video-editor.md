# SPEC — IBRNP Agentic Video Editing Platform

**Version:** v1 (Foundation / Setup)
**Status:** Draft
**Last updated:** 2026-10-09

---

## 1. Overview

A simple web platform where a user uploads video and/or audio files and requests edits that are performed automatically by AI. Typical edits include synchronizing an external audio track with a video, muting the original video audio, and adding intro images with fade-in / fade-out animations.

**v1 delivers the full application skeleton — everything except the logic that actually performs the edits.** Uploads, project management, edit configuration, job lifecycle, previews, downloads and the UI are all built and working end to end, but the processing step is a stub that returns a placeholder result. Later versions plug real processing into that stub without changing the surrounding system.

> Out of scope for this document: how the AI performs the work (integration approach, protocols, models, prompts). This spec only defines the contract the processing layer must satisfy.

---

## 2. Goals & Non-Goals

### Goals (v1)
- Users can create projects and upload video, audio and image assets.
- Jobs move through a complete, observable lifecycle (queued → processing → done/failed).
- A clear, stable **Processor interface** exists so real edit logic can be added later.
- Users can preview inputs and download outputs.
- The system is deployable, configurable and testable.

### Non-Goals (v1)
- Actual audio sync, muting, image overlay, or any media transformation.
- AI integration of any kind.
- Video summaries, transcription, or other analysis features (see §11 Roadmap).
- Multi-user collaboration, sharing, billing.
- Timeline-based manual editing (this is not a traditional NLE).

---

## 3. Users & Core Use Case

**Primary user:** A content creator who wants quick, repeatable edits without using editing software.

**Core flow:**
1. User creates a project.
2. User uploads a video, an audio track, and (optionally) one or more images.
3. User submits the job.
4. User watches the job status update.
5. User previews and downloads the result.

In v1, step 5 yields a placeholder output (see §7.3).

---

## 4. Functional Requirements

### 4.1 Assets (Uploads)
| ID | Requirement |
|----|-------------|
| A-1 | User can upload **video** files (minimum: MP4, MOV, WebM). |
| A-2 | User can upload **audio** files (minimum: MP3, WAV, M4A, AAC). |
| A-3 | User can upload **image** files (minimum: PNG, JPG, WebP). |
| A-4 | Uploads support files up to a configurable size limit (default: 10 GB video, 200 MB audio, 20 MB image). |
| A-5 | Large uploads are resumable / chunked, with a visible progress indicator. |
| A-6 | On upload, the system validates type and extracts metadata: duration, resolution, frame rate, codecs, audio channels, sample rate, file size. |
| A-7 | Invalid or corrupt files are rejected with a clear error message. |
| A-8 | Video assets get a generated thumbnail. |
| A-9 | User can preview any asset in the browser (player for video/audio, viewer for images). |
| A-10 | User can delete an asset not referenced by a running job. |

### 4.2 Edit Operations (Configuration only in v1)
Each job contains an ordered list of operations. v1 defines the operations, their parameters and validation — not their execution.

### 4.3 Jobs
| ID | Requirement |
|----|-------------|
| J-1 | Submitting a configured edit creates a job tied to the project. |
| J-2 | Job states: `queued`, `processing`, `completed`, `failed`, `cancelled`. |
| J-3 | Jobs are processed asynchronously by a background worker, never in the request cycle. |
| J-4 | Job progress (0–100%) and current step are reported and shown in the UI in near real time. |
| J-5 | User can cancel a `queued` or `processing` job. |
| J-6 | Failed jobs record an error message and which operation failed; user can retry. |
| J-7 | Each job keeps a log of events (state changes, step start/end, errors) visible to the user. |
| J-8 | Jobs are immutable once submitted; editing means creating a new job (optionally cloned from an old one). |

### 4.4 Outputs
| ID | Requirement |
|----|-------------|
| R-1 | A completed job produces one output file (video) stored as a project asset of type `output` with the same title as the uploaded video. |
| R-2 | User can preview and download outputs. |
| R-3 | If not satisfactory, user can add some description on why the video is not ok and what is needed to be done. |

### 4.6 Settings
| ID | Requirement |
|----|-------------|
| S-1 | Default output format settings: container (MP4), resolution (match source), quality preset. |
| S-2 | Default parameters for operations (e.g. default fade durations). |

---

## 5. The Processor Contract

This is the seam where real editing logic is added in later versions. v1 implements it with a stub.

### 5.1 Interface (language-agnostic)

```
Processor
  supports(operation_name) -> bool
  run(job_context) -> ProcessorResult

job_context
  job_id
  operations[]        # ordered, validated, with resolved parameters
  inputs{}            # asset references with metadata and local/readable paths
  workspace_path      # scratch directory for this job
  report_progress(percent, step_label)
  is_cancelled() -> bool
  log(level, message)

ProcessorResult
  status: completed | failed
  output_path?        # present on success
  error?              # { operation, message } on failure
  metadata?           # free-form, stored with the job
```

### 5.2 Rules
- The worker owns the job lifecycle; processors only do work and report back.
- Processors must check `is_cancelled()` between steps and stop cleanly.
- Processors must not write outside `workspace_path`.
- The workspace is deleted after the job finishes (configurable for debugging).
- One processor may handle the whole pipeline, or the worker may dispatch per operation — both must be possible.

### 5.3 v1 Stub Behaviour
- Accepts every registered operation.
- Simulates progress through each operation (configurable delay per step).
- Produces a placeholder output: a copy of the input video, unchanged.
- Can be configured to fail on a specific operation, for testing error paths.

---

## 6. User Interface

### 6.1 Screens
1. **Project view**
   - Assets panel: upload area (drag & drop), list with thumbnails, type, duration, size.
   - Edit builder: add operations, set parameters, assign input assets, reorder, apply preset, submit.
   - Jobs panel: list of jobs with status, progress bar, timestamps, cancel/retry/clone actions.
2. **Job detail** — operations summary, inputs, live progress, event log, output preview & download.
3. **Presets** — list, create, edit, delete.
4. **Settings** — output defaults and operation defaults.

### 6.2 UX Requirements
- Responsive; usable on desktop first, functional on tablet and phones.
- All long-running actions (upload, job) show progress and never block the UI.
- Errors are shown inline in plain language.
- Empty states guide the user to the next step (e.g. "Upload a video to get started").

---

## 7. Data Model

```
Asset
  id, kind: video | audio | image | output
  original_filename, storage_key, mime_type, size_bytes
  metadata: { duration_ms, width, height, fps, video_codec,
              audio_codec, channels, sample_rate }
  thumbnail_key?, created_at

Preset
  id, name, operations[]  (same shape as Job.operations)

Job
  id, status, progress, current_step
  operations[]: { name, params{}, inputs{ role -> asset_id } }
  output_asset_id?, error?: { operation, message }
  created_at, started_at?, finished_at?

JobEvent
  id, job_id, timestamp, level: info | warn | error, message
```

---

## 8. API (high level)

REST-style, JSON. Real-time job updates via WebSocket or Server-Sent Events.

```
Assets      POST     /assets (chunked/resumable)
            GET      assets
            GET/DELETE /assets/:id        GET /assets/:id/download
Operations  GET      /operations           # registry with parameter schemas
Jobs        POST     /projects/:id/jobs    # validate + enqueue
            GET      /projects/:id/jobs
            GET      /jobs/:id             GET /jobs/:id/events
            POST     /jobs/:id/cancel      POST /jobs/:id/retry
            POST     /jobs/:id/clone
            (stream) /jobs/:id/stream
Presets     GET/POST /presets              GET/PATCH/DELETE /presets/:id
Settings    GET/PATCH /settings
```

All errors return `{ "error": { "code", "message", "details?" } }`.

---

## 9. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| Storage | Media stored in a pluggable storage backend (local disk for dev, object storage for prod), selected by config. |
| Queue | Jobs run on a background worker with a persistent queue; worker restarts must not lose jobs. Jobs interrupted mid-run are marked `failed` with a clear reason. |
| Concurrency | Max concurrent jobs is configurable (default 1 per worker). |
| Config | All limits, paths, and backends are set via environment variables; a `.env.example` documents them. |
| Observability | Structured logs for API and worker; health-check endpoint for each service. |
| Security | Validate file types by content, not extension. Sanitize filenames. Downloads served via short-lived signed URLs or authenticated routes. |
| Auth | v1 is single-user; the codebase leaves a clear place to add authentication later. |
| Cleanup | Orphaned uploads and expired workspaces are cleaned up by a scheduled task. |
| Testing | Unit tests for operation validation and registry; integration tests for upload → job → (stub) output → download; stub failure path tested. |
| Dev setup | One command brings up the full stack locally (e.g. containers), including a sample media file for testing. |

---

## 10. v1 Acceptance Criteria

v1 is done when:
1. A user can create a project, upload a video, an audio file and two images, and see their metadata and previews.
2. The user can build a job with `sync_audio`, `mute_video` and `add_intro_images`, with parameters rendered from the operation registry and validated.
3. Submitting the job shows live progress through each operation, driven by the stub processor.
4. The job completes and the placeholder output can be previewed and downloaded.
5. A job configured to fail (stub test mode) shows the failed operation and error, and can be retried.
6. A running job can be cancelled.
7. A preset can be saved and applied to another project.
8. The full stack starts locally with one command and the test suite passes.

---

## 11. Roadmap (beyond v1)

- **v2 — Core processing:** implement the Processor for `sync_audio`, `mute_video`, `replace_audio`, `add_intro_images`.
- **v3 — Analysis tools:** video summary, transcription / subtitles, scene detection.
- **Later:** more operations (trim, outro images, text overlays, background music ducking), output format options, multi-user accounts, sharing.

---

## 12. Open Questions

- Is the platform single-user (personal tool) long term, or should v1 already assume accounts?
- Maximum expected video length and size?
- Should outputs ever be in formats other than MP4?
- Is the edit request purely form-based, or will users also describe edits in natural language? (Affects whether a free-text field is added to the edit builder in v1.)
- Hosting target (self-hosted server, cloud provider)?
