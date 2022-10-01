import React from 'react'
import {Vibration, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {stylesBase} from './styles'
import {Theme} from '../../../types/Theme'

import {showMessage} from 'react-native-flash-message'
import {InputBase} from './input/inputBase/InputBase'
import {Selector} from './Selector'
import {CopyButton} from './CopyButton'


export interface FormGroupBaseProps {
    titles: Array<string>
    value: string
    theme: Theme
    premium: boolean
    onUnitChange: (newUnit: string) => void
    selectedUnit: string
}

const areEqual = (prevProps: FormGroupBaseProps, nextProps: FormGroupBaseProps): boolean =>
    prevProps.value === nextProps.value &&
    prevProps.premium === nextProps.premium &&
    prevProps.theme === nextProps.theme &&
    prevProps.onUnitChange === nextProps.onUnitChange


export const FormGroupBase = (props: FormGroupBaseProps): JSX.Element => {

    const copyButtonClickHandler = (): void => {
        Vibration.vibrate(40)
        if (!props.premium) {
            showMessage({message: 'Get PRO mode to unlock this feature', description: '', type: 'warning'})
            return
        }

        if (props.value !== '') {
            Clipboard.setStringAsync(props.value)
            showMessage({message: '', description: 'Value copied to clipboard', type: 'info'})
        }
    }


    return (
        <View style={stylesBase.formGroup}>
            <View style={stylesBase.inputRow}>
                <Selector titles={props.titles} onChange={props.onUnitChange} selected={props.selectedUnit}/>

                <InputBase value={props.value}/>

                <CopyButton clickHandler={copyButtonClickHandler} theme={props.theme} premium={props.premium}/>
            </View>
        </View>
    )
}