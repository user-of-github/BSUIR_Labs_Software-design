import React from 'react'
import {Text, TouchableOpacity, Vibration, View} from 'react-native'
import {stylesBase, stylesDark, stylesLight} from './styles'
import {Theme} from '../../types/Theme'
import {Orientation} from '../../types/Orientation'


export enum KeyboardButtonItemType {
    DIGIT = 'DIGIT',
    ERASE = 'ERASE',
    DOT = 'DOT'
}

interface KeyboardButtonItem {
    text: string
    type: KeyboardButtonItemType
    onLongPress?: () => void
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
    {text: '.', type: KeyboardButtonItemType.DOT}
]

const CONVERTER_BUTTON_ERASE: KeyboardButtonItem = {text: '←', type: KeyboardButtonItemType.ERASE}


interface KeyboardProps {
    theme: Theme
    onButtonClick: (buttonClicked: KeyboardButtonItem) => void
    orientation: Orientation
    onLongPressForErase?: () => void
}

const arePropsEqual = (prev: KeyboardProps, next: KeyboardProps): boolean => prev.theme === next.theme && prev.orientation === next.orientation


export const Keyboard = React.memo((props: KeyboardProps): JSX.Element => {
    const buttonTextStyles = [stylesBase.buttonText, props.theme === Theme.LIGHT ? stylesLight.buttonText : stylesDark.buttonText]
    const buttonStyles = [stylesBase.button, props.theme === Theme.LIGHT ? stylesLight.button : stylesDark.button]
    const buttonContainerStyles = [
        stylesBase.buttonContainer,
        props.orientation === 'portrait' ? stylesBase.buttonContainerPortrait : stylesBase.buttonContainerLandscape
    ]

    const buttonsContainerStyles = [
        stylesBase.container,
        props.orientation === 'portrait' ? stylesBase.containerPortrait : stylesBase.containerLandscape
    ]

    const keyPressHandle = (button: KeyboardButtonItem): void => {
        Vibration.vibrate(30)
        props.onButtonClick(button)
    }

    const onLongKeyPressHandle = (): void => {
        Vibration.vibrate(60)
        props.onLongPressForErase && props.onLongPressForErase()
    }


    return (
        <View style={buttonsContainerStyles}>
            {
                CONVERTER_BUTTONS.map((button: KeyboardButtonItem): JSX.Element => (
                    <TouchableOpacity key={button.text}
                                      style={[buttonStyles, buttonContainerStyles]}
                                      onPress={() => keyPressHandle(button)}>
                        <Text style={buttonTextStyles}>{button.text}</Text>
                    </TouchableOpacity>
                ))
            }
            <TouchableOpacity key={CONVERTER_BUTTON_ERASE.text}
                              style={[buttonStyles, buttonContainerStyles]}
                              onPress={() => keyPressHandle(CONVERTER_BUTTON_ERASE)}
                              onLongPress={() => onLongKeyPressHandle()}>
                <Text style={buttonTextStyles}>{CONVERTER_BUTTON_ERASE.text}</Text>
            </TouchableOpacity>
        </View>
    )
}, arePropsEqual)

