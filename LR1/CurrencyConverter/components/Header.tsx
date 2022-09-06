import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import IconForLight from '../assets/logo-for-light.png'
import IconForDark from '../assets/logo-for-dark.png'
import {Theme} from '../types/Theme'
import ThemeIconLight from '../assets/theme-to-dark.png'
import ThemeForDark from '../assets/theme-to-light.png'
import {DARK_COLOR, LIGHT_COLOR} from '../styleConstants'


interface HeaderProps {
    changeThemeClickHandler: () => void
    currentTheme: Theme
}


export const Header = (props: HeaderProps): JSX.Element => (
    <View style={stylesBase.container}>
        <View style={stylesBase.titleLogoContainer}>
            <Image source={props.currentTheme === Theme.LIGHT ? IconForLight : IconForDark} style={stylesBase.image}/>
            <View>
                <Text style={[stylesBase.title, props.currentTheme === Theme.LIGHT ? stylesLightTheme.title : stylesDarkTheme.title]}>
                    Units Converter
                </Text>
                <Text style={[stylesBase.subtitle, props.currentTheme === Theme.LIGHT ? stylesLightTheme.subtitle : stylesDarkTheme.subtitle]}>
                    by @user-of-gihtub
                </Text>
            </View>
        </View>
        <TouchableHighlight onPress={(): void => props.changeThemeClickHandler()}
                            style={stylesBase.themeToggler}
                            activeOpacity={100}
                            underlayColor="#DDDDDD"
        >
            <Image source={props.currentTheme === Theme.DARK ? ThemeIconLight : ThemeForDark}
                   style={stylesBase.themeTogglerIcon}
            />
        </TouchableHighlight>
    </View>
)

const stylesBase = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleLogoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    themeToggler: {
        borderRadius: 1000,
        padding: 5,
    },
    themeTogglerIcon: {
        width: 40,
        height: 40,
        marginLeft: 'auto'
    },
    title: {
        fontSize: 25,
        fontWeight: '900'
    },
    subtitle: {
        fontWeight: '300',
        fontSize: 15
    }
})

const stylesLightTheme = StyleSheet.create({
    title: {color: DARK_COLOR},
    subtitle: {color: DARK_COLOR}
})

const stylesDarkTheme = StyleSheet.create({
    title: {color: LIGHT_COLOR},
    subtitle: {color: LIGHT_COLOR}
})