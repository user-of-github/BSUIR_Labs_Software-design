import { StyleSheet, Text, View } from 'react-native'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../utils/styleConstants'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { Theme } from '../types/Theme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React from 'react'
import { getTimerById } from '../utils/getTimerById'
import { Timer } from '../types/Timer'
import { storage } from '../state/storage'
import { TimerAnimation } from '../components/timerAnimation/TimerAnimation'
import { configureArrayWithStages } from '../utils/configureArrayWithStages'
import { StageName } from '../types/StageName'

let timerId: number = 0

export const RunTimerScreen = React.memo((): JSX.Element => {
  const isFocused: boolean = useIsFocused()

  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)
  const { currentlyRunningTimer } = useSelector((state: RootState) => state.general)

  if (currentlyRunningTimer === undefined) navigation.navigate('Home' as never)
  //dispatch(resetCurrentlyEditedTimer()) does not work :(

  const timer: Timer = getTimerById(storage, currentlyRunningTimer!)

  const wrapperStyles = [styles.wrapper, theme === Theme.DARK ? styles.wrapperDark : styles.wrapperLight]
  const headStyles = [styles.head, theme === Theme.DARK ? styles.headDark : styles.headLight]
  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const subtitleStyles = [styles.subtitle, theme === Theme.DARK ? styles.subtitleDark : styles.subtitleLight]
  const circleColor: string = theme === Theme.LIGHT ? 'white' : ACCENT_RED_COLOR

  const [seconds, setSeconds] = React.useState<number>(0)
  const [stageName, setStageName] = React.useState<string>()

  const array = React.useRef<Array<StageName>>([])

  React.useEffect(() => {
    array.current = configureArrayWithStages(timer)
  }, [])

  clearTimeout(timerId)
  timerId = setTimeout(function recursive() {
    //console.log(seconds, timer.totalSecondsCount)
    clearTimeout(timerId)
    if (!isFocused) {
      clearTimeout(timerId)
      return
    }
    if (seconds > timer.totalSecondsCount) {
      clearTimeout(timerId)
      setStageName(name => StageName.FINISHED)
      return
    } else {
      clearTimeout(timerId)
      setSeconds(sec => sec + 1)
      timerId = setTimeout(recursive, 1000)
    }
  }, 1000)


  React.useEffect((): void => {
    setStageName(stage => array.current[seconds])
  }, [seconds])


  return (
    <View style={wrapperStyles}>
      <View style={headStyles}>
        <Text style={titleStyles}>TIMER</Text>
        <Text style={subtitleStyles}>{timer.title}</Text>
      </View>
      <TimerAnimation color={circleColor} />
      <Text style={styles.timePassed}>{seconds}</Text>
      <Text style={styles.stageName}>{stageName}</Text>
    </View>
  )
}, (): boolean => true)


const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 35,
    alignItems: 'center'
  },

  wrapperLight: {
    backgroundColor: ACCENT_RED_COLOR
  },

  wrapperDark: {
    backgroundColor: 'transparent'
  },
  head: {
    width: '100%',
    padding: 25,
    borderRadius: 10,
    marginBottom: 50
  },
  headLight: {
    backgroundColor: ITEMS_BG_COLOR
  },
  headDark: {
    backgroundColor: 'rgba(0,0,0,.8)'
  },

  title: {
    fontSize: 30,
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
    fontSize: 20,
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
  },

  timePassed: {
    fontSize: 80,
    fontWeight: '900',
    color: 'white',
    marginTop: -150
  },

  stageName: {
    fontSize: 60,
    fontWeight: '900',
    //color: 'white',
    marginTop: 150,
    padding: 20,
    backgroundColor: ITEMS_BG_COLOR,
    color: ACCENT_RED_COLOR,
    width: '100%',
    borderRadius: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})
