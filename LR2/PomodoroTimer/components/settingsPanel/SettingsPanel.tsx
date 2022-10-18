import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { Dispatch } from '@reduxjs/toolkit'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { StyleSheet, Switch, Text, Vibration, View } from 'react-native'
import { setTheme } from '../../state/slices/general'
import { setMode } from '../../state/slices/general'


export const SettingsPanel = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch()

  //@ts-ignore
  const { theme } = useSelector(state => state.general)
  const [isDarkThemeOn, setIsDarkThemeOn] = React.useState<boolean>(theme === Theme.DARK)
  const handleThemeTogglerChange = (is: boolean) => {
    Vibration.vibrate(20)
    setIsDarkThemeOn(is)
    dispatch(setTheme(is ? Theme.DARK : Theme.LIGHT))
  }

  const { advancedModeOn } = useSelector(state => state.general)
  const [isAdvancedModeOn, setIsAdvancedModeOn] = React.useState<boolean>(advancedModeOn)
  const handleModeTogglerChange = (is: boolean) => {
    Vibration.vibrate(20)
    setIsAdvancedModeOn(is)
    dispatch(setMode(is))
  }

  const labelColor: string = theme === Theme.DARK ? ITEMS_BG_COLOR : 'black'

  const rowStyles = [styles.row, theme === Theme.DARK ? styles.rowDark : styles.rowLight]
  const rowTitleStyles = [styles.rowTitle, theme === Theme.DARK ? styles.rowTitleDark : styles.rowTitleLight]

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
        <Text style={rowTitleStyles}>Enable advanced mode</Text>
        <Switch
          trackColor={{
            true: theme === Theme.DARK ? 'rgba(255, 255, 255, 0.8)' : '#767577',
            false: theme === Theme.DARK ? 'rgba(255, 255, 255, 0.8)' : '#767577'
          }}
          thumbColor={ACCENT_RED_COLOR}
          onValueChange={handleModeTogglerChange}
          value={isAdvancedModeOn}
          style={styles.toggler}
        />
      </View>
    </View>
  )
}


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
    paddingLeft: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20
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
  }
})
