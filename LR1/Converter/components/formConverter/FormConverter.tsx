import React from 'react'
import {ScaledSize, View} from 'react-native'
import {Dimensions} from 'react-native'


import {Keyboard, KeyboardButtonItemType} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase, stylesDark, stylesLight} from './styles'
import {FormGroup} from './formGroup/FormGroup'


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

    const [orientationLandscape, setOrientationLandscape] = React.useState<boolean>(false)

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

    const lineStyles = [stylesBase.line, props.theme === Theme.LIGHT ? stylesLight.line : stylesDark.line]

    React.useEffect(() => {
        const dimensions: ScaledSize = Dimensions.get('screen')
        setOrientationLandscape(dimensions.height < dimensions.width)
    }, [])


    return (
        <View style={[stylesBase.container, orientationLandscape ? stylesBase.landscape : stylesBase.portrait]}>
            <View style={[stylesBase.form, orientationLandscape ? stylesBase.formLandscape : stylesBase.formPortrait]}>
                <FormGroup value={currentValue} theme={props.theme} title={props.rules.title1}/>
                <View style={lineStyles}/>
                <FormGroup value={value2} theme={props.theme} title={props.rules.title2}/>
            </View>
            <Keyboard theme={props.theme}
                      onButtonClick={keyboardButtonClickHandler}
                      inLandscapeOrientation={orientationLandscape}
            />
        </View>
    )
}