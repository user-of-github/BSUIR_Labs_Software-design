import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    premiumButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderColor: LIGHT_COLOR,
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 100,
        width: 'auto',
        marginLeft: 'auto',
        backgroundColor: LIGHT_COLOR
    },

    premiumEnabled: {
        borderColor: 'green'
    },

    premiumButtonImg: {
        width: 25,
        height: 25
    },

    premiumButtonTitle: {
        textTransform: 'uppercase',
        fontWeight: '100',
        fontSize: 15
    },
})