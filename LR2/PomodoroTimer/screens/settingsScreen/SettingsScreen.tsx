import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SettingsPanel } from "../../components/settingsPanel/SettingsPanel";
import { ITEMS_BG_COLOR } from "../../utils/styleConstants";
import { useSelector } from "react-redux";
import { Theme } from "../../types/Theme";


export const SettingsScreen = (): JSX.Element => {

  // @ts-ignore
  const {theme} = useSelector(state => state.theme)
  const containerStyles = [style.container, theme === Theme.DARK ? style.containerDark : style.containerLight]
  const titleStyles = [style.title, theme === Theme.DARK ? style.titleDark : style.titleLight]

  return (
    <View style={style.wrapper}>
     <View style={containerStyles}>
       <Text style={titleStyles}>Settings</Text>
       <SettingsPanel/>
     </View>
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    marginTop: 20
  },
  title: {
    fontSize: 40,

    fontWeight: "900",
    marginBottom: 30
  },

  titleLight: {
    color: 'black',
  },

  titleDark: {
    color: ITEMS_BG_COLOR
  },

  container: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 30
  },
  containerLight: {
    backgroundColor: ITEMS_BG_COLOR
  },
  containerDark: {
    backgroundColor: 'black'
  }
})
