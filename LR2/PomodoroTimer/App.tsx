import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { Application } from './components/Application'
import FlashMessage from 'react-native-flash-message'
import { ACCENT_RED_COLOR } from './utils/styleConstants'
import { storage } from './state/storage'
import { startConfigureStorage } from './utils/startConfigureStorage'


const App = (): JSX.Element => {
  React.useEffect((): void => startConfigureStorage(storage), [])

  return (
    <SafeAreaView>
      <Provider store={store}>
        <Application />
      </Provider>
      <FlashMessage position="bottom"
                    style={{backgroundColor: ACCENT_RED_COLOR}}
                    titleStyle={{fontWeight: '300', fontSize: 15}}
      />
    </SafeAreaView>
  )
}


export default App
