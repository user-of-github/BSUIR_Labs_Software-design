import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Timer } from '../../types/Timer'
import { ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'


interface TimersListItemProps {
  timer: Timer
}

export const TimersListItem = ({ timer }: TimersListItemProps): JSX.Element => {
  const {theme} = useSelector(state => state.theme)

  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]
  const subtitleStyles = [styles.subtitle, theme === Theme.DARK ? styles.subtitleDark : styles.subtitleLight]

  return (
    <TouchableOpacity style={containerStyles}>
      <Text style={titleStyles}>{timer.title}</Text>
      <Text style={subtitleStyles}>Added on {new Date(timer.createdOn).toLocaleDateString()}</Text>
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
    borderWidth: 1,
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
  },
})
