import React from 'react'
import {Alert, Image, Text, TextInput, TouchableOpacity, Vibration, View} from 'react-native'
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
}

const areEqual = (prevProps: FormGroupProps, nextProps: FormGroupProps): boolean =>
    prevProps.value === nextProps.value && prevProps.title === nextProps.title &&
    prevProps.premium === nextProps.premium && prevProps.theme === nextProps.theme


export const FormGroup = React.memo((props: FormGroupProps): JSX.Element => {
    const createAlert = (): void => Alert.alert('', 'Value copied to clipboard')
    const labelStyles = [stylesBase.label, props.theme === Theme.LIGHT ? stylesLight.label : stylesDark.label]

    const copyButtonClickHandler = (): void => {
        Vibration.vibrate(40)

        props.value !== '' && Clipboard.setStringAsync(props.value) && createAlert()
    }


    return (
        <View style={stylesBase.formGroup}>
            <Text style={labelStyles}>{props.title}</Text>
            <View style={stylesBase.inputRow}>
                <TextInput style={stylesBase.input} editable={false} showSoftInputOnFocus={false} value={props.value}/>
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