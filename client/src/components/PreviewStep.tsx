import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { ChangeRequest } from '../types'
import FileList from './FileList'
import { useLanguage } from '../i18n'

interface PreviewStepProps {
  videoUrl: string
  downloadName: string
  onRequestChanges: (request: ChangeRequest) => void
}

export default function PreviewStep({ videoUrl, downloadName, onRequestChanges }: PreviewStepProps) {
  const { t } = useLanguage()
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])

  function handleSelect(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? [])
    setFiles((current) => [...current, ...selected])
    event.target.value = ''
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onRequestChanges({ description: description.trim(), files })
  }

  return (
    <section className="card">
      <h2>{t('previewTitle')}</h2>
      <video className="preview-video" src={videoUrl} controls />

      <a className="btn btn-primary" href={videoUrl} download={downloadName}>
        {t('download')}
      </a>

      <form className="changes-form" onSubmit={handleSubmit}>
        <h3>{t('changesTitle')}</h3>
        <label htmlFor="description" className="muted">
          {t('changesLabel')}
        </label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t('changesPlaceholder')}
        />

        <div className="upload-actions">
          <label className="btn btn-secondary">
            {t('addAudio')}
            <input type="file" accept="audio/*" multiple hidden onChange={handleSelect} />
          </label>
          <label className="btn btn-secondary">
            {t('addVideo')}
            <input type="file" accept="video/*" multiple hidden onChange={handleSelect} />
          </label>
          <label className="btn btn-secondary">
            {t('addImages')}
            <input type="file" accept="image/*" multiple hidden onChange={handleSelect} />
          </label>
        </div>

        <FileList
          files={files}
          onRemove={(index) => setFiles((current) => current.filter((_, i) => i !== index))}
        />

        <button type="submit" className="btn btn-accent" disabled={description.trim() === ''}>
          {t('submitChanges')}
        </button>
      </form>
    </section>
  )
}
