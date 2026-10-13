import { useEffect, useRef } from 'react'
import type { ReadProgress } from '../readFiles'
import { useLanguage } from '../i18n'

interface ReadingModalProps {
  progress: ReadProgress | null
  onCancel: () => void
}

function percent(done: number, total: number): number {
  return total === 0 ? 100 : Math.round((done / total) * 100)
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="progress-row">
      <div
        className="progress"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="progress-value">{value}%</span>
    </div>
  )
}

export default function ReadingModal({ progress, onCancel }: ReadingModalProps) {
  const { t } = useLanguage()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelButtonRef.current?.focus()
  }, [])

  const total = progress ? percent(progress.totalBytesRead, progress.totalBytes) : 0
  const current = progress ? percent(progress.fileBytesRead, progress.fileSize) : 0
  const fileLabel = progress
    ? t('readingFile', {
        current: progress.fileIndex + 1,
        total: progress.fileCount,
        name: progress.fileName,
      })
    : ''

  return (
    <div className="modal-backdrop">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reading-title"
        onKeyDown={(event) => event.key === 'Escape' && onCancel()}
      >
        <h2 id="reading-title">{t('readingTitle')}</h2>

        <div className="modal-section">
          <p className="modal-label">{t('readingTotal')}</p>
          <ProgressBar value={total} label={t('readingTotal')} />
        </div>

        <div className="modal-section">
          <p className="modal-label file-name" title={progress?.fileName}>
            {fileLabel}
          </p>
          <ProgressBar value={current} label={fileLabel} />
          {progress && (
            <p className="hint">
              {t('readingChunk', {
                current: progress.chunkIndex + 1,
                total: progress.chunkCount,
              })}
            </p>
          )}
        </div>

        <button
          ref={cancelButtonRef}
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  )
}
