import { Theme } from './Theme'


export interface GeneralAppState {
  currentlyEditedTimer: string | undefined
  theme: Theme
  advancedModeOn: boolean
}
