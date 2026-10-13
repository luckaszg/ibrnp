// Simulates server-side processing until the backend exists.
// Calls onProgress with 0-100 and resolves when finished; the returned
// function cancels the simulation.
export function simulateProcessing(
  onProgress: (percent: number) => void,
  onDone: () => void,
): () => void {
  let percent = 0
  const timer = setInterval(() => {
    percent = Math.min(100, percent + Math.random() * 8 + 2)
    onProgress(Math.round(percent))
    if (percent >= 100) {
      clearInterval(timer)
      onDone()
    }
  }, 250)
  return () => clearInterval(timer)
}
