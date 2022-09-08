import React from 'react'
import {Text, View} from 'react-native'
import {Keyboard} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase} from './styles'


interface FormConverterProps {
    theme: Theme
}

export const FormConverter = (props: FormConverterProps): JSX.Element => {

    const keyboardButtonClickHandler = item => console.log(item)

    return (
        <View style={stylesBase.container}>
            <Text>Title</Text>
            <Keyboard theme={props.theme} onButtonClick={keyboardButtonClickHandler}/>
        </View>
    )
}