import {FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'
import BigNumber from 'bignumber.js'
import {Animated} from 'react-native'


export const WeightConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'stone': {
            'stone': (stone: string): BigNumber => new BigNumber(stone),
            'gram': (stone: string): BigNumber =>  new BigNumber(stone).multipliedBy(new BigNumber(6350.29)),
            'pound': (stone: string): BigNumber =>  new BigNumber(stone).multipliedBy(new BigNumber(14))
        },

        'gram': {
            'gram': (gram: string): BigNumber => new BigNumber(gram),
            'pound': (gram: string): BigNumber =>  new BigNumber(gram).multipliedBy(new BigNumber(0.00220462)),
            'stone': (gram: string): BigNumber =>  new BigNumber(gram).multipliedBy(new BigNumber(0.000157472857142857152))
        },

        'pound': {
            'pound': (pound: string): BigNumber => new BigNumber(pound),
            'stone': (pound: string): BigNumber =>  new BigNumber(pound).multipliedBy(new BigNumber(0.071428486482100012056)),
            'gram': (pound: string): BigNumber =>  new BigNumber(pound).multipliedBy(new BigNumber(453.59183056500188513))
        }
    }

    return (
        <FormConverter theme={props.theme}
                       rules={converterRules}
                       premium={props.premium}
                       orientation={props.orientation}
        />
    )
}