import { Timer } from '../types/Timer'


export const getTotalTimerSeconds = (timer: Timer): number => {
  console.log('cycles count:' , timer.cyclesCount)
  return timer.prepareSeconds + timer.cyclesCount * (timer.workSeconds + timer.restSeconds)
}
