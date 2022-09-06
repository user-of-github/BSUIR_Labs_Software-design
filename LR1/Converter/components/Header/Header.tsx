import React from 'react'
import {Image, Text, TouchableHighlight, View} from 'react-native'

import {Theme} from '../../types/Theme'
import {stylesBase, stylesDarkTheme, stylesLightTheme} from './styles'

import IconForLight from '../../assets/logo-for-light.png'
import IconForDark from '../../assets/logo-for-dark.png'
import ThemeIconLight from '../../assets/theme-to-dark.png'
import ThemeForDark from '../../assets/theme-to-light.png'


interface HeaderProps {
    changeThemeClickHandler: () => void
    currentTheme: Theme
}


export const Header = (props: HeaderProps): JSX.Element => (
    <View style={stylesBase.container}>
        <View style={stylesBase.titleLogoContainer}>
            <Image source={props.currentTheme === Theme.LIGHT ? IconForLight : IconForDark} style={stylesBase.image}/>
            <View>
                <Text style={[stylesBase.title,
                    props.currentTheme === Theme.LIGHT ? stylesLightTheme.title : stylesDarkTheme.title]}>
                    Units Converter
                </Text>
                <Text style={[stylesBase.subtitle,
                    props.currentTheme === Theme.LIGHT ? stylesLightTheme.subtitle : stylesDarkTheme.subtitle]}>
                    by @user-of-gihtub
                </Text>
            </View>
        </View>
        <TouchableHighlight onPress={(): void => props.changeThemeClickHandler()}
                            style={stylesBase.themeToggler}
                            activeOpacity={100}
                            underlayColor="#DDDDDD">
            <Image source={props.currentTheme === Theme.DARK ? ThemeIconLight : ThemeForDark}
                   style={stylesBase.themeTogglerIcon}
            />
        </TouchableHighlight>
    </View>
)

