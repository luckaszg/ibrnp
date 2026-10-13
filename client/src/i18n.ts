import { createContext, useContext } from 'react'

export type Language = 'es' | 'en'

export const translations = {
  es: {
    appTitle: 'Editor de video',
    languageLabel: 'Idioma',
    uploadTitle: 'Subir archivos',
    uploadSubtitle: 'Agrega los archivos de video y audio que quieres procesar.',
    addVideo: 'Agregar video',
    addAudio: 'Agregar audio',
    addImages: 'Agregar imágenes',
    videoRequired: 'Se necesita al menos un video para comenzar.',
    start: 'Comenzar',
    processingTitle: 'En progreso',
    processingSubtitle: 'Tu video se está procesando.',
    previewTitle: 'Vista previa',
    download: 'Descargar',
    changesTitle: '¿Necesitas más cambios?',
    changesLabel: 'Describe qué más hay que hacer.',
    changesPlaceholder: 'p. ej. Agrega la música de introducción y coloca el logo en la esquina superior',
    submitChanges: 'Enviar cambios',
    remove: 'Quitar',
    kindVideo: 'Video',
    kindAudio: 'Audio',
    kindImage: 'Imagen',
    kindFile: 'Archivo',
  },
  en: {
    appTitle: 'Video Editor',
    languageLabel: 'Language',
    uploadTitle: 'Upload media',
    uploadSubtitle: 'Add the video and audio files you want to process.',
    addVideo: 'Add video',
    addAudio: 'Add audio',
    addImages: 'Add images',
    videoRequired: 'At least one video is required to start.',
    start: 'Start',
    processingTitle: 'In progress',
    processingSubtitle: 'Your video is being processed.',
    previewTitle: 'Preview',
    download: 'Download',
    changesTitle: 'Need more changes?',
    changesLabel: 'Describe what else needs to be done.',
    changesPlaceholder: 'e.g. Add the intro music and place the logo in the top corner',
    submitChanges: 'Submit changes',
    remove: 'Remove',
    kindVideo: 'Video',
    kindAudio: 'Audio',
    kindImage: 'Image',
    kindFile: 'File',
  },
} satisfies Record<Language, Record<string, string>>

export type TranslationKey = keyof (typeof translations)['es']

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
