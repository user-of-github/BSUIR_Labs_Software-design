import { Alert, StyleSheet, Text, TouchableOpacity, Vibration } from 'react-native'
import { Timer } from '../../types/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { getBeautifiedTime } from '../../utils/getBeautifiedTime'
import { removeTimer } from '../../utils/removeTimer'
import { storage } from '../../state/storage'
import React from 'react'
import { RootState } from '../../state/store'
import { setCurrentlyEditedTimer } from '../../state/slices/general'
import { useNavigation } from '@react-navigation/native'


interface TimersListItemProps {
  timer: Timer
  updateParentIfRemoved: () => void
}

const arePropsEqual = (prev: TimersListItemProps, next: TimersListItemProps): boolean => {
  return prev.timer.id === next.timer.id && prev.updateParentIfRemoved === next.updateParentIfRemoved
}

export const TimersListItem = React.memo(({ timer, updateParentIfRemoved }: TimersListItemProps): JSX.Element => {
  //console.log(`TimersListItem ${timer.id} rendered`)
  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)
  const dispatch = useDispatch()

  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]
  const subtitleStyles = [styles.subtitle, theme === Theme.DARK ? styles.subtitleDark : styles.subtitleLight]

  const date: Date = new Date(timer.createdOn)

  const longPressHandler = React.useCallback((): void => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove this timer ?',
      [
        {
          text: 'Yes', onPress: (): void => {
            removeTimer(storage, timer.id)
            updateParentIfRemoved()
          }
        },
        { text: 'No' }
      ]
    )
    Vibration.vibrate(50)
  }, [timer, updateParentIfRemoved])

  const pressHandler = React.useCallback((): void => {
    dispatch(setCurrentlyEditedTimer(timer.id))
    navigation.navigate('SetUpTimer' as never)
    Vibration.vibrate(20)
  }, [timer])

  return (
    <TouchableOpacity onLongPress={longPressHandler}
                      onPress={pressHandler}
                      style={containerStyles}>
      <Text style={titleStyles}>{timer.title}</Text>
      <Text style={subtitleStyles}>Added on {`${date.toLocaleDateString()} at ${getBeautifiedTime(date)}`}</Text>
    </TouchableOpacity>
  )
}, arePropsEqual)


const styles = StyleSheet.create({
  container: {
    paddingVertical: 17,
    marginBottom: 10,
    paddingHorizontal: 15,
    // backgroundColor: ITEMS_BG_COLOR,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1
  },

  containerLight: {
    borderColor: 'rgba(0,0,0,.1)'
  },

  containerDark: {
    borderColor: 'rgba(255,255,255,.2)'
  },

  title: {
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic'
  },

  titleLight: {
    color: 'black'
  },

  titleDark: {
    color: 'white'
  },

  subtitle: {
    fontStyle: 'italic'
  },

  subtitleLight: {
    color: 'rgba(0, 0, 0, 0.5)'
  },

  subtitleDark: {
    color: 'rgba(255, 255, 255, 0.5)'
  }
})
