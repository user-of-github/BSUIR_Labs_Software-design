import React from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { ITEMS_BG_COLOR } from '../../utils/styleConstants'

import SettingsIconDark from '../../assets/images/settingsDark.png'
import SettingsIconLight from '../../assets/images/settingsLight.png'
import ExitIconDark from '../../assets/images/exitDark.png'
import ExitIconLight from '../../assets/images/exitLight.png'
import { exitApp } from '../../utils/exitApp'
import { removeAllTimers } from '../../utils/removeAllTimers'
import { storage } from '../../state/storage'
import { RootState } from '../../state/store'


export const HomeFooter = React.memo((): JSX.Element => {
  const navigation = useNavigation()

  const { theme } = useSelector((state: RootState) => state.general)

  const settingsIcon = theme === Theme.DARK ? SettingsIconDark : SettingsIconLight
  const quitIcon = theme === Theme.DARK ? ExitIconDark : ExitIconLight

  const buttonStyles = [styles.button, theme === Theme.DARK ? styles.buttonDark : styles.buttonLight]

  const settingsButtonClickHandler = (): void => {
    Vibration.vibrate(20)
    navigation.navigate('Settings' as never)
  }


  const quitButtonClickHandler = (): void => {
    Alert.alert(
      'Confirmation', 'Are you sure you want to quit ?',
      [{ text: 'Yes', onPress: (): void => exitApp() }, { text: 'No' }]
    )
    Vibration.vibrate(20)
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>


        <TouchableOpacity style={buttonStyles} onPress={settingsButtonClickHandler}>
          <Image source={settingsIcon} style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyles} onPress={quitButtonClickHandler}>
          <Image source={quitIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}, (): boolean => true)

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
    borderRadius: 7,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },


  button: {
    height: '100%',
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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

