import {Image, Text, TouchableOpacity} from 'react-native'
import {stylesBase, stylesDarkTheme, stylesLightTheme} from './styles'
import React from 'react'
import {Theme} from '../../../types/Theme'
import {useNavigation} from '@react-navigation/native'
import {Orientation} from '../../../types/Orientation'


export interface MenuItem {
    imageForLight: any
    imageForDark: any
    title: string
    screenName: string
}

interface MenuItemProps {
    theme: Theme
    menuItem: MenuItem
    orientation: Orientation
}


export const MenuItem = ({theme, menuItem, orientation}: MenuItemProps): JSX.Element => {
    const buttonContainerStyle = [
        stylesBase.selectItem,
        orientation === 'portrait' ? stylesBase.selectItemPortrait : stylesBase.selectItemLandscape,
        theme === Theme.LIGHT ? stylesLightTheme.selectItem : stylesDarkTheme.selectItem
    ]

    const buttonIcon = (menuItem: MenuItem) => theme === Theme.LIGHT ? menuItem.imageForLight : menuItem.imageForDark
    const buttonTitleStyle = [
        stylesBase.selectItemTitle,
        theme === Theme.LIGHT ? stylesLightTheme.selectItemTitle : stylesDarkTheme.selectItemTitle
    ]

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={buttonContainerStyle}
                          key={menuItem.title}
                          activeOpacity={0.7}
                          onPress={() => navigation.navigate(menuItem.screenName as never)}
        >
            <Image source={buttonIcon(menuItem)} style={stylesBase.selectItemIcon}/>
            <Text style={buttonTitleStyle}>{menuItem.title}</Text>
        </TouchableOpacity>
    )
}