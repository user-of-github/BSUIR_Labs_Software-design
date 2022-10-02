import React from 'react'
import {Vibration, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {stylesBase} from './styles'

import {showMessage} from 'react-native-flash-message'
import {InputEditable} from './input/inputEditable/InputEditable'
import {FormGroupBaseProps} from './FormGroupBase'
import {Selector} from './Selector'
import {CopyButton} from './CopyButton'
import {PasteButton} from './PasteButton'


interface FormGroupEditableProps extends FormGroupBaseProps {
    pasteHandler: () => void
    onCursorPositionChange: (newPosition: number) => void
}

const areEqual = (prevProps: FormGroupEditableProps, nextProps: FormGroupEditableProps): boolean =>
    prevProps.value === nextProps.value &&
    prevProps.premium === nextProps.premium &&
    prevProps.theme === nextProps.theme &&
    prevProps.selectedUnit === nextProps.selectedUnit


export const FormGroupEditable = React.memo((props: FormGroupEditableProps): JSX.Element => {
    const copyButtonClickHandler = React.useCallback((): void => {
        Vibration.vibrate(40)
        if (!props.premium) {
            showMessage({message: 'Get PRO mode to unlock this feature', description: '', type: 'warning'})
            return
        }

        if (props.value !== '') {
            Clipboard.setStringAsync(props.value)
            console.log(props.value)
            showMessage({message: '', description: 'Value copied to clipboard', type: 'info'})
        }
    }, [props.value, props.premium])

    const pasteButtonClickHandler = (): void => {
        Vibration.vibrate(40)
        if (!props.premium) {
            showMessage({message: 'Get PRO mode to unlock this feature', description: '', type: 'warning'})
            return
        }
        props.pasteHandler()
    }


    return (
        <View style={stylesBase.formGroup}>
            <View style={stylesBase.inputRow}>
                <Selector titles={props.titles} onChange={props.onUnitChange} selected={props.selectedUnit}/>

                <InputEditable pasteHandler={props.pasteHandler} value={props.value}/>

                <CopyButton clickHandler={copyButtonClickHandler} theme={props.theme} premium={props.premium}/>

                <PasteButton clickHandler={pasteButtonClickHandler} theme={props.theme} premium={props.premium}/>
            </View>
        </View>
    )
}, areEqual)