import { BackHandler } from 'react-native'


export const exitApp = (): void => {
  /* maybe some save ? */

  BackHandler.exitApp()
}
