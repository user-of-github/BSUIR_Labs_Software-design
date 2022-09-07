import React from 'react'
import {Image, TouchableOpacity, View, Text} from 'react-native'

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
import {useNavigation} from '@react-navigation/native'


interface HomeScreenProps {
    theme: Theme
}

interface MenuItem {
    imageForLight: any
    imageForDark: any
    title: string
    screenName: string
}

const MENU_DATA: Array<MenuItem> = [
    {imageForLight: DistanceLight, imageForDark: DistanceDark, title: 'Distance', screenName: 'CurrencyConverter'},
    {imageForLight: CurrencyLight, imageForDark: CurrencyDark, title: 'Currency', screenName: 'CurrencyConverter'},
    {imageForLight: WeightLight, imageForDark: WeightDark, title: 'Weight', screenName: 'CurrencyConverter'},
    {imageForLight: VolumeLight, imageForDark: VolumeDark, title: 'Volume', screenName: 'CurrencyConverter'}
]

export const HomeScreen = ({theme}: HomeScreenProps): JSX.Element => {
    const buttonContainerStyle: Array<any> = [
        stylesBase.selectItem,
        theme === Theme.LIGHT ? stylesLightTheme.selectItem : stylesDarkTheme.selectItem
    ]
    const buttonIcon = (menuItem: MenuItem) => theme === Theme.LIGHT ? menuItem.imageForLight : menuItem.imageForDark
    const buttonTitleStyle: Array<any> = [
        stylesBase.selectItemTitle,
        theme === Theme.LIGHT ? stylesLightTheme.selectItemTitle : stylesDarkTheme.selectItemTitle
    ]

    const navigation = useNavigation()


    return (
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
    )
}