import { MMKV } from 'react-native-mmkv'
import { Timer } from '../types/Timer'
import { getNewTimer } from './getNewTimer'
import { TIMERS_IDS_LIST_KEY } from '../state/storage'


export const configureNewTimer = (storage: MMKV): Timer => {
  const newTimer: Timer = getNewTimer()
  const ids: Array<string> = JSON.parse(storage.getString(TIMERS_IDS_LIST_KEY) || '[]')
  ids.push(newTimer.id)
  storage.set(TIMERS_IDS_LIST_KEY, JSON.stringify(ids))
  storage.set(newTimer.id, JSON.stringify(newTimer))

  return newTimer
}
