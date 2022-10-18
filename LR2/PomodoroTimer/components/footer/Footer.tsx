import React from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { ITEMS_BG_COLOR } from '../../utils/styleConstants'

import SettingsIconDark from '../../assets/images/settingsDark.png'
import SettingsIconLight from '../../assets/images/settingsLight.png'
import DeleteIconDark from '../../assets/images/deleteDark.png'
import DeleteIconLight from '../../assets/images/deleteLight.png'
import ExitIconDark from '../../assets/images/exitDark.png'
import ExitIconLight from '../../assets/images/exitLight.png'
import { exitApp } from '../../utils/exitApp'
import { removeAllTimers } from '../../utils/removeAllTimers'
import { storage } from '../../state/storage'
import { RootState } from '../../state/store'


interface FooterProps {
  updateFromStorage: () => void
}

const arePropsEqual = (prev: FooterProps, next: FooterProps): boolean => prev.updateFromStorage === next.updateFromStorage


export const Footer = React.memo(({updateFromStorage}: FooterProps): JSX.Element => {
  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)

  const settingsIcon = theme === Theme.DARK ? SettingsIconDark : SettingsIconLight
  const deleteIcon = theme === Theme.DARK ? DeleteIconDark : DeleteIconLight
  const quitIcon = theme === Theme.DARK ? ExitIconDark : ExitIconLight

  const buttonStyles = [styles.button, theme === Theme.DARK ? styles.buttonDark : styles.buttonLight]

  const settingsButtonClickHandler = (): void => {
    Vibration.vibrate(20)
    navigation.navigate('Settings' as never)
  }

  const removeAllButtonClickHandler = (): void => Alert.alert(
    'Confirmation', 'Are you sure you want to remove all timers ?',
    [{ text: 'Yes', onPress: (): void => {
        removeAllTimers(storage)
        updateFromStorage()
      } }, { text: 'No' }]
  )

  const quitButtonClickHandler = (): void => Alert.alert(
    'Confirmation', 'Are you sure you want to quit ?',
    [{ text: 'Yes', onPress: (): void => exitApp() }, { text: 'No' }]
  )


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={buttonStyles} onPress={removeAllButtonClickHandler}>
          <Image source={deleteIcon} style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyles} onPress={settingsButtonClickHandler}>
          <Image source={settingsIcon} style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyles} onPress={quitButtonClickHandler}>
          <Image source={quitIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}, arePropsEqual)

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 5
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    overflow: 'hidden',
    borderRadius: 7
  },


  button: {
    height: '100%',
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
  }
})
