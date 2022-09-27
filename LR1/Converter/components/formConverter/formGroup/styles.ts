import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    pressable: {
        width: '65%',
        marginRight: 'auto',
        marginLeft: 5
    },

    inputBase: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        color: DARK_COLOR,
        fontWeight: 'bold'
    },
    dropDownTouchable: {
        backgroundColor: LIGHT_COLOR,
        color: DARK_COLOR,
        borderRadius: 10
    },

    inputInPressable: {
        width: '100%'
    },

    inputNotInPressable: {
        width: '65%',
        marginRight: 'auto',
        marginLeft: 5
    },

    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10
    },

    inputRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    copyIcon: {
        width: 27,
        height: 27,
        opacity: 0.35
    }
})