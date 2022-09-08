import React from 'react'
import {Text, TextInput, View} from 'react-native'
import {Keyboard, KeyboardButtonItemType} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase, stylesDark, stylesLight} from './styles'


export interface ConverterRules {
    title1: string
    title2: string
    title3: string

    ratioTo2: number
    ratioTo3: number
}

interface FormConverterProps {
    theme: Theme
    rules: ConverterRules
}

export const FormConverter = (props: FormConverterProps): JSX.Element => {

    const [currentValue, setCurrentValue] = React.useState<string>('')
    const [value2, setValue2] = React.useState<string>('')
    const [value3, setValue3] = React.useState<string>('')

    React.useEffect(() => updateValues(), [currentValue])

    const updateValues = () => {
        if (currentValue !== '') {
            setValue2((Number.parseFloat(currentValue) * props.rules.ratioTo2).toFixed(2).toString())
            setValue3((Number.parseFloat(currentValue) * props.rules.ratioTo3).toFixed(2).toString())
        } else {
            setValue2('')
            setValue3('')
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
                    <TextInput style={stylesBase.input} editable={false} showSoftInputOnFocus={false} value={currentValue}/>
                </View>
                <View style={lineStyles}/>
                <View style={stylesBase.formGroup}>
                    <Text style={labelStyles}>{props.rules.title2}</Text>
                    <TextInput style={stylesBase.input} showSoftInputOnFocus={false} editable={false} value={value2}/>
                </View>
                <View style={stylesBase.formGroup}>
                    <Text style={labelStyles}>{props.rules.title3}</Text>
                    <TextInput style={stylesBase.input} showSoftInputOnFocus={false} editable={false} value={value3}/>
                </View>
            </View>
            <Keyboard theme={props.theme} onButtonClick={keyboardButtonClickHandler}/>
        </View>
    )
}