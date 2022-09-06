import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
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
        padding: 5
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

export const stylesLightTheme = StyleSheet.create({
    title: {color: DARK_COLOR},
    subtitle: {color: DARK_COLOR}
})

export const stylesDarkTheme = StyleSheet.create({
    title: {color: LIGHT_COLOR},
    subtitle: {color: LIGHT_COLOR}
})