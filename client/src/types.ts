export type Step = 'upload' | 'processing' | 'preview'

export interface ChangeRequest {
  description: string
  files: File[]
}
