import {StyleSheet} from 'react-native'
import {DARK_COLOR} from '../../../../utils/styleConstants'


export const styles = StyleSheet.create({
    pressable: {
        width: '60%',
        marginRight: 'auto',
        marginLeft: 5
    },

    inputBase: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 15,
        borderRadius: 10,
        color: DARK_COLOR,
        fontWeight: '900',
        width: '63%',
        marginRight: 'auto',
        marginLeft: 5
    },

    inputInPressable: {
        width: '100%'
    },

    inputNotInPressable: {
        width: '50%',
    },
})