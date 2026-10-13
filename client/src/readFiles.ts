export const CHUNK_SIZE = 10 * 1024 * 1024

export interface ReadProgress {
  fileIndex: number
  fileCount: number
  fileName: string
  chunkIndex: number
  chunkCount: number
  fileBytesRead: number
  fileSize: number
  totalBytesRead: number
  totalBytes: number
}

function chunkCountOf(file: File): number {
  return Math.max(1, Math.ceil(file.size / CHUNK_SIZE))
}

// Reads every file fully in CHUNK_SIZE slices so large files never have to
// sit in memory at once. Each chunk is read and then dropped; this is where
// chunks will be sent to the server later. Rejects with an AbortError when
// the signal is aborted (checked between chunks).
export async function readFilesInChunks(
  files: File[],
  onProgress: (progress: ReadProgress) => void,
  signal: AbortSignal,
): Promise<void> {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0)
  let totalBytesRead = 0

  for (const [fileIndex, file] of files.entries()) {
    const chunkCount = chunkCountOf(file)
    let fileBytesRead = 0

    for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
      signal.throwIfAborted()
      const start = chunkIndex * CHUNK_SIZE
      const chunk = await file.slice(start, start + CHUNK_SIZE).arrayBuffer()
      fileBytesRead += chunk.byteLength
      totalBytesRead += chunk.byteLength

      onProgress({
        fileIndex,
        fileCount: files.length,
        fileName: file.name,
        chunkIndex,
        chunkCount,
        fileBytesRead,
        fileSize: file.size,
        totalBytesRead,
        totalBytes,
      })
    }
  }
  signal.throwIfAborted()
}
