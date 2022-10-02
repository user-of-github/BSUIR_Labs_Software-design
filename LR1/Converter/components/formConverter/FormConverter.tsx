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
import {ENABLE_PRO_SUGGESTION} from '../../utils/textConstants'


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

interface PasteValueResponse {
    response: boolean
    message: string
}

const checkPasteValue = (value: string): PasteValueResponse => {
    const MAX_ACCEPTED_LENGTH: number = 13
    const length: number = value.length
    const dotsCount: number = value.split('.').length - 1

    if (!/^[0-9.]+$/.test(value)) return {response: false, message: 'Seems like it is not usual number format'}

    if (dotsCount > 1) return {response: false, message: 'Too many dots'}

    if (length > MAX_ACCEPTED_LENGTH)  return {response: false, message: 'Too long value to paste'}

    if (length === MAX_ACCEPTED_LENGTH && value.at(-1) === '.') return {response: false, message: 'Too long value to paste'}

    return {response: true, message: 'Pasted'}
}


export const FormConverter = (props: FormConverterProps): JSX.Element => {
    const [firstValue, setFirstValue] = React.useState<string>('')
    const [secondValue, setSecondValue] = React.useState<string>('')

    const [firstSelectedUnit, setFirstSelectedUnit] = React.useState<string>(Object.keys(props.rules)[0])
    const [secondSelectedUnit, setSecondSelectedUnit] = React.useState<string>(Object.keys(props.rules)[0])

    const [cursorPosition, setCursorPosition] = React.useState<number>(0)
    const cursorPositionBackup = React.useRef<number>(0)

    React.useEffect(() => {
        setSecondValue(value => {
            if (firstValue === '' || firstValue === '.') return ''
            const funcResult: BigNumber = props.rules[firstSelectedUnit][secondSelectedUnit](firstValue)

            let raw: string = funcResult.toFixed(16)
            while (raw.length > 0 && raw[raw.length - 1] === '0') raw = raw.slice(0, raw.length - 1)

            if (raw.length > 0 && raw[raw.length - 1] === '.') raw = raw.slice(0, raw.length - 1)

            return raw
        })

    }, [firstValue, firstSelectedUnit, secondSelectedUnit, cursorPosition])


    const keyboardButtonClickHandler = (item): void => {
        const cursor: number = cursorPositionBackup.current

        if (item.type === KeyboardButtonItemType.DIGIT || item.type === KeyboardButtonItemType.DOT)
            setFirstValue((value: string): string => {
                const newValue: string = value.slice(0, cursor) + item.text + value.slice(cursor)
                const checkResult: boolean = checkValue(newValue)
                if (checkResult) {
                    setCursorPosition(cursorPositionBackup.current + 1)
                    cursorPositionBackup.current += 1
                    return newValue
                } else {
                    return value
                }
            })
        else if (item.type === KeyboardButtonItemType.ERASE)
            setFirstValue((value: string): string => {
                if (value.length === 0) return value
                const leftString: string = value.slice(0, cursor)
                const rightString: string = value.slice(cursor)

                if (leftString.length !== 0) {
                    setCursorPosition(cursorPositionBackup.current - 1)
                    cursorPositionBackup.current -= 1
                    return leftString.slice(0, -1) + rightString
                } else {
                    return rightString
                }
            })
    }

    const clearButtonLongClickHandler = (): void => {
        setFirstValue('')
        setSecondValue('')
    }

    const lineStyles = [stylesBase.line, props.theme === Theme.LIGHT ? stylesLight.line : stylesDark.line]


    const pasteHandler = async () => {
        const value: string = await Clipboard.getStringAsync()

        const checkResult: PasteValueResponse = checkPasteValue(value)

        if (checkResult.response)
            setFirstValue(current => value)
        else
            showMessage({message: 'Invalid pasted value', description: checkResult.message, type: 'danger'})
    }

    const onFirstUnitNameChange = React.useCallback((newUnit: string): void => setFirstSelectedUnit(unit => newUnit),
        [])
    const onSecondUnitNameChange = React.useCallback((newUnit: string): void => setSecondSelectedUnit(unit => newUnit),
        [])


    const onSwitchValuesBtnClick = React.useCallback((): void => {
        if (!props.premium) {
            showMessage({message: ENABLE_PRO_SUGGESTION, description: '', type: 'warning'})
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

    const units: React.MutableRefObject<Array<string>> = React.useRef<Array<string>>(Object.keys(props.rules))

    const cursorPositionChangeHandler = (newPosition: number): void => {
        setCursorPosition(newPosition)
        cursorPositionBackup.current = newPosition
    }


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
                                   onCursorPositionChange={cursorPositionChangeHandler}
                                   cursorPosition={cursorPosition}
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