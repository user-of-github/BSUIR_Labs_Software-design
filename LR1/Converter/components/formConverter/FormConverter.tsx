import React from 'react'
import {TouchableOpacity, View, Image} from 'react-native'

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


    const [currentValue, setCurrentValue] = React.useState<string>('')
    const [value2, setValue2] = React.useState<string>('')

    React.useEffect(() => updateValues(), [currentValue])

    const swapFields = (): void => {
        const tempTitle: string = title1
        setTitle1(title2)
        setTitle2(tempTitle)

        setCurrentValue(value2)

        ratioTo2 === props.rules.ratioTo2 ? setRatioTo2(props.rules.ratioTo1) : setRatioTo2(props.rules.ratioTo2)
    }

    const getBeautifulValue = (rawValue: number): string => Number.parseFloat(rawValue.toFixed(4)).toString()


    const updateValues = (): void => {
        if (currentValue !== '' && currentValue !== '.') {
            const value2raw: number = Number.parseFloat(currentValue) * ratioTo2
            setValue2(getBeautifulValue(value2raw))
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
            />
        </View>
    )
}