import React from 'react'
import {View} from 'react-native'

import {Theme} from '../../types/Theme'
import {stylesBase} from './styles'

import {MenuFullPanel} from '../../components/menuFullPanel/MenuFullPanel'
import {Orientation} from '../../types/Orientation'


interface HomeScreenProps {
    theme: Theme
    orientation: Orientation
    premium: boolean
    togglePremium: () => void
}


export const HomeScreen = (props: HomeScreenProps): JSX.Element => (
    <View style={stylesBase.wrapper}>
        <MenuFullPanel theme={props.theme} orientation={props.orientation} premium={props.premium} togglePremium={props.togglePremium}/>
    </View>
)
