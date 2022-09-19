import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'relative'
    },

    containerPortrait: {
        width: '100%'
    },

    containerLandscape: {
        width: '50%',
        // borderColor: 'red',
        // borderWidth: 1,
        // borderStyle: 'solid',
        padding: 0
    },

    buttonContainer: {
        marginVertical: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        height: 60
    },

    buttonContainerLandscape: {
      height: 50,
      flexBasis: '27%',
    },

    buttonContainerPortrait: {
        height: 60,
        flexBasis: '30%',
    },

    button: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'red',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'

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