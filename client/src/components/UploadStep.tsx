import type { ChangeEvent } from 'react'
import FileList from './FileList'
import { useLanguage } from '../i18n'

interface UploadStepProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  onStart: () => void
}

export default function UploadStep({ files, onFilesChange, onStart }: UploadStepProps) {
  const { t } = useLanguage()
  const hasVideo = files.some((file) => file.type.startsWith('video/'))

  function handleSelect(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? [])
    onFilesChange([...files, ...selected])
    event.target.value = ''
  }

  return (
    <section className="card">
      <h2>{t('uploadTitle')}</h2>
      <p className="muted">{t('uploadSubtitle')}</p>

      <div className="upload-actions">
        <label className="btn btn-secondary">
          {t('addVideo')}
          <input type="file" accept="video/*" multiple hidden onChange={handleSelect} />
        </label>
        <label className="btn btn-secondary">
          {t('addAudio')}
          <input type="file" accept="audio/*" multiple hidden onChange={handleSelect} />
        </label>
      </div>

      <FileList
        files={files}
        onRemove={(index) => onFilesChange(files.filter((_, i) => i !== index))}
      />

      {!hasVideo && <p className="hint">{t('videoRequired')}</p>}

      <button type="button" className="btn btn-primary" disabled={!hasVideo} onClick={onStart}>
        {t('start')}
      </button>
    </section>
  )
}
