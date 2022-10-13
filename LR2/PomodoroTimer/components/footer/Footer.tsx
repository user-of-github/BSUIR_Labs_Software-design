import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import SettingsIconLight from "../../assets/images/settings.png";
import SettingsIconDark from "../../assets/images/settingsDark.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Theme } from "../../types/Theme";
import { ITEMS_BG_COLOR } from "../../utils/styleConstants";


export const Footer = (): JSX.Element => {
  const navigation = useNavigation()
  console.log('footer rendered');
  // @ts-ignore
  const { theme } = useSelector(state => state.theme);
  console.log('Header rendered');

  const settingsIcon = SettingsIconDark // theme === Theme.DARK ? SettingsIconDark : SettingsIconLight
  const settingsButtonStyles = [styles.settings, theme === Theme.DARK ? styles.settingsDark : styles.settingsLight]


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={settingsButtonStyles} onPress={() => navigation.navigate('Settings' as never)}>
          <Image source={settingsIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 5
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingLeft: 10,
    overflow: 'hidden',
    borderRadius: 7,
  },


  settings: {
    height: '100%',
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 'auto'
  },

  settingsLight: {
    backgroundColor: ITEMS_BG_COLOR,
  },

  settingsDark: {
    backgroundColor: ITEMS_BG_COLOR,
  },

  settingsIcon: {
    width: 30,
    height: 30
  }
});
