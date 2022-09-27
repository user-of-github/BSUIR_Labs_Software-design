import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    selectItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 10,
        position: 'relative',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        width: '100%',
        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth: 1,
        height: 70
    },
    selectItemLandscape: {
        height: 60,
    },

    selectItemIcon: {
        width: 40,
        height: 40,
    },

    selectItemTitle: {
        fontSize: 20,
        fontWeight: '100',
        marginLeft: 30
    },
})


export const stylesLightTheme = StyleSheet.create({
    selectItem: {backgroundColor: 'transparent', borderBottomColor: 'rgba(44, 44, 84, 0.15)'},
    selectItemTitle: {color: DARK_COLOR}
})

export const stylesDarkTheme = StyleSheet.create({
    selectItem: {backgroundColor: 'transparent', borderBottomColor: 'rgba(247, 241, 227, 0.5)'},
    selectItemTitle: {color: LIGHT_COLOR}
})