import { useLanguage, type Language } from '../i18n'

const options: { value: Language; label: string }[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
]

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="language-toggle" role="group" aria-label={t('languageLabel')}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === language ? 'active' : undefined}
          aria-pressed={option.value === language}
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
