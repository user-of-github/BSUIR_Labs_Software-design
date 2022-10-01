import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    dropDownTouchable: {
        backgroundColor: LIGHT_COLOR,
        color: DARK_COLOR,
        borderRadius: 10
    },

    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },

    inputRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    copy: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        opacity: 0.5
    },

    copyIcon: {
        width: 20,
        height: 20,
        opacity: 0.35
    },

    enabled: {
        opacity: 1
    }
})