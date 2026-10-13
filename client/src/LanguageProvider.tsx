import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext, translations, type Language, type TranslationKey } from './i18n'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    document.documentElement.lang = language
    document.title = translations[language].appTitle
  }, [language])

  const t = (key: TranslationKey) => translations[language][key]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
