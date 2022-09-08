import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    buttonContainer: {
        flexBasis: '33%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },

    button: {
        width: '100%',
        height: 60,
        borderRadius: 20,
        backgroundColor: 'red',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 30,
        fontWeight: '900'
    }
})


export const stylesLight = StyleSheet.create({
    button: {backgroundColor: DARK_COLOR},
    buttonText: {color: LIGHT_COLOR}
})


export const stylesDark = StyleSheet.create({
    button: {backgroundColor: LIGHT_COLOR},
    buttonText: {color: DARK_COLOR}
})