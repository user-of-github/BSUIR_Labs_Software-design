import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: '85%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        color: DARK_COLOR,
        fontWeight: 'bold'
    },

    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: 20
    },

    label: {
        fontSize: 17,
        marginBottom: 3,
        fontWeight: '900'
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


export const stylesLight = StyleSheet.create({
    label: {color: DARK_COLOR}
})


export const stylesDark = StyleSheet.create({
    label: {color: LIGHT_COLOR}
})