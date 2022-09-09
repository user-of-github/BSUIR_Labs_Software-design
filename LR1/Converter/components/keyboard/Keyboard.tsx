import React from 'react'
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native'
import {stylesBase, stylesDark, stylesLight} from './styles'
import {Theme} from '../../types/Theme'


export enum KeyboardButtonItemType {
    DIGIT = 'DIGIT',
    ERASE = 'ERASE',
    DOT = 'DOT'
}

interface KeyboardButtonItem {
    text: string
    type: KeyboardButtonItemType
}

const CONVERTER_BUTTONS: Array<KeyboardButtonItem> = [
    {text: '7', type: KeyboardButtonItemType.DIGIT},
    {text: '8', type: KeyboardButtonItemType.DIGIT},
    {text: '9', type: KeyboardButtonItemType.DIGIT},
    {text: '4', type: KeyboardButtonItemType.DIGIT},
    {text: '5', type: KeyboardButtonItemType.DIGIT},
    {text: '6', type: KeyboardButtonItemType.DIGIT},
    {text: '1', type: KeyboardButtonItemType.DIGIT},
    {text: '2', type: KeyboardButtonItemType.DIGIT},
    {text: '3', type: KeyboardButtonItemType.DIGIT},
    {text: '0', type: KeyboardButtonItemType.DIGIT},
    {text: '.', type: KeyboardButtonItemType.DOT},
    {text: '←', type: KeyboardButtonItemType.ERASE},
]

interface KeyboardProps {
    styles?: StyleProp<ViewStyle>
    theme: Theme
    onButtonClick: (buttonClicked: KeyboardButtonItem) => void
    inLandscapeOrientation?: boolean
}

export const Keyboard = (props: KeyboardProps): JSX.Element => {
    const buttonTextStyles = [stylesBase.buttonText, props.theme === Theme.LIGHT ? stylesLight.buttonText : stylesDark.buttonText]
    const buttonStyles = [stylesBase.button, props.theme === Theme.LIGHT ? stylesLight.button : stylesDark.button]

    return (
        <View style={[stylesBase.container, props.styles, props.inLandscapeOrientation !== undefined && props.inLandscapeOrientation ? stylesBase.containerLandscape : undefined]}>
            {
                CONVERTER_BUTTONS.map((button: KeyboardButtonItem): JSX.Element => (
                    <View style={stylesBase.buttonContainer} key={button.text}>
                        <TouchableOpacity style={buttonStyles} onPress={() => props.onButtonClick(button)}>
                            <Text style={buttonTextStyles}>{button.text}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </View>
    )
}