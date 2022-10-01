import {stylesBase} from './styles'
import {Image, TouchableOpacity} from 'react-native'
import {Theme} from '../../../types/Theme'
import CopyForLight from '../../../assets/copy-dark.png'
import CopyForDark from '../../../assets/copy-light.png'
import React from 'react'

interface CopyButtonProps {
    clickHandler: () => void
    premium: boolean
    theme: Theme
}

const areEqual = (prev: CopyButtonProps, next: CopyButtonProps): boolean => prev.theme === next.theme


export const CopyButton = (props: CopyButtonProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => props.clickHandler()} style={[stylesBase.copy, props.premium && stylesBase.enabled]}>
            <Image source={props.theme === Theme.LIGHT ? CopyForLight : CopyForDark}
                   style={stylesBase.copyIcon}
            />
        </TouchableOpacity>
    )
}