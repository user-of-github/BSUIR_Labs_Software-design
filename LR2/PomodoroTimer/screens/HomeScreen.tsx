import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { TimersList } from '../components/timersList/TimersList'
import { Timer } from '../types/Timer'
import { storage, TIMERS_IDS_LIST_KEY } from '../state/storage'


export const HomeScreen = (): JSX.Element => {
  const [list, setList] = React.useState<Array<Timer>>(JSON.parse(
    storage.getString(TIMERS_IDS_LIST_KEY) || '[]')
    .map((id: string): Timer => JSON.parse(storage.getString(id)!))
  )

  const updateFromStorage = React.useCallback((): void => {
    const ids: Array<string> = JSON.parse(storage.getString(TIMERS_IDS_LIST_KEY) || '[]')
    const data: Array<Timer> = ids.map((id: string): Timer => JSON.parse(storage.getString(id)!))
    setList(data)
  }, [setList])

  return (
    <View style={styles.container}>
      <Header />
      <TimersList list={list} setList={setList} updateFromStorage={updateFromStorage} />
      <Footer updateFromStorage={updateFromStorage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent'
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid'
  }
})
