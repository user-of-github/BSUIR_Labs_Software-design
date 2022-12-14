import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen } from '../screens/HomeScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { StatusBar, StatusBarStyle, StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import { Theme } from '../types/Theme'
import { RootState } from '../state/store'
import { SetUpTimerScreen } from '../screens/SetUpTimerScreen'
import { RunTimerScreen } from '../screens/RunTimerScreen'


const Stack = createNativeStackNavigator()


export const Application = React.memo((): JSX.Element => {
  const { theme } = useSelector((state: RootState) => state.general)

  const style = [styles.wrapper, theme === Theme.DARK ? styles.wrapperDark : styles.wrapperLight]

  const statusBarBackground: string = theme === Theme.DARK ? '#1e272e' : 'white'
  const statusBarText: string = theme === Theme.DARK ? 'light-content' : 'dark-content'

  return (
    <>
      <StatusBar barStyle={statusBarText as StatusBarStyle} backgroundColor={statusBarBackground}/>
      <View style={style}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="SetUpTimer" component={SetUpTimerScreen} />
            <Stack.Screen name="RunTimer" component={RunTimerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  wrapperLight: {
    backgroundColor: 'white'
  },
  wrapperDark: {
    backgroundColor: '#1e272e'
  }
})
