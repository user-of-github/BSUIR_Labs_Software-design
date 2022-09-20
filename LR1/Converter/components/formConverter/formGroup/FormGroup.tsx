import React from 'react'
import {Alert, Image, Pressable, Text, TextInput, TouchableOpacity, Vibration, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {stylesBase, stylesDark, stylesLight} from './styles'
import {Theme} from '../../../types/Theme'

import CopyForLight from '../../../assets/copy-dark.png'
import CopyForDark from '../../../assets/copy-light.png'


interface FormGroupProps {
    title: string
    value: string
    theme: Theme
    premium: boolean
    isBaseInput: boolean
    pasteHandler?: () => void
}

const areEqual = (prevProps: FormGroupProps, nextProps: FormGroupProps): boolean =>
    prevProps.value === nextProps.value && prevProps.title === nextProps.title &&
    prevProps.premium === nextProps.premium && prevProps.theme === nextProps.theme &&
    prevProps.isBaseInput === nextProps.isBaseInput


export const FormGroup = React.memo((props: FormGroupProps): JSX.Element => {
    const createAlert = (): void => Alert.alert('', 'Value copied to clipboard')
    const labelStyles = [stylesBase.label, props.theme === Theme.LIGHT ? stylesLight.label : stylesDark.label]

    const copyButtonClickHandler = (): void => {
        Vibration.vibrate(40)

        props.value !== '' && Clipboard.setStringAsync(props.value) && createAlert()
    }

    const longPressHandler = (): void => {
        Vibration.vibrate(70)

        props.pasteHandler && props.pasteHandler()
    }


    return (
        <View style={stylesBase.formGroup}>
            <Text style={labelStyles}>{props.title}</Text>
            <View style={stylesBase.inputRow}>
                {
                    !props.isBaseInput
                    ?
                        <TextInput style={[stylesBase.inputBase, stylesBase.inputNotInPressable]}
                                   caretHidden={true}
                                   editable={false}
                                   contextMenuHidden={true}
                                   showSoftInputOnFocus={false}
                                   value={props.value}
                        />
                        :
                        <Pressable style={stylesBase.pressable} onLongPress={() => longPressHandler()}>
                            <TextInput style={[stylesBase.inputBase, stylesBase.inputInPressable]}
                                       caretHidden={true}
                                       editable={false}
                                       contextMenuHidden={true}
                                       showSoftInputOnFocus={false}
                                       value={props.value}
                            />
                        </Pressable>
                }
                {
                    props.premium
                    &&
                    <TouchableOpacity
                        onPress={() => copyButtonClickHandler()}>
                        <Image source={props.theme === Theme.LIGHT ? CopyForLight : CopyForDark}
                               style={stylesBase.copyIcon}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}, areEqual)