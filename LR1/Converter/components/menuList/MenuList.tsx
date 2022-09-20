import React from 'react'
import {FlatList, ListRenderItem, View} from 'react-native'

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
import {PremiumToggler} from '../premiumToggler/PremiumToggler'


const MENU_DATA: Array<MenuItem> = [
    {imageForLight: DistanceDark, imageForDark: DistanceLight, title: 'Distance', screenName: 'DistanceConverter'},
    {imageForLight: CurrencyDark, imageForDark: CurrencyLight, title: 'Currency', screenName: 'CurrencyConverter'},
    {imageForLight: WeightDark, imageForDark: WeightLight, title: 'Weight', screenName: 'WeightConverter'},
    {imageForLight: VolumeDark, imageForDark: VolumeLight, title: 'Volume', screenName: 'VolumeConverter'}
]

interface MenuListProps {
    theme: Theme
    orientation: Orientation
    premium: boolean
    togglePremium: () => void
}


export const MenuList = (props: MenuListProps): JSX.Element => {
    const containerStyles = [stylesBase.menuContainer, props.theme === Theme.LIGHT ? stylesBase.menuContainerLight  : stylesBase.menuContainerDark]

    const renderItem: ListRenderItem<MenuItem> = ({ item }) => (
        <MenuItem theme={props.theme}
                  menuItem={item}
                  key={`${item.title}${item.screenName}`}
                  orientation={props.orientation}
        />
    );

    return (
        <View style={containerStyles}>
                <FlatList
                    style={stylesBase.itemsContainer}
                    data={MENU_DATA}
                    renderItem={renderItem}
                    keyExtractor={menuItem => menuItem.title}
                />

            <PremiumToggler premium={props.premium}
                            togglePremium={props.togglePremium}
                            orientation={props.orientation}
            />
        </View>
    )
}
