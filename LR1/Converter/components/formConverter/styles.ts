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

    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },

    line: {
        height: 1,
        width: '100%',
        backgroundColor: DARK_COLOR,
        marginBottom: 20
    }
})


export const stylesLight = StyleSheet.create({
    line: {backgroundColor: DARK_COLOR}
})


export const stylesDark = StyleSheet.create({
    line: {backgroundColor: LIGHT_COLOR}
})