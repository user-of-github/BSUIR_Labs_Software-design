import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { Application } from './components/Application'
import FlashMessage from 'react-native-flash-message'
import { ACCENT_RED_COLOR } from './utils/styleConstants'
import { storage } from './state/storage'
import { startConfigureStorage } from './utils/startConfigureStorage'
import PushNotification from 'react-native-push-notification'


const createChannels = (): void => PushNotification.createChannel({
  channelId: 'test-channel',
  channelName: 'Test Channel',
  vibrate: true
})


const App = (): JSX.Element => {
  React.useEffect((): void => {
    createChannels()
    startConfigureStorage(storage)
  }, [])

  return (
    <SafeAreaView>
      <Provider store={store}>
        <Application />
      </Provider>
      <FlashMessage position="bottom"
                    style={{ backgroundColor: ACCENT_RED_COLOR }}
                    titleStyle={{ fontWeight: '300', fontSize: 15 }}
      />
    </SafeAreaView>
  )
}


export default App
