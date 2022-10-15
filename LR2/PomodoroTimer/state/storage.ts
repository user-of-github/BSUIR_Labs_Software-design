import { MMKV } from "react-native-mmkv";


export const storage: MMKV = new MMKV()

export const TIMERS_LIST_KEY: string = 'TIMERS_LIST_POMODORO'

// here is a key for array [id1, id2, ...]
// and by an exact id we will be able to get an exact object from storage.
// It is done that not to override whole array always, but override array with ids and than an exact modified object by its id
export const TIMERS_IDS_LIST_KEY: string = 'TIMERS_IDS_POMODORO'
