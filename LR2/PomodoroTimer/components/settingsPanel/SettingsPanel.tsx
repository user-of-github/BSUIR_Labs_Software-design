import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { Dispatch } from '@reduxjs/toolkit'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { Alert, Image, StyleSheet, Switch, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { resetState, setMode, setTheme } from '../../state/slices/general'
import DeleteIconDark from '../../assets/images/deleteDark.png'
import DeleteIconLight from '../../assets/images/deleteLight.png'
import { storage } from '../../state/storage'
import { showMessage } from 'react-native-flash-message'
import { removeAllTimers } from '../../utils/removeAllTimers'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../state/store'


export const SettingsPanel = React.memo((): JSX.Element => {
  const navigation = useNavigation()
  const dispatch: Dispatch = useDispatch()

  const { theme } = useSelector((state: RootState) => state.general)
  const [isDarkThemeOn, setIsDarkThemeOn] = React.useState<boolean>(theme === Theme.DARK)
  const handleThemeTogglerChange = (is: boolean) => {
    Vibration.vibrate(20)
    setIsDarkThemeOn(is)
    dispatch(setTheme(is ? Theme.DARK : Theme.LIGHT))
  }

  const clickButtonClearDataHandler = React.useCallback((): void => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to remove all timers ?',
      [
        {
          text: 'Yes', onPress: (): void => {
            removeAllTimers(storage)
            showMessage({ position: 'top', message: 'Timers list is now empty. All data is cleared', description: '' })
          }
        },
        { text: 'No' }
      ]
    )
    Vibration.vibrate(50)
  }, [])

  const clickButtonResetSettingsHandler = React.useCallback((): void => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to reset settings ?',
      [
        {
          text: 'Yes', onPress: (): void => {
            dispatch(resetState())
            navigation.navigate('Home' as never)
            showMessage({ position: 'top', message: 'Settings restored to default', description: '' })
          }
        },
        { text: 'No' }
      ]
    )
    Vibration.vibrate(50)
  }, [])


  const rowStyles = [styles.row, theme === Theme.DARK ? styles.rowDark : styles.rowLight]
  const rowTitleStyles = [styles.rowTitle, theme === Theme.DARK ? styles.rowTitleDark : styles.rowTitleLight]
  const buttonStyles = [styles.button, theme === Theme.DARK ? styles.buttonDark : styles.buttonLight]
  const buttonTextStyles = [styles.buttonText, theme === Theme.DARK ? styles.buttonTextDark : styles.buttonTextLight]

  const deleteIcon = theme === Theme.DARK ? DeleteIconDark : DeleteIconLight

  return (
    <View style={styles.container}>
      <View style={rowStyles}>
        <Text style={rowTitleStyles}>Enable dark theme</Text>
        <Switch
          trackColor={{
            true: theme === Theme.DARK ? 'rgba(255, 255, 255, 0.8)' : '#767577',
            false: theme === Theme.DARK ? 'rgba(255, 255, 255, 0.8)' : '#767577'
          }}
          thumbColor={ACCENT_RED_COLOR}
          onValueChange={handleThemeTogglerChange}
          value={isDarkThemeOn}
          style={styles.toggler}
        />
      </View>

      <View style={rowStyles}>
        <TouchableOpacity style={buttonStyles} onPress={clickButtonClearDataHandler}>
          <Text style={buttonTextStyles}>Clear all timers data</Text>
          <Image source={deleteIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      <View style={rowStyles}>
        <TouchableOpacity style={buttonStyles} onPress={clickButtonResetSettingsHandler}>
          <Text style={buttonTextStyles}>Reset app settings</Text>
          <Image source={deleteIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}, (): boolean => true)


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 20
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15
  },

  rowLight: {
    borderColor: 'rgba(0,0,0,.07)'
  },
  rowDark: {
    borderColor: 'rgba(255,255,255,.25)'
  },

  rowTitle: {
    fontSize: 19,
    fontWeight: '100'
  },

  rowTitleLight: {
    color: 'rgba(0,0,0,.65)'
  },

  rowTitleDark: {
    color: 'rgba(255,255,255,0.8)'
  },

  toggler: {
    marginLeft: 'auto'
  },

  button: {
    width: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  buttonText: {
    fontWeight: '900',
    fontSize: 20,
    marginRight: 10
  },
  buttonTextLight: {
    color: ITEMS_BG_COLOR
  },
  buttonTextDark: {
    color: 'black'
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
