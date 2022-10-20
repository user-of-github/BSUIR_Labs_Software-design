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
    setStageName(stage => seconds < array.current.length ? array.current[seconds] : StageName.FINISHED)
  }, [seconds])


  return (
    <View style={wrapperStyles}>
      <View style={styles.container}>
        <View style={headStyles}>
          <Text style={titleStyles}>Running Timer</Text>
          <Text style={subtitleStyles}>{timer.title}</Text>
        </View>
        <TimerAnimation color={ACCENT_RED_COLOR} />
        <Text style={styles.timePassed}>{seconds}</Text>
        <Text style={styles.stageName}>{stageName}</Text>
      </View>
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
    alignItems: 'center',
    backgroundColor: 'white'
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

  wrapperLight: {
    backgroundColor: 'white'
  },

  wrapperDark: {
    backgroundColor: 'transparent'
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
  },

  timePassed: {
    fontSize: 80,
    fontWeight: '900',
    color: ACCENT_RED_COLOR,
    marginTop: -150
  },

  stageName: {
    fontSize: 30,
    fontWeight: '100',
    //color: 'white',
    marginTop: 90,
    padding: 5,
    backgroundColor: ACCENT_RED_COLOR,
    color: 'white',
    width: '90%',
    borderRadius: 100,
    textAlign: 'center',
    textTransform: 'capitalize'
  }
})
