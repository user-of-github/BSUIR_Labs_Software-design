import { StyleSheet, Text, View } from 'react-native'
import { ITEMS_BG_COLOR } from '../utils/styleConstants'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { Theme } from '../types/Theme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React from 'react'
import { RunTimerPanel } from '../components/runTimerPanel/RunTimerPanel'


export const RunTimerScreen = (): JSX.Element => {
  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)
  const { currentlyRunningTimer } = useSelector((state: RootState) => state.general)

  if (currentlyRunningTimer === undefined) navigation.navigate('Home' as never)
  //dispatch(resetCurrentlyEditedTimer()) does not work :(

  const wrapperStyles = [styles.wrapper, theme === Theme.DARK ? styles.wrapperDark : styles.wrapperLight]
  const headStyles = [styles.head, theme === Theme.DARK ? styles.headDark : styles.headLight]
  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]


  return (
    <View style={wrapperStyles}>
      <View style={styles.container}>
        <View style={headStyles}><Text style={titleStyles}>Running Timer</Text></View>
        <RunTimerPanel />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 35,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  wrapperLight: {
    backgroundColor: 'white'
  },

  wrapperDark: {
    backgroundColor: 'transparent'
  },

  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ITEMS_BG_COLOR,
    alignItems: 'center',
    borderRadius: 10
  },

  head: {
    width: '100%',
    padding: 25,
    paddingTop: 35,
    borderRadius: 10,
    marginBottom: 50
  },
  headLight: {
    backgroundColor: 'transparent'
  },
  headDark: {
    backgroundColor: 'rgba(0,0,0,.8)'
  },

  title: {
    fontSize: 37,
    width: '100%',
    fontWeight: '900',
    marginRight: 'auto',
    textAlign: 'left'
  },

  titleLight: {
    color: 'rgba(0,0,0,.75)'
  },

  titleDark: {
    color: 'white'
  },

  subtitle: {
    fontSize: 30,
    fontStyle: 'italic',
    width: '100%',
    fontWeight: '900',
    marginRight: 'auto',
    textAlign: 'left'
  },

  subtitleLight: {
    color: 'rgba(0,0,0,.75)'
  },

  subtitleDark: {
    color: 'white'
  }
})
