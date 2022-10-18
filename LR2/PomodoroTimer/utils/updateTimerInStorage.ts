import { MMKV } from 'react-native-mmkv'
import { Timer } from '../types/Timer'


export const updateTimerInStorage = (storage: MMKV, timer: Timer): void => {
  storage.set(timer.id, JSON.stringify(timer))
}
