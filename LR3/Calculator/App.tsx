import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { Calculator } from './components/Calculator'
import { INPUT_OUTPUT_LIGHT_BACKGROUND } from './utilities/constants'


const App = React.memo((): JSX.Element => (
  <SafeAreaView>
    <StatusBar backgroundColor={INPUT_OUTPUT_LIGHT_BACKGROUND} barStyle='dark-content'/>
    <Calculator />
  </SafeAreaView>
), (): boolean => true)


export default App
