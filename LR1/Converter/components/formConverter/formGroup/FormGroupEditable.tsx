import React from 'react'
import {Vibration, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {stylesBase} from './styles'

import {showMessage} from 'react-native-flash-message'
import {InputEditable} from './input/inputEditable/InputEditable'
import {FormGroupBaseProps} from './FormGroupBase'
import {Selector} from './Selector'
import {CopyButton} from './CopyButton'


interface FormGroupEditableProps extends FormGroupBaseProps {
    pasteHandler: () => void
}

const areEqual = (prevProps: FormGroupEditableProps, nextProps: FormGroupEditableProps): boolean =>
    prevProps.value === nextProps.value &&
    prevProps.premium === nextProps.premium &&
    prevProps.theme === nextProps.theme &&
    prevProps.selectedUnit === nextProps.selectedUnit


export const FormGroupEditable = React.memo((props: FormGroupEditableProps): JSX.Element => {
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

                <InputEditable pasteHandler={props.pasteHandler} value={props.value}/>

                <CopyButton clickHandler={copyButtonClickHandler} theme={props.theme} premium={props.premium}/>
            </View>
        </View>
    )
}, areEqual)