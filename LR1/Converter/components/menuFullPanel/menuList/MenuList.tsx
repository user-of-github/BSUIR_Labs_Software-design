import {FlatList, ListRenderItem} from 'react-native'
import {MenuItem} from './menuItem/MenuItem'
import React from 'react'
import {stylesBase} from '../styles'
import DistanceDark from '../../../assets/distance-dark.png'
import DistanceLight from '../../../assets/distance-light.png'
import CurrencyDark from '../../../assets/exchange-dark.png'
import CurrencyLight from '../../../assets/exchange-light.png'
import WeightDark from '../../../assets/weight-dark.png'
import WeightLight from '../../../assets/weight-light.png'
import VolumeDark from '../../../assets/volume-dark.png'
import VolumeLight from '../../../assets/volume-light.png'
import {Theme} from '../../../types/Theme'
import {Orientation} from '../../../types/Orientation'


const MENU_DATA: Array<MenuItem> = [
    {imageForLight: DistanceDark, imageForDark: DistanceLight, title: 'Distance', screenName: 'DistanceConverter'},
    {imageForLight: CurrencyDark, imageForDark: CurrencyLight, title: 'Currency', screenName: 'CurrencyConverter'},
    {imageForLight: WeightDark, imageForDark: WeightLight, title: 'Weight', screenName: 'WeightConverter'},
    {imageForLight: VolumeDark, imageForDark: VolumeLight, title: 'Volume', screenName: 'VolumeConverter'}
]



interface MenuListProps {
    theme: Theme
    orientation: Orientation
}

const arePropsEqual = (previous: MenuListProps, next: MenuListProps): boolean => previous.theme === next.theme && previous.orientation === next.orientation


export const MenuList = React.memo((props: MenuListProps): JSX.Element => {
    const renderItem: ListRenderItem<MenuItem> = ({ item }) => (
        <MenuItem theme={props.theme}
                  menuItem={item}
                  key={`${item.title}${item.screenName}`}
                  orientation={props.orientation}
        />
    )

    return (
        <FlatList
            style={stylesBase.itemsContainer}
            data={MENU_DATA}
            renderItem={renderItem}
            keyExtractor={menuItem => menuItem.title}
        />
    )
}, arePropsEqual)