/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Header} from "./components/header/Header";


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
          <Header/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
});

export default App;
