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

// Shows up to 10 rows; the rest are reached by scrolling inside the table.
export default function FileList({ files, onRemove }: FileListProps) {
  const { t } = useLanguage()

  if (files.length === 0) return null

  return (
    <div className="file-table-wrapper">
      <table className="file-table">
        <thead>
          <tr>
            <th scope="col">{t('columnType')}</th>
            <th scope="col">{t('columnName')}</th>
            <th scope="col" className="file-size">
              {t('columnSize')}
            </th>
            <th scope="col">
              <span className="visually-hidden">{t('columnActions')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={`${file.name}-${index}`}>
              <td>
                <span className="file-kind">{t(kindOf(file))}</span>
              </td>
              <td className="file-name" title={file.name}>
                {file.name}
              </td>
              <td className="file-size">{formatSize(file.size)}</td>
              <td className="file-actions">
                <button
                  type="button"
                  className="btn-icon"
                  aria-label={`${t('remove')} ${file.name}`}
                  onClick={() => onRemove(index)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
