import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useNavigation } from '@react-navigation/native'
import { ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { Theme } from '../../types/Theme'


export const EditTimerPanel = React.memo((): JSX.Element => {
  const navigation = useNavigation()

  const {currentlyEditedTimer} = useSelector((state: RootState) => state.general)
  if (currentlyEditedTimer === undefined) navigation.navigate('Home' as never)

  const {theme} = useSelector((state: RootState) => state.general)

  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]
  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]


  return (
    <View style={styles.wrapper}>
      <View style={containerStyles}>
        <Text style={titleStyles}>Timer Editor</Text>
      </View>
    </View>
  )
})


const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingHorizontal: 10,
    paddingTop: 20,
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
    borderRadius: 10,
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
    marginBottom: 30
  },

  titleLight: {
    color: 'rgba(0, 0, 0, 0.7)'
  },

  titleDark: {
    color: ITEMS_BG_COLOR
  },
})
