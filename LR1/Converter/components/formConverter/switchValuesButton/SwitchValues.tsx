import React from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {DARK_COLOR} from '../../../utils/styleConstants'
import Swap from '../../../assets/swap.png'

interface SwitchValuesProps {
    onClick: () => void
    premium: boolean
}

export const SwitchValues = React.memo((props: SwitchValuesProps): JSX.Element => {
    //console.log('SWITCH RENDERED !!!!')

    return (
        <TouchableOpacity style={[styles.button, props.premium && styles.enabled]}
                          onPress={(): void => props.onClick()}>
            <Image source={Swap} style={styles.image}/>
        </TouchableOpacity>
    )
})


const styles = StyleSheet.create({
    button: {
        paddingVertical: 17,
        paddingHorizontal: 17,
        //borderColor: DARK_COLOR,
        //borderWidth: 2,
        //borderStyle: 'solid',
        backgroundColor: '#FFB743',
        color: DARK_COLOR,
        borderRadius: 100,
        width: 'auto',
        marginTop: 5,
        marginLeft: 'auto',
        // borderColor: 'red',
        // borderWidth: 1,
        // borderStyle: 'solid',
        transform: [{ rotate: '90deg' }],
        opacity: 0.3
    },
    image: {
        width: 25,
        height: 25
    },
    enabled: {
        opacity: 1
    }
})