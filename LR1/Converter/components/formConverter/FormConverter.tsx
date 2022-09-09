import React from 'react'
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {Keyboard, KeyboardButtonItemType} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase, stylesDark, stylesLight} from './styles'

import * as Clipboard from 'expo-clipboard'


import CopyForLight from '../../assets/copy-dark.png'
import CopyForDark from '../../assets/copy-light.png'

export interface ConverterRules {
    title1: string
    title2: string

    ratioTo2: number
}

interface FormConverterProps {
    theme: Theme
    rules: ConverterRules
}

export const FormConverter = (props: FormConverterProps): JSX.Element => {

    const [currentValue, setCurrentValue] = React.useState<string>('')
    const [value2, setValue2] = React.useState<string>('')

    React.useEffect(() => updateValues(), [currentValue])

    const updateValues = () => {
        if (currentValue !== '') {
            const value2raw: number = Number.parseFloat(currentValue) * props.rules.ratioTo2
            setValue2((Math.trunc(value2raw) === value2raw ? Math.trunc(value2raw) : value2raw.toFixed(2)).toString())
        } else {
            setValue2('')
        }
    }

    const keyboardButtonClickHandler = item => {
        if (item.type === KeyboardButtonItemType.DIGIT)
            setCurrentValue(currentValue + item.text)
        else if (item.type === KeyboardButtonItemType.DOT)
            !currentValue.includes('.') && setCurrentValue(currentValue + item.text)
        else if (item.type === KeyboardButtonItemType.ERASE)
            currentValue.length !== 0 && setCurrentValue(currentValue.slice(0, -1))
    }

    const labelStyles = [stylesBase.label, props.theme === Theme.LIGHT ? stylesLight.label : stylesDark.label]
    const lineStyles = [stylesBase.line, props.theme === Theme.LIGHT ? stylesLight.line : stylesDark.line]

    return (
        <View style={stylesBase.container}>
            <View style={stylesBase.form}>
                <View style={stylesBase.formGroup}>
                    <Text style={labelStyles}>{props.rules.title1}</Text>
                    <View style={stylesBase.inputRow}>
                        <TextInput style={stylesBase.input} editable={false} showSoftInputOnFocus={false} value={currentValue}/>
                        <TouchableOpacity onPress={() => Clipboard.setStringAsync(currentValue)}>
                            <Image source={props.theme === Theme.LIGHT ? CopyForLight : CopyForDark} style={stylesBase.copyIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={lineStyles}/>
                <View style={stylesBase.formGroup}>
                    <Text style={labelStyles}>{props.rules.title2}</Text>
                    <View style={stylesBase.inputRow}>
                        <TextInput style={stylesBase.input} showSoftInputOnFocus={false} editable={false} value={value2}/>
                        <TouchableOpacity onPress={() => Clipboard.setStringAsync(value2)}>
                            <Image source={props.theme === Theme.LIGHT ? CopyForLight : CopyForDark} style={stylesBase.copyIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Keyboard theme={props.theme} onButtonClick={keyboardButtonClickHandler}/>
        </View>
    )
}