import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { simulateProcessing } from './mockProcessing'
import { readFilesInChunks, type ReadProgress } from './readFiles'
import { paths } from './paths'
import UploadStep from './components/UploadStep'
import ProcessingStep from './components/ProcessingStep'
import PreviewStep from './components/PreviewStep'
import LanguageToggle from './components/LanguageToggle'
import ReadingModal from './components/ReadingModal'
import { useLanguage } from './i18n'

export default function App() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState(0)
  // True from the moment processing starts until the user leaves /processing.
  const [processingActive, setProcessingActive] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const cancelRef = useRef<(() => void) | null>(null)
  const startedFromPreviewRef = useRef(false)
  const [reading, setReading] = useState(false)
  const [readProgress, setReadProgress] = useState<ReadProgress | null>(null)
  const [readFailed, setReadFailed] = useState(false)
  const readAbortRef = useRef<AbortController | null>(null)

  // Until the server exists, the "final" video is the first uploaded video.
  const video = files.find((file) => file.type.startsWith('video/'))
  const videoUrl = useMemo(() => (video ? URL.createObjectURL(video) : ''), [video])

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  useEffect(
    () => () => {
      cancelRef.current?.()
      readAbortRef.current?.abort()
    },
    [],
  )

  // Leaving a page with Back/Forward stops whatever that page was doing.
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    if (pathname !== paths.processing) setProcessingActive(false)
  }

  useEffect(() => {
    if (pathname !== paths.processing) {
      cancelRef.current?.()
      cancelRef.current = null
    }
    if (pathname !== paths.upload) readAbortRef.current?.abort()
  }, [pathname])

  function handleFilesChange(next: File[]) {
    setFiles(next)
    setHasResult(false)
  }

  async function readAndProcess() {
    const controller = new AbortController()
    readAbortRef.current = controller
    setReadFailed(false)
    setReadProgress(null)
    setReading(true)

    try {
      await readFilesInChunks(files, setReadProgress, controller.signal)
      startProcessing(false)
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error(error)
        setReadFailed(true)
      }
    } finally {
      if (readAbortRef.current === controller) {
        readAbortRef.current = null
        setReading(false)
      }
    }
  }

  function cancelReading() {
    readAbortRef.current?.abort()
  }

  function startProcessing(fromPreview: boolean) {
    cancelRef.current?.()
    startedFromPreviewRef.current = fromPreview
    setProgress(0)
    setProcessingActive(true)
    navigate(paths.processing)
    cancelRef.current = simulateProcessing(setProgress, () => {
      cancelRef.current = null
      setHasResult(true)
      // Drop the /processing history entry, so Back from the preview goes to
      // the page before processing instead of a finished /processing.
      if (startedFromPreviewRef.current) navigate(-1)
      else navigate(paths.preview, { replace: true })
    })
  }

  const fallback = <Navigate to={paths.upload} replace />

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('appTitle')}</h1>
        <LanguageToggle />
      </header>

      <main className="app-main">
        <Routes>
          <Route
            path={paths.upload}
            element={
              <UploadStep
                files={files}
                onFilesChange={handleFilesChange}
                onStart={readAndProcess}
                readFailed={readFailed}
              />
            }
          />
          <Route
            path={paths.processing}
            element={processingActive ? <ProcessingStep progress={progress} /> : fallback}
          />
          <Route
            path={paths.preview}
            element={
              hasResult && video ? (
                <PreviewStep
                  videoUrl={videoUrl}
                  downloadName={video.name}
                  onRequestChanges={() => startProcessing(true)}
                />
              ) : (
                fallback
              )
            }
          />
          <Route path="*" element={fallback} />
        </Routes>
        {reading && <ReadingModal progress={readProgress} onCancel={cancelReading} />}
      </main>
    </div>
  )
}
