import { useLanguage, type TranslationKey } from '../i18n'

interface FileListProps {
  files: File[]
  onRemove: (index: number) => void
}

function kindOf(file: File): TranslationKey {
  if (file.type.startsWith('video/')) return 'kindVideo'
  if (file.type.startsWith('audio/')) return 'kindAudio'
  if (file.type.startsWith('image/')) return 'kindImage'
  return 'kindFile'
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileList({ files, onRemove }: FileListProps) {
  const { t } = useLanguage()

  if (files.length === 0) return null

  return (
    <ul className="file-list">
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="file-item">
          <span className="file-kind">{t(kindOf(file))}</span>
          <span className="file-name" title={file.name}>
            {file.name}
          </span>
          <span className="file-size">{formatSize(file.size)}</span>
          <button
            type="button"
            className="btn-icon"
            aria-label={`${t('remove')} ${file.name}`}
            onClick={() => onRemove(index)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}
