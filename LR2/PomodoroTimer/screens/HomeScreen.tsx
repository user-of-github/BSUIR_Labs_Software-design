import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HomeFooter } from '../components/homeFooter/HomeFooter'
import { Header } from '../components/header/Header'
import { TimersList } from '../components/timersList/TimersList'


export const HomeScreen = (): JSX.Element => (
  <View style={styles.container}>
    <Header />
    <TimersList />
    <HomeFooter />
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 5,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid'
  }
})
