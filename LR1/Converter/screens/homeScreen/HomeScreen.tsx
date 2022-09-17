import React from 'react'
import {View} from 'react-native'

import {Theme} from '../../types/Theme'
import {stylesBase} from './styles'

import {PremiumToggler} from '../../components/premiumToggler/PremiumToggler'
import {MenuList} from '../../components/menuList/MenuList'
import {Orientation} from '../../types/Orientation'


interface HomeScreenProps {
    theme: Theme
    orientation: Orientation
    premium: boolean
    togglePremium: () => void
}


export const HomeScreen = (props: HomeScreenProps): JSX.Element => (
    <View style={stylesBase.wrapper}>
        <MenuList theme={props.theme} orientation={props.orientation}/>
        <PremiumToggler premium={props.premium}
                        togglePremium={props.togglePremium}
                        orientation={props.orientation}
        />
    </View>
)
