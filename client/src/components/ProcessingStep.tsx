import { useLanguage } from '../i18n'

interface ProcessingStepProps {
  progress: number
}

export default function ProcessingStep({ progress }: ProcessingStepProps) {
  const { t } = useLanguage()

  return (
    <section className="card">
      <h2>{t('processingTitle')}</h2>
      <p className="muted">{t('processingSubtitle')}</p>

      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-label">{progress}%</p>
    </section>
  )
}
