import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    titleLogoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    premiumIcon: {
        position: 'absolute',
        right: -27,
        top: 0,
        bottom: 0,
        width: 20,
        height: 20
    },
    image: {
        width: 45,
        height: 45,
        marginRight: 10
    },
    themeToggler: {
        borderRadius: 15,
        padding: 5
    },
    themeTogglerIcon: {
        width: 45,
        height: 45,
        marginLeft: 'auto'
    },
    title: {
        fontSize: 30,
        fontWeight: '900'
    },
    subtitle: {
        fontWeight: '400',
        fontSize: 15
    }
})

export const stylesLightTheme = StyleSheet.create({
    title: {color: DARK_COLOR},
    subtitle: {color: DARK_COLOR},
    themeToggler: {backgroundColor: 'rgba(255, 255, 255, 0.6)'}
})

export const stylesDarkTheme = StyleSheet.create({
    title: {color: LIGHT_COLOR},
    subtitle: {color: LIGHT_COLOR},
    themeToggler: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}
})