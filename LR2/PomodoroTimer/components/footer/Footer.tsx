import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native'
import SettingsIconDark from '../../assets/images/settingsDark.png'
import SettingsIconLight from '../../assets/images/settingsLight.png'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { ITEMS_BG_COLOR } from '../../utils/styleConstants'


export const Footer = (): JSX.Element => {
  const navigation = useNavigation()
  //console.log('footer rendered');
  // @ts-ignore
  const { theme } = useSelector(state => state.theme)
  //console.log('Header rendered');

  const settingsIcon =  theme === Theme.DARK ? SettingsIconDark : SettingsIconLight
  const settingsButtonStyles = [styles.settings, theme === Theme.DARK ? styles.settingsDark : styles.settingsLight]


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={settingsButtonStyles} onPress={() => {
          Vibration.vibrate(20)
          navigation.navigate('Settings' as never)}}>
          <Image source={settingsIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

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


  settings: {
    height: '100%',
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  settingsLight: {
    backgroundColor: 'black'
  },

  settingsDark: {
    backgroundColor: ITEMS_BG_COLOR
  },

  settingsIcon: {
    width: 30,
    height: 30
  }
})
