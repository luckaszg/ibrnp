import { useEffect, useMemo, useRef, useState } from 'react'
import type { Step } from './types'
import { simulateProcessing } from './mockProcessing'
import UploadStep from './components/UploadStep'
import ProcessingStep from './components/ProcessingStep'
import PreviewStep from './components/PreviewStep'
import LanguageToggle from './components/LanguageToggle'
import { useLanguage } from './i18n'

export default function App() {
  const { t } = useLanguage()
  const [step, setStep] = useState<Step>('upload')
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState(0)
  const cancelRef = useRef<(() => void) | null>(null)

  // Until the server exists, the "final" video is the first uploaded video.
  const video = files.find((file) => file.type.startsWith('video/'))
  const videoUrl = useMemo(() => (video ? URL.createObjectURL(video) : ''), [video])

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  useEffect(() => () => cancelRef.current?.(), [])

  function startProcessing() {
    cancelRef.current?.()
    setProgress(0)
    setStep('processing')
    cancelRef.current = simulateProcessing(setProgress, () => setStep('preview'))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('appTitle')}</h1>
        <LanguageToggle />
      </header>

      <main className="app-main">
        {step === 'upload' && (
          <UploadStep files={files} onFilesChange={setFiles} onStart={startProcessing} />
        )}
        {step === 'processing' && <ProcessingStep progress={progress} />}
        {step === 'preview' && video && (
          <PreviewStep
            videoUrl={videoUrl}
            downloadName={video.name}
            onRequestChanges={startProcessing}
          />
        )}
      </main>
    </div>
  )
}
