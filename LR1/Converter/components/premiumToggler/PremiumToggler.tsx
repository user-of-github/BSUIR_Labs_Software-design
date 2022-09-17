import {Image, Text, TouchableOpacity, View} from 'react-native'
import {stylesBase} from './styles'
import Premium from '../../assets/crown.png'
import React from 'react'
import {Orientation} from '../../types/Orientation'


interface PremiumTogglerProps {
    premium: boolean
    togglePremium: () => void
    orientation: Orientation
}


export const PremiumToggler = (props: PremiumTogglerProps): JSX.Element => {
    const style = [
        stylesBase.premiumButton,
        props.orientation === 'portrait' ? stylesBase.premiumButtonPortrait : stylesBase.premiumButtonLandscape
    ]

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={(): void => props.togglePremium()}>
            <View style={style}>
                <Image source={Premium} style={stylesBase.premiumButtonImg}/>
                <Text style={stylesBase.premiumButtonTitle}>
                    {props.premium ? 'Disable' : 'Enable'} PRO mode
                </Text>
            </View>
        </TouchableOpacity>
    )
}