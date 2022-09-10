import React from 'react'
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {Theme} from '../../types/Theme'
import {stylesBase, stylesDarkTheme, stylesLightTheme} from './styles'

import DistanceLight from '../../assets/distance-light.png'
import DistanceDark from '../../assets/distance-dark.png'
import CurrencyLight from '../../assets/exchange-light.png'
import CurrencyDark from '../../assets/exchange-dark.png'
import WeightLight from '../../assets/weight-light.png'
import WeightDark from '../../assets/weight-dark.png'
import VolumeLight from '../../assets/volume-light.png'
import VolumeDark from '../../assets/volume-dark.png'
import Premium from '../../assets/crown.png'


interface HomeScreenProps {
    theme: Theme
    premium: boolean
    togglePremium: () => void
}

interface MenuItem {
    imageForLight: any
    imageForDark: any
    title: string
    screenName: string
}

const MENU_DATA: Array<MenuItem> = [
    {imageForLight: DistanceLight, imageForDark: DistanceDark, title: 'Distance', screenName: 'DistanceConverter'},
    {imageForLight: CurrencyLight, imageForDark: CurrencyDark, title: 'Currency', screenName: 'CurrencyConverter'},
    {imageForLight: WeightLight, imageForDark: WeightDark, title: 'Weight', screenName: 'WeightConverter'},
    {imageForLight: VolumeLight, imageForDark: VolumeDark, title: 'Volume', screenName: 'VolumeConverter'}
]

export const HomeScreen = ({theme, premium, togglePremium}: HomeScreenProps): JSX.Element => {
    const buttonContainerStyle = [
        stylesBase.selectItem,
        theme === Theme.LIGHT ? stylesLightTheme.selectItem : stylesDarkTheme.selectItem
    ]
    const buttonIcon = (menuItem: MenuItem) => theme === Theme.LIGHT ? menuItem.imageForLight : menuItem.imageForDark
    const buttonTitleStyle = [
        stylesBase.selectItemTitle,
        theme === Theme.LIGHT ? stylesLightTheme.selectItemTitle : stylesDarkTheme.selectItemTitle
    ]

    const navigation = useNavigation()


    return (
        <View style={stylesBase.wrapper}>
            <View style={stylesBase.container}>
                <View style={stylesBase.itemsContainer}>
                    {
                        MENU_DATA.map((menuItem: MenuItem): JSX.Element => (
                            <TouchableOpacity style={buttonContainerStyle}
                                              key={menuItem.title}
                                              activeOpacity={0.7}
                                              onPress={() => navigation.navigate(menuItem.screenName as never)}
                            >
                                <Image source={buttonIcon(menuItem)} style={stylesBase.selectItemIcon}/>
                                <Text style={buttonTitleStyle}>{menuItem.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.5} onPress={(): void => togglePremium()}>
                <View style={stylesBase.premiumButton}>
                    <Image source={Premium} style={stylesBase.premiumButtonImg}/>
                    <Text style={stylesBase.premiumButtonTitle}>{premium ? 'Disable' : 'Enable'} PRO mode</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}