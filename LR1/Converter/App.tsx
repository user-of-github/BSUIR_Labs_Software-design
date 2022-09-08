import React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Header} from './components/header/Header'
import {Theme} from './types/Theme'
import {DARK_COLOR, LIGHT_COLOR} from './utils/styleConstants'
import {HomeScreen} from './screens/homeScreen/HomeScreen'
import {CurrencyConverterScreen} from './screens/currencyConverterScreen/CurrencyConverterScreen'


const Stack = createNativeStackNavigator()


export default function App(): JSX.Element {
    const [theme, setTheme] = React.useState<Theme>(Theme.LIGHT)

    const toggleTheme = (): void => theme === Theme.LIGHT ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT)

    const backgroundStyles = [stylesBase.container, theme === Theme.LIGHT ? stylesLightTheme.container : stylesDarkTheme.container]

    return (
        <>
            <StatusBar barStyle="default" hidden={false} translucent={false}/>
            <View style={backgroundStyles}>
                <Header changeThemeClickHandler={toggleTheme} theme={theme}/>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: 'transparent'}}}>
                        <Stack.Screen name="Home" children={() => <HomeScreen theme={theme}/>}/>
                        <Stack.Screen name="CurrencyConverter" children={() => <CurrencyConverterScreen theme={theme}/>}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </>
    )
}

const stylesBase = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 25,
        display: 'flex',
        flexDirection: 'column'
    }
})

const stylesLightTheme = StyleSheet.create({
    container: {backgroundColor: LIGHT_COLOR}
})

const stylesDarkTheme = StyleSheet.create({
    container: {backgroundColor: DARK_COLOR}
})
