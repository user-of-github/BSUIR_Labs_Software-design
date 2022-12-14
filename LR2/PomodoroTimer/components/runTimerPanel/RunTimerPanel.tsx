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
import { playPomodoroIsOverSound } from '../../utils/playPomodoroIsOverSound'
import { showMessage } from 'react-native-flash-message'
import { TimerVisualizer } from '../timerVisualizer/TimerVisualizer'
import { runTimer, stopTimer } from '../../utils/runTimer'
import { Alert, BackHandler, Image, NativeEventSubscription, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import HomeIconLight from '../../assets/images/homeLight.png'
import { playBeep } from '../../utils/playBeep'
import PushNotification from 'react-native-push-notification'


const subscription: React.MutableRefObject<NativeEventSubscription | null>= React.createRef<NativeEventSubscription | null>()

export const RunTimerPanel = React.memo((): JSX.Element => {
  const navigation = useNavigation()

  const { currentlyRunningTimer } = useSelector((state: RootState) => state.general)

  if (currentlyRunningTimer === undefined) navigation.navigate('Home' as never)
  //dispatch(resetCurrentlyEditedTimer()) does not work :(

  const timer: Timer = getTimerById(storage, currentlyRunningTimer!)


  const [seconds, setSeconds] = React.useState<number>(0)
  const [stageName, setStageName] = React.useState<StageName>(StageName.PREPEARE)

  const array = React.useMemo(() => configureArrayWithStages(timer), [])

  const onTick = React.useCallback((sec: number): void => setSeconds(s => sec), [setSeconds])
  const onFinish = React.useCallback((): void => {
    playPomodoroIsOverSound()
    showMessage({ position: 'top', message: 'Pomodoro finished !', description: '' })
    //notify()
  }, [])


  React.useEffect((): void => {
    runTimer(0, onTick, onFinish, timer.totalSecondsCount)
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Finish',
      message: 'Pomodoro is over',
      date: new Date(Date.now() + timer.totalSecondsCount * 1000),
      allowWhileIdle: true,
      priority: 'high'
    })
  }, [])

  const callback = React.useCallback((): boolean => true, [stageName])

  //const subscription: React.MutableRefObject<NativeEventSubscription | null> = React.useRef<NativeEventSubscription | null>(null)
  React.useEffect(() => {
    subscription.current = BackHandler.addEventListener('hardwareBackPress', callback)

    return (): void => {
      subscription.current !== null && subscription.current.remove()
    }
  })


  React.useEffect((): void => {
    setStageName(stage => seconds < array.length ? array[seconds].name : StageName.FINISHED)
    if (array[seconds].sound) playBeep()
  }, [seconds])

  const clickHomeButtonHandler = React.useCallback((): void => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to stop current pomodoro and exit ?',
      [
        {
          text: 'Yes', onPress: (): void => {
            stopTimer()
            subscription.current !== null && subscription.current.remove()
            navigation.navigate('Home' as never)
            PushNotification.cancelAllLocalNotifications()
          }
        },
        { text: 'No' }
      ]
    )
    Vibration.vibrate(50)
  }, [])


  return (
    <>
      <TimerAnimation color={ACCENT_RED_COLOR} />
      <TimerVisualizer secondsPassed={timer.totalSecondsCount - seconds} stageName={stageName} />

      <TouchableOpacity style={styles.goHome} onPress={clickHomeButtonHandler}>
        <Image source={HomeIconLight} style={styles.goHomeIcon} />
      </TouchableOpacity>
    </>
  )
}, (): boolean => true)


const styles = StyleSheet.create({
  goHome: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    backgroundColor: ACCENT_RED_COLOR
  },

  goHomeIcon: {
    width: 30,
    height: 30
  }
})
