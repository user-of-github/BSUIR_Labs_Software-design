import React from 'react'
import {Dimensions, EmitterSubscription, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack'


import {Header} from './components/header/Header'
import {Theme} from './types/Theme'
import {DARK_COLOR, LIGHT_COLOR} from './utils/styleConstants'
import {HomeScreen} from './screens/homeScreen/HomeScreen'
import {CurrencyConverterScreen} from './screens/currencyConverterScreen/CurrencyConverterScreen'
import {DistanceConverterScreen} from './screens/distanceConverterScreen/DistanceConverterScreen'
import {VolumeConverterScreen} from './screens/volumeConverterScreen/VolumeConverterScreen'
import {WeightConverterScreen} from './screens/weightConverterScreen/WeightConverterScreen'
import {isPortrait} from './utils/orientation'
import {Orientation} from './types/Orientation'


const Stack = createNativeStackNavigator()

enableScreens();



export default function App(): JSX.Element {
    const [theme, setTheme] = React.useState<Theme>(Theme.LIGHT)
    const [premium, setPremium] = React.useState<boolean>(false)
    const [orientation, setOrientation] = React.useState<Orientation>(isPortrait() ? 'portrait' : 'landscape')

    const toggleTheme = (): void => theme === Theme.LIGHT ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT)
    const togglePremium = (): void => setPremium(!premium)

    const backgroundStyles = [
        stylesBase.container,
        orientation === 'portrait' ? stylesBase.containerPortrait : stylesBase.containerLandscape,
        theme === Theme.LIGHT ? stylesLightTheme.container : stylesDarkTheme.container
    ]

    React.useEffect(() => {
        const onOrientationChange = (): void => setOrientation(isPortrait() ? 'portrait' : 'landscape')
        const subscription: EmitterSubscription = Dimensions.addEventListener('change', onOrientationChange)

        return () => subscription.remove()
    })


    return (
        <SafeAreaView style={backgroundStyles}>
            <StatusBar barStyle="default" hidden={false} translucent={false}/>
                <NavigationContainer>
                    <Header changeThemeClickHandler={toggleTheme} theme={theme} premium={premium}/>
                    <Stack.Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: 'transparent'}}}>
                        <Stack.Screen name='Home' children={() => <HomeScreen theme={theme} premium={premium} togglePremium={togglePremium} orientation={orientation}/>}/>
                        <Stack.Screen name="CurrencyConverter" children={() => <CurrencyConverterScreen orientation={orientation} theme={theme} premium={premium}/>}/>
                        <Stack.Screen name='DistanceConverter' children={() => <DistanceConverterScreen orientation={orientation} theme={theme} premium={premium}/>}/>
                        <Stack.Screen name='VolumeConverter' children={() => <VolumeConverterScreen orientation={orientation} theme={theme} premium={premium}/>}/>
                        <Stack.Screen name='WeightConverter' children={() => <WeightConverterScreen orientation={orientation} theme={theme} premium={premium}/>}/>
                    </Stack.Navigator>
                </NavigationContainer>
        </SafeAreaView>
    )
}

const stylesBase = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    containerPortrait: {
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 20,
    },
    containerLandscape: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    }
})

const stylesLightTheme = StyleSheet.create({
    container: {backgroundColor: LIGHT_COLOR}
})

const stylesDarkTheme = StyleSheet.create({
    container: {backgroundColor: DARK_COLOR}
})
