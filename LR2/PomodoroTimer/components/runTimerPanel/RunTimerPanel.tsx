import { ACCENT_RED_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
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
import { runTimer, stopTimer } from '../../utils/runTimer'
import { Alert, BackHandler } from 'react-native'


export const RunTimerPanel = React.memo((): JSX.Element => {
  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)
  const { currentlyRunningTimer } = useSelector((state: RootState) => state.general)

  if (currentlyRunningTimer === undefined) navigation.navigate('Home' as never)
  //dispatch(resetCurrentlyEditedTimer()) does not work :(

  const timer: Timer = getTimerById(storage, currentlyRunningTimer!)


  const [seconds, setSeconds] = React.useState<number>(0)
  const [stageName, setStageName] = React.useState<StageName>(StageName.PREPEARE)

  const array = React.useMemo(() => configureArrayWithStages(timer), [])

  const onTick = React.useCallback((sec: number): void => setSeconds(s => sec), [setSeconds])
  const onFinish = React.useCallback((): void => {
    playSound()
    showMessage({ position: 'top', message: 'Pomodoro finished !', description: '' })
  }, [])
  React.useEffect((): void => {
    runTimer(0, onTick, onFinish, timer.totalSecondsCount)
  }, [])

  const callback = React.useCallback(() => {
    console.log(stageName)
    return stageName === StageName.FINISHED ? null : true
  }, [stageName])

  BackHandler.addEventListener('hardwareBackPress', callback)


  const goBackBehavior = React.useCallback((event: any): void => {
    if (stageName === StageName.FINISHED) return

    event.preventDefault()

    Alert.alert(
      'Your pomodoro is still running',
      'Are you sure to stop and quit ?',
      [
        { text: 'Cancel' },
        {
          text: 'Quit',
          onPress: (): void => {
            stopTimer()
            navigation.dispatch(event.data.action)
          }
        }
      ]
    )
  }, [navigation, stageName])



  React.useEffect((): void => {
    setStageName(stage => seconds < array.length ? array[seconds] : StageName.FINISHED)
  }, [seconds])


  return (
    <>
      <TimerAnimation color={ACCENT_RED_COLOR} />
      <TimerVisualizer secondsPassed={seconds} stageName={stageName} />
    </>
  )
}, (): boolean => true)
