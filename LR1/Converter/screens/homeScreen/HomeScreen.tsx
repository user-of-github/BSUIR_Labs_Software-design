import React from 'react'

import {Theme} from '../../types/Theme'

import DistanceLight from '../../assets/distance-light.png'
import DistanceDark from '../../assets/distance-dark.png'
import CurrencyLight from '../../assets/exchange-light.png'
import CurrencyDark from '../../assets/exchange-dark.png'
import {Image, TouchableOpacity, View, Text} from 'react-native'
import {stylesBase, stylesDarkTheme, stylesLightTheme} from './styles'


interface HomeScreenProps {
    theme: Theme
}

interface MenuItem {
    imageForLight: any
    imageForDark: any
    title: string
}

const MENU_DATA: Array<MenuItem> = [
    {imageForLight: DistanceLight, imageForDark: DistanceDark, title: 'Distance'},
    {imageForLight: CurrencyLight, imageForDark: CurrencyDark, title: 'Currency'},
    {imageForLight: DistanceLight, imageForDark: DistanceDark, title: 'Distance2'},
    {imageForLight: CurrencyLight, imageForDark: CurrencyDark, title: 'Currency2'},
]

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
    const buttonContainerStyle: Array<any> = [stylesBase.selectItem, props.theme === Theme.LIGHT ? stylesLightTheme.selectItem : stylesDarkTheme.selectItem]
    const buttonIcon = (menuItem: MenuItem) => props.theme === Theme.LIGHT ? menuItem.imageForLight : menuItem.imageForDark
    const buttonTitleStyle: Array<any> = [stylesBase.selectItemTitle, props.theme === Theme.LIGHT ? stylesLightTheme.selectItemTitle : stylesDarkTheme.selectItemTitle]

    return (
        <View style={stylesBase.container}>
            <View style={stylesBase.itemsContainer}>
                {
                    MENU_DATA.map((menuItem: MenuItem): JSX.Element => (
                        <TouchableOpacity style={buttonContainerStyle} key={menuItem.title}>
                            <Image source={buttonIcon(menuItem)} style={stylesBase.selectItemIcon}/>
                            <Text style={buttonTitleStyle}>{menuItem.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}