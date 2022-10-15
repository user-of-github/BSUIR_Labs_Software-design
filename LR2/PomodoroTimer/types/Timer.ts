export interface Timer {
  prepareSeconds: number
  workSeconds: number
  restSeconds: number
  cyclesCount: number
  totalSecondsCount: number
  secondsPassed: number
  id: string
  title: string
  createdOn: number
}
