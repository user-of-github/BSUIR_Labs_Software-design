import React from 'react'
import {View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {Keyboard, KeyboardButtonItemType} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase, stylesDark, stylesLight} from './styles'
import {FormGroup} from './formGroup/FormGroup'

import Swap from '../../assets/swap.png'
import {Orientation} from '../../types/Orientation'
import {createAlert} from '../../utils/createAlert'

import BigNumber from 'bignumber.js'

interface FormConverterProps {
    theme: Theme
    rules: any
    premium: boolean
    orientation: Orientation
}


export const FormConverter = (props: FormConverterProps): JSX.Element => {
    const [firstValue, setFirstValue] = React.useState<string>('')
    const [secondValue, setSecondValue] = React.useState<string>('')

    const [firstSelectedUnit, setFirstSelectedUnit] = React.useState<string>(Object.keys(props.rules)[0])
    const [secondSelectedUnit, setSecondSelectedUnit] = React.useState<string>(Object.keys(props.rules)[0])

    React.useEffect(() => {
        setSecondValue(value => {
            if (firstValue === '' || firstValue === '.') return ''
            return new BigNumber(props.rules[firstSelectedUnit][secondSelectedUnit](firstValue)).toFixed()
        })
    }, [firstValue, firstSelectedUnit, secondSelectedUnit])

    const checkValue = (newValue: string): boolean => {
        const MAX_ACCEPTED_LENGTH: number = 6
        const newLength: number = newValue.length
        const dotsCount: number = newValue.split('.').length - 1

        if (newLength > MAX_ACCEPTED_LENGTH || dotsCount > 1) return false

        if (newLength === MAX_ACCEPTED_LENGTH && newValue[newLength - 1] === '.') return false

        return true
    }

    const keyboardButtonClickHandler = (item): void => {
        if (item.type === KeyboardButtonItemType.DIGIT)
            setFirstValue((value: string): string => checkValue(value + item.text) ? value + item.text : value)
        else if (item.type === KeyboardButtonItemType.DOT)
            setFirstValue((value: string): string => checkValue(value + item.text) ? value + item.text : value)
        else if (item.type === KeyboardButtonItemType.ERASE) {
            setFirstValue(value => value.length !== 0 ? value.slice(0, -1) : value)
        }
    }

    const clearButtonLongClickHandler = (): void => {
        setFirstValue('')
        setSecondValue('')
    }

    const lineStyles = [stylesBase.line, props.theme === Theme.LIGHT ? stylesLight.line : stylesDark.line]


    const pasteHandler = async () => {
        const value: string = await Clipboard.getStringAsync()

        if (!Number.isNaN(Number.parseFloat(value)) && checkValue(value))
            setFirstValue(current => value)
        else
            createAlert('Invalid value :(')
    }

    const onFirstUnitNameChange = React.useCallback((newUnit: string): void => setFirstSelectedUnit(unit => newUnit), [])
    const onSecondUnitNameChange = React.useCallback((newUnit: string): void => setSecondSelectedUnit(unit => newUnit), [])

    return (
        <View style={[stylesBase.container,
            props.orientation === 'portrait' ? stylesBase.portrait : stylesBase.landscape]}>
            <View style={[stylesBase.form,
                props.orientation === 'portrait' ? stylesBase.formPortrait : stylesBase.formLandscape]}>
                <FormGroup value={firstValue}
                           theme={props.theme}
                           titles={Object.keys(props.rules)}
                           premium={props.premium}
                           isBaseInput={true}
                           pasteHandler={pasteHandler}
                           onUnitChange={onFirstUnitNameChange}
                />
                <View style={lineStyles}/>
                <FormGroup value={secondValue}
                           theme={props.theme}
                           titles={Object.keys(props.rules)}
                           premium={props.premium}
                           isBaseInput={false}
                           onUnitChange={onSecondUnitNameChange}
                />
            </View>
            <Keyboard theme={props.theme}
                      onButtonClick={keyboardButtonClickHandler}
                      orientation={props.orientation}
                      onLongPressForErase={clearButtonLongClickHandler}
            />
        </View>
    )
}