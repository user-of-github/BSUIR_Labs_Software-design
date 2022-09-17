import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    selectItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        marginBottom: 10,
        position: 'relative'
    },

    selectItemPortrait: {
        width: 150,
        height: 150,
    },

    selectItemLandscape: {
        width: 120,
        height: 120,
    },

    selectItemIcon: {
        width: '50%',
        height: '50%',
    },

    selectItemTitle: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: '900'
    },
})


export const stylesLightTheme = StyleSheet.create({
    selectItem: {backgroundColor: DARK_COLOR},
    selectItemTitle: {color: LIGHT_COLOR}
})

export const stylesDarkTheme = StyleSheet.create({
    selectItem: {backgroundColor: LIGHT_COLOR},
    selectItemTitle: {color: DARK_COLOR}
})