import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { SettingsPanel } from '../components/settingsPanel/SettingsPanel'
import { ITEMS_BG_COLOR } from '../utils/styleConstants'
import { useSelector } from 'react-redux'
import { Theme } from '../types/Theme'
import { useNavigation } from '@react-navigation/native'
import HomeIconDark from '../assets/images/homeDark.png'
import HomeIconLight from '../assets/images/homeLight.png'


export const SettingsScreen = (): JSX.Element => {
  const navigation = useNavigation()

  // @ts-ignore
  const { theme } = useSelector(state => state.general)
  const containerStyles = [style.container, theme === Theme.DARK ? style.containerDark : style.containerLight]
  const titleStyles = [style.title, theme === Theme.DARK ? style.titleDark : style.titleLight]
  const copyrightStyles = [style.copyright, theme === Theme.DARK ? style.copyrightDark : style.copyrightLight]

  const goHomeIcon = theme === Theme.DARK ? HomeIconDark : HomeIconLight
  const goHomeButtonStyles = [style.goHome, theme === Theme.DARK ? style.goHomeDark : style.goHomeLight]

  return (
    <View style={style.wrapper}>
      <View style={containerStyles}>
        <Text style={titleStyles}>Settings</Text>
        <SettingsPanel />
        <Text style={copyrightStyles}>Copyright © 2022 | Pomodoro App{'\n'}by @user-of-github</Text>
      </View>

      <TouchableOpacity style={goHomeButtonStyles} onPress={() => {
        Vibration.vibrate(20)
        navigation.navigate('Home' as never)
      }}>
        <Image source={goHomeIcon} style={style.goHomeIcon} />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 30,
    height: '100%'
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'yellow',
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

  container: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  containerLight: {
    backgroundColor: ITEMS_BG_COLOR
  },
  containerDark: {
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },

  copyright: {
    fontStyle: 'italic',
    paddingLeft: 10,
    paddingTop: 20,
    // borderTopColor: 'rgba(255,255,255,.5)',
    // borderTopWidth: 1,
    width: 'auto',
    borderStyle: 'solid'
  },

  copyrightLight: {
    color: 'black'
  },

  copyrightDark: {
    color: ITEMS_BG_COLOR
  },

  goHome: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto'
  },

  goHomeLight: {
    backgroundColor: 'black'
  },

  goHomeDark: {
    backgroundColor: ITEMS_BG_COLOR
  },

  goHomeIcon: {
    width: 30,
    height: 30
  }
})
