import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { Theme } from '../../types/Theme'
import { Timer } from '../../types/Timer'
import { getTimerById } from '../../utils/getTimerById'
import { storage } from '../../state/storage'

import SaveIconDark from '../../assets/images/saveDark.png'
import SaveIconLight from '../../assets/images/saveLight.png'
import HomeIconDark from '../../assets/images/homeDark.png'
import HomeIconLight from '../../assets/images/homeLight.png'
import RunTimerIcon from '../../assets/images/timer.png'
import { EditText } from './EditText'
import { EditTime } from './EditTime'
import { resetCurrentlyEditedTimer, setRunningTimer } from '../../state/slices/general'
import { EditCounter } from './EditCounter'
import { getUpdatedTimerAfterChangeAndSave } from '../../utils/getUpdatedTimerAfterChangeAndSave'
import { updateTimerInStorage } from '../../utils/updateTimerInStorage'
import { showMessage } from 'react-native-flash-message'


export const EditTimerPanel = React.memo((): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { currentlyEditedTimer } = useSelector((state: RootState) => state.general)

  if (currentlyEditedTimer === undefined) navigation.navigate('Home' as never)

  const timer: Timer = getTimerById(storage, currentlyEditedTimer as string)
  const { theme } = useSelector((state: RootState) => state.general)


  const editedTitle: React.MutableRefObject<string> = React.useRef<string>(timer.title)
  const editedRestSeconds: React.MutableRefObject<number> = React.useRef<number>(timer.restSeconds)
  const editedPrepareSeconds: React.MutableRefObject<number> = React.useRef<number>(timer.prepareSeconds)
  const editedWorkSeconds: React.MutableRefObject<number> = React.useRef<number>(timer.workSeconds)
  const editedCyclesCount: React.MutableRefObject<number> = React.useRef<number>(timer.cyclesCount)

  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]
  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const buttonStyles = [styles.button, theme === Theme.DARK ? styles.buttonDark : styles.buttonLight]
  const editItemStyles = [styles.editItem, theme === Theme.DARK ? styles.editItemDark : styles.editItemLight]
  const editItemTitleStyles = [
    styles.editItemTitle,
    theme === Theme.DARK ? styles.editItemTitleDark : styles.editItemTitleLight
  ]

  const saveIcon = theme === Theme.DARK ? SaveIconDark : SaveIconLight
  const homeIcon = theme === Theme.DARK ? HomeIconDark : HomeIconLight

  const onTitleChange = (newTitle: string) => editedTitle.current = newTitle
  const onRestSecondsChange = React.useCallback(
    (newSeconds: number) => editedRestSeconds.current = newSeconds,
    [editedRestSeconds]
  )

  const onPrepareSecondsChange = React.useCallback(
    (newSeconds: number) => editedPrepareSeconds.current = newSeconds,
    [editedPrepareSeconds]
  )

  const onWorkSecondsChange = React.useCallback(
    (newSeconds: number) => editedWorkSeconds.current = newSeconds,
    [editedWorkSeconds]
  )

  const onCyclesCountChange = React.useCallback(
    (newCount: number) => editedCyclesCount.current = newCount,
    [editedCyclesCount]
  )

  const onHomeButtonPress = React.useCallback((): void => {
    Vibration.vibrate(20)
    navigation.navigate('Home' as never)
    dispatch(resetCurrentlyEditedTimer())
  }, [navigation])

  const onSaveButtonPress = React.useCallback((): void => {
    Vibration.vibrate(20)
    const updated: Timer = getUpdatedTimerAfterChangeAndSave(timer, {
      title: editedTitle.current,
      workSeconds: editedWorkSeconds.current,
      restSeconds: editedRestSeconds.current,
      prepareSeconds: editedPrepareSeconds.current,
      cyclesCount: editedCyclesCount.current
    })

    updateTimerInStorage(storage, updated)

    showMessage({position: 'top', message: 'Changes are saved', description: ''})
  }, [timer])

  const onRunButtonPress = React.useCallback((): void => {
    Vibration.vibrate(20)
    const updated: Timer = getUpdatedTimerAfterChangeAndSave(timer, {
      title: editedTitle.current,
      workSeconds: editedWorkSeconds.current,
      restSeconds: editedRestSeconds.current,
      prepareSeconds: editedPrepareSeconds.current,
      cyclesCount: editedCyclesCount.current
    })

    updateTimerInStorage(storage, updated)
    dispatch(setRunningTimer(timer.id))
    navigation.navigate('RunTimer' as never)
  }, [timer])


  return (
    <View style={styles.wrapper}>
      <View style={containerStyles}>
        <Text style={titleStyles}>Set up timer</Text>

        <View style={editItemStyles}>
          <Text style={editItemTitleStyles}>Timer name</Text>
          <EditText initial={timer.title} onTextChange={onTitleChange} maxLength={25} styles={styles.input} />
        </View>

        <View style={editItemStyles}>
          <Text style={editItemTitleStyles}>Time to prepare</Text>
          <EditTime initialSeconds={timer.prepareSeconds} onChange={onPrepareSecondsChange} />
        </View>

        <View style={editItemStyles}>
          <Text style={editItemTitleStyles}>Time to rest</Text>
          <EditTime initialSeconds={timer.restSeconds} onChange={onRestSecondsChange} />
        </View>

        <View style={editItemStyles}>
          <Text style={editItemTitleStyles}>Time to work</Text>
          <EditTime initialSeconds={timer.workSeconds} onChange={onWorkSecondsChange} />
        </View>

        <View style={editItemStyles}>
          <Text style={editItemTitleStyles}>Work cycles count</Text>
          <EditCounter initial={timer.cyclesCount} maxAccepted={7} onChange={onCyclesCountChange} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={buttonStyles} onPress={onSaveButtonPress}>
          <Image source={saveIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyles} onPress={onHomeButtonPress}>
          <Image source={homeIcon} style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRun} onPress={onRunButtonPress}>
          <Image source={RunTimerIcon} style={styles.buttonIcon} />
          <Text style={styles.buttonRunText}>Run</Text>
        </TouchableOpacity>
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
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 30
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    borderRadius: 10
  },

  containerLight: {
    backgroundColor: ITEMS_BG_COLOR
  },

  containerDark: {
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  title: {
    fontSize: 40,

    fontWeight: '900',
    marginBottom: 18
  },

  titleLight: {
    color: 'rgba(0, 0, 0, 0.7)'
  },

  titleDark: {
    color: ITEMS_BG_COLOR
  },

  editItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    marginBottom: 10
  },

  editItemLight: {
    borderColor: 'rgba(0,0,0,.1)'
  },

  editItemDark: {
    borderColor: 'rgba(255,255,255,.5)'
  },

  editItemTitle: {
    fontSize: 20,
    fontWeight: '900'
  },
  editItemTitleLight: {
    color: 'black'
  },
  editItemTitleDark: {
    color: 'white'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 2,
    fontSize: 22
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto'
  },

  button: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  buttonLight: {
    backgroundColor: 'black'
  },

  buttonDark: {
    backgroundColor: ITEMS_BG_COLOR
  },

  buttonIcon: {
    width: 30,
    height: 30
  },

  buttonRun: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ACCENT_RED_COLOR,
    borderRadius: 1000,
    height: 60,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonRunText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 5,
    fontWeight: '900',
    textTransform: 'uppercase'
  }
})
