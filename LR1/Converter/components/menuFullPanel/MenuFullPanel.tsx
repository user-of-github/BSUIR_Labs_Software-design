import React from 'react'
import {View} from 'react-native'

import {stylesBase} from './styles'
import {Theme} from '../../types/Theme'
import {Orientation} from '../../types/Orientation'

import {PremiumToggler} from '../premiumToggler/PremiumToggler'
import {MenuList} from './menuList/MenuList'


interface MenuListProps {
    theme: Theme
    orientation: Orientation
    premium: boolean
    togglePremium: () => void
}


export const MenuFullPanel = (props: MenuListProps): JSX.Element => {
    const containerStyles = [stylesBase.menuContainer,
        props.theme === Theme.LIGHT ? stylesBase.menuContainerLight : stylesBase.menuContainerDark]


    return (
        <View style={containerStyles}>
            <MenuList orientation={props.orientation} theme={props.theme}/>

            <PremiumToggler premium={props.premium}
                            togglePremium={props.togglePremium}
                            orientation={props.orientation}
            />
        </View>
    )
}
