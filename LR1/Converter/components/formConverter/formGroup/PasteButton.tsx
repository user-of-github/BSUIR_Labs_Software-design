import {stylesBase} from './styles'
import {Image, TouchableOpacity} from 'react-native'
import {Theme} from '../../../types/Theme'
import PasteForLight from '../../../assets/paste-dark.png'
import PasteForDark from '../../../assets/paste-light.png'
import React from 'react'

interface PasteButtonProps {
    clickHandler: () => void
    theme: Theme
    premium: boolean
}

const areEqual = (prev: PasteButtonProps, next: PasteButtonProps): boolean => prev.theme === next.theme && prev.premium === next.premium


export const PasteButton = (props: PasteButtonProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => props.clickHandler()} style={[stylesBase.paste, props.premium && stylesBase.enabled]}>
            <Image source={props.theme === Theme.LIGHT ? PasteForLight : PasteForDark}
                   style={stylesBase.copyIcon}
            />
        </TouchableOpacity>
    )
}