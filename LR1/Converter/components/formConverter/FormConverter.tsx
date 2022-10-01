import React from 'react'
import {View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {Keyboard, KeyboardButtonItemType} from '../keyboard/Keyboard'
import {Theme} from '../../types/Theme'
import {stylesBase, stylesDark, stylesLight} from './styles'

import {showMessage} from 'react-native-flash-message'
import {Orientation} from '../../types/Orientation'

import BigNumber from 'bignumber.js'
import {SwitchValues} from './switchValuesButton/SwitchValues'
import {FormGroupBase} from './formGroup/FormGroupBase'
import {FormGroupEditable} from './formGroup/FormGroupEditable'


interface FormConverterProps {
    theme: Theme
    rules: any
    premium: boolean
    orientation: Orientation
}

const checkValue = (newValue: string): boolean => {
    const MAX_ACCEPTED_LENGTH: number = 13
    const newLength: number = newValue.length
    const dotsCount: number = newValue.split('.').length - 1

    if (dotsCount > 1) {
        showMessage({message: 'You already have a dot in your number', description: '', type: 'danger'})
        return false
    }

    if (newLength > MAX_ACCEPTED_LENGTH) {
        showMessage({message: 'The maximum allowable input length has been reached', description: '', type: 'danger'})
        return false
    }

    if (newLength === MAX_ACCEPTED_LENGTH && newValue[newLength - 1] === '.') {
        showMessage({message: 'The maximum allowable input length has been reached', description: '', type: 'danger'})
        return false
    }

    return true
}


export const FormConverter = (props: FormConverterProps): JSX.Element => {
    const [firstValue, setFirstValue] = React.useState<string>('')
    const [secondValue, setSecondValue] = React.useState<string>('')

    const [firstSelectedUnit, setFirstSelectedUnit] = React.useState<string>(Object.keys(props.rules)[0])
    const [secondSelectedUnit, setSecondSelectedUnit] = React.useState<string>(Object.keys(props.rules)[0])

    React.useEffect(() => {
        setSecondValue(value => {
            if (firstValue === '' || firstValue === '.') return ''
            const funcResult: number = props.rules[firstSelectedUnit][secondSelectedUnit](firstValue)

            if (Number.isInteger(funcResult)) return funcResult.toString()

            let raw = new BigNumber(props.rules[firstSelectedUnit][secondSelectedUnit](firstValue)).toFixed(16)
            while (raw.length > 0 && raw[raw.length - 1] === '0') raw = raw.slice(0, raw.length - 1)

            if (raw.length > 0 && raw[raw.length - 1] === '.') raw = raw.slice(0, raw.length - 1)
            return raw
        })

    }, [firstValue, firstSelectedUnit, secondSelectedUnit])

    const keyboardButtonClickHandler = (item): void => {
        if (item.type === KeyboardButtonItemType.DIGIT)
            setFirstValue((value: string): string => checkValue(value + item.text) ? value + item.text : value)
        else if (item.type === KeyboardButtonItemType.DOT)
            setFirstValue((value: string): string => checkValue(value + item.text) ? value + item.text : value)
        else if (item.type === KeyboardButtonItemType.ERASE)
            setFirstValue(value => value.length !== 0 ? value.slice(0, -1) : value)
    }

    const clearButtonLongClickHandler = (): void => {
        setFirstValue('')
        setSecondValue('')
    }

    const lineStyles = [stylesBase.line, props.theme === Theme.LIGHT ? stylesLight.line : stylesDark.line]


    const pasteHandler = async () => {
        const value: string = await Clipboard.getStringAsync()

        if (!Number.isNaN(Number.parseFloat(value))) setFirstValue(current => checkValue(value) ? value : current)
        else showMessage({message: '', description: 'Invalid value from clipboard', type: 'danger'})
    }

    const onFirstUnitNameChange = React.useCallback((newUnit: string): void => setFirstSelectedUnit(unit => newUnit),
        [])
    const onSecondUnitNameChange = React.useCallback((newUnit: string): void => setSecondSelectedUnit(unit => newUnit),
        [])


    const onSwitchValuesBtnClick = React.useCallback((): void => {
        if (!props.premium) {
            showMessage({message: 'Get PRO mode to unlock this feature', description: '', type: 'warning'})
            return
        }

        const firstSelectedUnitTemp: string = firstSelectedUnit
        setFirstValue(value => secondValue)
        setFirstSelectedUnit(value => {
            const temp: string = secondSelectedUnit
            setSecondSelectedUnit(value2 => firstSelectedUnitTemp)
            return temp
        })

    }, [firstSelectedUnit, secondSelectedUnit, firstValue, secondValue])

    const containerStyles = [
        stylesBase.container,
        props.orientation === 'portrait' ? stylesBase.portrait : stylesBase.landscape
    ]
    const formStyles = [
        stylesBase.form,
        props.orientation === 'portrait' ? stylesBase.formPortrait : stylesBase.formLandscape
    ]

    const units = React.useRef<Array<string>>(Object.keys(props.rules))

    return (
        <View style={containerStyles}>
            <View style={formStyles}>
                <FormGroupEditable value={firstValue}
                                   theme={props.theme}
                                   titles={units.current}
                                   premium={props.premium}
                                   pasteHandler={pasteHandler}
                                   onUnitChange={onFirstUnitNameChange}
                                   selectedUnit={firstSelectedUnit}
                />
                <View style={lineStyles}/>
                <FormGroupBase value={secondValue}
                               theme={props.theme}
                               titles={units.current}
                               premium={props.premium}
                               onUnitChange={onSecondUnitNameChange}
                               selectedUnit={secondSelectedUnit}
                />

                <SwitchValues onClick={onSwitchValuesBtnClick} premium={props.premium}/>
            </View>

            <Keyboard theme={props.theme}
                      onButtonClick={keyboardButtonClickHandler}
                      orientation={props.orientation}
                      onLongPressForErase={clearButtonLongClickHandler}
            />
        </View>
    )
}