import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: 10
    },

    landscape: {
        justifyContent: 'space-between',
        flexDirection: 'row'
        // borderColor: 'red',
        // borderWidth: 1,
        // borderStyle: 'solid'
    },

    portrait: {
        justifyContent: 'space-between',
        flexDirection: 'column'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },

    formLandscape: {
        width: '50%'
    },
    formPortrait: {
        width: '100%'
    },

    line: {
        height: 1,
        width: '100%',
        backgroundColor: DARK_COLOR,
        marginBottom: 20
    },

    swapContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 32,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: 126
    },

    swap: {
        width: 20,
        height: 20
    }
})


export const stylesLight = StyleSheet.create({
    line: {backgroundColor: DARK_COLOR}
})


export const stylesDark = StyleSheet.create({
    line: {backgroundColor: LIGHT_COLOR}
})