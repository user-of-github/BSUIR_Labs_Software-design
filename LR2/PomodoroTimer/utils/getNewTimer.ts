import { Timer } from '../types/Timer'
import { getRandomId } from './getRandomId'


export const getNewTimer = (): Timer => {
  return {
    prepareSeconds: 0,
    restSeconds: 0,
    secondsPassed: 0,
    workSeconds: 0,
    totalSecondsCount: 0,
    cyclesCount: 0,
    title: 'New pomodoro',
    id: getRandomId(),
    createdOn: new Date().getTime()
  }
}
