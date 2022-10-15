import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen } from '../screens/homeScreen/HomeScreen'
import { SettingsScreen } from '../screens/settingsScreen/SettingsScreen'
import { StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import { Theme } from '../types/Theme'


const Stack = createNativeStackNavigator()


export const Application = React.memo((): JSX.Element => {
  // @ts-ignore
  const { theme } = useSelector(state => state.theme)

  const style = [styles.wrapper, theme === Theme.DARK ? styles.wrapperDark : styles.wrapperLight]

  return (
    <View style={style}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
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
