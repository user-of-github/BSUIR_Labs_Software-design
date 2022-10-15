import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { Timer } from '../../types/Timer'
import { ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { getBeautifiedTime } from '../../utils/getBeautifiedTime'
import { removeTimer } from '../../utils/removeTimer'
import { storage } from '../../state/storage'


interface TimersListItemProps {
  timer: Timer
  updateParentIfRemoved: () => void
}

export const TimersListItem = ({ timer, updateParentIfRemoved }: TimersListItemProps): JSX.Element => {
  const { theme } = useSelector(state => state.theme)

  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]
  const subtitleStyles = [styles.subtitle, theme === Theme.DARK ? styles.subtitleDark : styles.subtitleLight]

  const date: Date = new Date(timer.createdOn)

  const longPressHandler = (): void => {
    Vibration.vibrate(50)
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
  }

  return (
    <TouchableOpacity onLongPress={() => longPressHandler()} style={containerStyles}>
      <Text style={titleStyles}>{timer.title}</Text>
      <Text style={subtitleStyles}>Added on {`${date.toLocaleDateString()} at ${getBeautifiedTime(date)}`}</Text>
    </TouchableOpacity>
  )
}


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
