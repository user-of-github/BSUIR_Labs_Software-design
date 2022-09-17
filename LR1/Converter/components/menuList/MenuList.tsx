import React from 'react'
import {View} from 'react-native'

import {stylesBase} from './styles'
import {Theme} from '../../types/Theme'
import {MenuItem} from './menuItem/MenuItem'
import {Orientation} from '../../types/Orientation'

import DistanceLight from '../../assets/distance-light.png'
import DistanceDark from '../../assets/distance-dark.png'
import CurrencyLight from '../../assets/exchange-light.png'
import CurrencyDark from '../../assets/exchange-dark.png'
import WeightLight from '../../assets/weight-light.png'
import WeightDark from '../../assets/weight-dark.png'
import VolumeLight from '../../assets/volume-light.png'
import VolumeDark from '../../assets/volume-dark.png'


const MENU_DATA: Array<MenuItem> = [
    {imageForLight: DistanceLight, imageForDark: DistanceDark, title: 'Distance', screenName: 'DistanceConverter'},
    {imageForLight: CurrencyLight, imageForDark: CurrencyDark, title: 'Currency', screenName: 'CurrencyConverter'},
    {imageForLight: WeightLight, imageForDark: WeightDark, title: 'Weight', screenName: 'WeightConverter'},
    {imageForLight: VolumeLight, imageForDark: VolumeDark, title: 'Volume', screenName: 'VolumeConverter'}
]

interface MenuListProps {
    theme: Theme
    orientation: Orientation
}


export const MenuList = (props: MenuListProps): JSX.Element => {
    const containerStyles = [
        stylesBase.menuContainer,
        props.orientation === 'portrait' ? stylesBase.menuContainerPortrait : stylesBase.menuContainerLandscape
    ]

    return (
        <View style={containerStyles}>
            <View style={stylesBase.itemsContainer}>
                {
                    MENU_DATA.map((menuItem: MenuItem): JSX.Element => (
                        <MenuItem theme={props.theme}
                                  menuItem={menuItem}
                                  key={`${menuItem.title}${menuItem.screenName}`}
                                  orientation={props.orientation}
                        />
                    ))
                }
            </View>
        </View>
    )
}
