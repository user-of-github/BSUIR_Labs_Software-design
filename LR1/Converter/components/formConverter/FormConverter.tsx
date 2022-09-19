import React from 'react'
import {TouchableOpacity, View, Image, Vibration} from 'react-native'

import {Keyboard, KeyboardButtonItemType} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase, stylesDark, stylesLight} from './styles'
import {FormGroup} from './formGroup/FormGroup'

import Swap from '../../assets/swap.png'
import {Orientation} from '../../types/Orientation'


export interface ConverterRules {
    title1: string
    title2: string

    ratioTo2: number
    ratioTo1: number
}

interface FormConverterProps {
    theme: Theme
    rules: ConverterRules
    premium: boolean
    orientation: Orientation
}

export const FormConverter = (props: FormConverterProps): JSX.Element => {
    const [title1, setTitle1] = React.useState<string>(props.rules.title1)
    const [title2, setTitle2] = React.useState<string>(props.rules.title2)
    const [ratioTo2, setRatioTo2] = React.useState<number>(props.rules.ratioTo2)

    const actualValue2 = React.useRef<string>(0)
    const actualValue = React.useRef<string>(0)


    const [currentValue, setCurrentValue] = React.useState<string>('')
    const [value2, setValue2] = React.useState<string>('')

    React.useEffect(() => updateValues(), [currentValue])

    const swapFields = React.useCallback((): void => {
        setTitle1(title => title === props.rules.title1 ? props.rules.title2 : props.rules.title1)
        setTitle2(title => title === props.rules.title1 ? props.rules.title2 : props.rules.title1)

        setCurrentValue(value => actualValue2.current)
        setValue2(value => actualValue.current)

        setRatioTo2(ratio => ratio === props.rules.ratioTo2 ? props.rules.ratioTo1 : props.rules.ratioTo2)
    }, [setTitle1, setTitle2])

    const getBeautifulValue = (rawValue: number): string => Number.parseFloat(rawValue.toFixed(4)).toString()


    const updateValues = (): void => {
        if (currentValue !== '' && currentValue !== '.') {
            const value2raw: number = Number.parseFloat(currentValue) * ratioTo2
            const beautifiedStr: string = getBeautifulValue(value2raw)
            setValue2(beautifiedStr)
            actualValue2.current = beautifiedStr
        } else {
            setValue2('')
            actualValue2.current = ''
        }
    }

    const keyboardButtonClickHandler = (item): void => {
        if (item.type === KeyboardButtonItemType.DIGIT)
            setCurrentValue(value => value + item.text)
        else if (item.type === KeyboardButtonItemType.DOT)
            setCurrentValue(value => !value.includes('.') ? value + item.text : value)
        else if (item.type === KeyboardButtonItemType.ERASE)
            setCurrentValue(value => value.length !== 0 ? value.slice(0, -1) : value)
    }

    const clearButtonLongClickHandler = (): void => {
        setCurrentValue(value => '')
        setValue2(value => '')
        actualValue2.current = actualValue.current = ''
    }

    const lineStyles = [stylesBase.line, props.theme === Theme.LIGHT ? stylesLight.line : stylesDark.line]


    return (
        <View style={[stylesBase.container, props.orientation === 'portrait' ? stylesBase.portrait : stylesBase.landscape]}>
            <View style={[stylesBase.form, props.orientation === 'portrait' ? stylesBase.formPortrait : stylesBase.formLandscape]}>
                <FormGroup value={currentValue} theme={props.theme} title={title1} premium={props.premium}/>
                <View style={lineStyles}/>
                <FormGroup value={value2} theme={props.theme} title={title2} premium={props.premium}/>

                {
                    props.premium
                    &&
                    <TouchableOpacity onPress={(): void => swapFields()} style={stylesBase.swapContainer}>
                        <Image source={Swap} style={stylesBase.swap}/>
                    </TouchableOpacity>
                }
            </View>
            <Keyboard theme={props.theme}
                      onButtonClick={keyboardButtonClickHandler}
                      orientation={props.orientation}
                      onLongPressForErase={clearButtonLongClickHandler}
            />
        </View>
    )
}