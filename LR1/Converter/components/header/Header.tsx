import React from 'react'
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'

import {Theme} from '../../types/Theme'
import {stylesBase, stylesDarkTheme, stylesLightTheme} from './styles'

import LogoLight from '../../assets/logo-light.png'
import LogoDark from '../../assets/logo-dark.png'
import ThemeIconLight from '../../assets/theme-dark.png'
import ThemeIconDark from '../../assets/theme-light.png'
import {useNavigation} from '@react-navigation/native'


interface HeaderProps {
    changeThemeClickHandler: () => void
    theme: Theme
}


export const Header = (props: HeaderProps): JSX.Element => {
    const navigation = useNavigation()


    return (
        <View style={stylesBase.container}>
            <View style={stylesBase.titleLogoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
                    <Image source={props.theme === Theme.LIGHT ? LogoDark : LogoLight} style={stylesBase.image}/>
                </TouchableOpacity>
                <View>
                    <Text style={[stylesBase.title,
                        props.theme === Theme.LIGHT ? stylesLightTheme.title : stylesDarkTheme.title]}>
                        Units Converter
                    </Text>
                    <Text style={[stylesBase.subtitle,
                        props.theme === Theme.LIGHT ? stylesLightTheme.subtitle : stylesDarkTheme.subtitle]}>
                        by @user-of-gihtub
                    </Text>
                </View>
            </View>
            <TouchableHighlight onPress={(): void => props.changeThemeClickHandler()}
                                style={[stylesBase.themeToggler, props.theme === Theme.LIGHT ? stylesLightTheme.themeToggler : stylesDarkTheme.themeToggler]}
                                activeOpacity={100}
                                underlayColor="#DDDDDD">
                <Image source={props.theme === Theme.DARK ? ThemeIconDark : ThemeIconLight}
                       style={stylesBase.themeTogglerIcon}
                />
            </TouchableHighlight>
        </View>
    )
}

