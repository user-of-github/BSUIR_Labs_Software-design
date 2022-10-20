import { Timer } from '../types/Timer'
import { StageName } from '../types/StageName'


export const configureArrayWithStages = (timer: Timer): Array<StageName> => {
  const response: Array<StageName> = [StageName.PREPEARE]
  for (let counter = 0; counter < timer.prepareSeconds; ++counter)
    response.push(StageName.PREPEARE)

  for (let cycle = 0; cycle < timer.cyclesCount; ++cycle) {
    for (let work = 0; work < timer.workSeconds; ++work)
      response.push(StageName.WORK)

    for (let rest = 0; rest < timer.restSeconds; ++rest)
      response.push(StageName.REST)
  }

  console.log('configured')
  return response
}
