import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%'
    },

    input: {
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 10
    },

    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
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

    line: {
        height: 1,
        width: '100%',
        backgroundColor: DARK_COLOR,
        marginBottom: 20
    }
})


export const stylesLight = StyleSheet.create({
    line: {backgroundColor: DARK_COLOR},
    label: {color: DARK_COLOR}
})


export const stylesDark = StyleSheet.create({
    line: {backgroundColor: LIGHT_COLOR},
    label: {color: LIGHT_COLOR}
})