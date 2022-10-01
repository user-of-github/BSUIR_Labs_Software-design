import {Image, TouchableOpacity, View} from 'react-native'
import {stylesBase} from './styles'
import Premium from '../../assets/crown.png'
import React from 'react'


interface PremiumTogglerProps {
    premium: boolean
    togglePremium: () => void
}

const areEqual = (prev: PremiumTogglerProps, next: PremiumTogglerProps): boolean => prev.premium === next.premium


export const PremiumToggler = React.memo((props: PremiumTogglerProps): JSX.Element => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={(): void => props.togglePremium()}>
            <View style={[stylesBase.premiumButton, props.premium && stylesBase.premiumEnabled]}>
                <Image source={Premium} style={stylesBase.premiumButtonImg}/>
            </View>
        </TouchableOpacity>
    )
}, areEqual)