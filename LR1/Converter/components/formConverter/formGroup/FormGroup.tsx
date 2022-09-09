import React from 'react'
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import {stylesBase, stylesDark, stylesLight} from './styles'
import {Theme} from '../../../types/Theme'

import CopyForLight from '../../../assets/copy-dark.png'
import CopyForDark from '../../../assets/copy-light.png'


interface FormGroupProps {
    title: string
    value: string
    theme: Theme
}

export const FormGroup = (props: FormGroupProps): JSX.Element => {
    const createAlert = (): void => Alert.alert('', 'Value copied to clipboard',)
    const labelStyles = [stylesBase.label, props.theme === Theme.LIGHT ? stylesLight.label : stylesDark.label]

    return (
        <View style={stylesBase.formGroup}>
            <Text style={labelStyles}>{props.title}</Text>
            <View style={stylesBase.inputRow}>
                <TextInput style={stylesBase.input} editable={false} showSoftInputOnFocus={false} value={props.value}/>
                <TouchableOpacity onPress={() => props.value !== '' && Clipboard.setStringAsync(props.value) && createAlert()}>
                    <Image source={props.theme === Theme.LIGHT ? CopyForLight : CopyForDark} style={stylesBase.copyIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}