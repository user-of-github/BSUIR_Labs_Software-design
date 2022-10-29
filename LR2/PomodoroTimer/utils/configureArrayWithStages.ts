import { Timer } from '../types/Timer'
import { StageName } from '../types/StageName'

export interface StageArrItem {
  name: StageName
  sound: boolean
}

export const configureArrayWithStages = (timer: Timer): Array<StageArrItem> => {
  const response: Array<StageArrItem> = [{name: StageName.PREPEARE, sound: true }]

  for (let counter = 0; counter < timer.prepareSeconds; ++counter) {
    response.push({name: StageName.PREPEARE, sound: false})
  }

  for (let cycle = 0; cycle < timer.cyclesCount; ++cycle) {
    for (let work = 0; work < timer.workSeconds; ++work)
      response.push({ name: StageName.WORK, sound: work === 0 })

    for (let rest = 0; rest < timer.restSeconds; ++rest)
      response.push({ name: StageName.REST, sound: rest === 0 })
  }

  return response
}
