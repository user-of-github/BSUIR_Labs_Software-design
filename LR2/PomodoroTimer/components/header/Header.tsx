import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Theme } from "../../types/Theme";
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from "../../utils/styleConstants";


export const Header = (): JSX.Element => {
  // @ts-ignore
  const { theme } = useSelector(state => state.theme);
  console.log('Header rendered');
  const titleContainerStyle = [styles.titleContainer, theme === Theme.DARK ? styles.titleContainerDark : styles.titleContainerLight]
  return (
    <View style={styles.container}>
      <View style={titleContainerStyle}>
        <Text style={styles.title}>Pomodoro Timer 🍅</Text>
        <Text style={styles.subtitle}>by @user-of-github</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
  },
  titleContainerLight: {
    backgroundColor: ITEMS_BG_COLOR,
  },
  titleContainerDark: {
    backgroundColor: 'black'
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: ACCENT_RED_COLOR
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '100',
    color: ACCENT_RED_COLOR
  }
})
