import { Timer } from '../types/Timer'
import { getTotalTimerSeconds } from './getTotalTimerSeconds'

interface EditedTimerParameters {
  title: string
  prepareSeconds: number
  restSeconds: number
  workSeconds: number
  cyclesCount: number
}


export const getUpdatedTimerAfterChangeAndSave = (initial: Timer, editedParameters: EditedTimerParameters): Timer => {
  const response: Timer = {...initial}

  response.title = editedParameters.title
  response.prepareSeconds = editedParameters.prepareSeconds
  response.restSeconds = editedParameters.restSeconds
  response.workSeconds = editedParameters.workSeconds
  response.cyclesCount = editedParameters.cyclesCount
  response.totalSecondsCount = getTotalTimerSeconds(response)

  return response
}
