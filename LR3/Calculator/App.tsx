import React from 'react';
import { SafeAreaView} from 'react-native';
import { Calculator } from './components/Calculator'


const App = React.memo((): JSX.Element => (
  <SafeAreaView >
    <Calculator/>
  </SafeAreaView>
), (): boolean => true)


export default App;
