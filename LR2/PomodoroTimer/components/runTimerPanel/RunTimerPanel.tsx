import { StyleSheet, Text, View } from 'react-native'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { Theme } from '../../types/Theme'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { getTimerById } from '../../utils/getTimerById'
import { Timer } from '../../types/Timer'
import { storage } from '../../state/storage'
import { TimerAnimation } from '../timerAnimation/TimerAnimation'
import { configureArrayWithStages } from '../../utils/configureArrayWithStages'
import { StageName } from '../../types/StageName'
import { playSound } from '../../utils/playSound'
import { showMessage } from 'react-native-flash-message'
import { TimerVisualizer } from '../timerVisualizer/TimerVisualizer'




export const RunTimerPanel = React.memo((): JSX.Element => {
  console.log('RunTimerPanel rendered')

  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)
  const { currentlyRunningTimer } = useSelector((state: RootState) => state.general)

  if (currentlyRunningTimer === undefined) navigation.navigate('Home' as never)
  //dispatch(resetCurrentlyEditedTimer()) does not work :(

  const timer: Timer = getTimerById(storage, currentlyRunningTimer!)


  const [seconds, setSeconds] = React.useState<number>(0)
  const [stageName, setStageName] = React.useState<StageName>(StageName.PREPEARE)

  const array = React.useMemo(() => configureArrayWithStages(timer), [])

  const timerId: React.MutableRefObject<number> = React.useRef<number>(0)

  clearTimeout(timerId.current)
  timerId.current = setTimeout(function recursive() {
    console.log(seconds, timer.totalSecondsCount)
    clearTimeout(timerId.current)
    if (seconds > timer.totalSecondsCount) {
      setStageName(name => StageName.FINISHED)
      return
    } else {
      setSeconds(sec => sec + 1)
      timerId.current = setTimeout(recursive, 1000)
    }
  }, 1000)



  React.useEffect((): void => {
    setStageName(stage => seconds < array.length ? array[seconds] : StageName.FINISHED)
    if (seconds === timer.totalSecondsCount + 1) {
      playSound()
      showMessage({position: 'top', message: 'Pomodoro finished !', description: ''})
    }
  }, [seconds])


  return (
        <>
          <TimerAnimation color={ACCENT_RED_COLOR} />
          <TimerVisualizer secondsPassed={seconds} stageName={stageName}/>
        </>
  )
}, (): boolean => true)
