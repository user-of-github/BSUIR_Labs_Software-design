import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'


export const WeightConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'stone': {
            'stone': (stone: number): number => stone,
            'gram': (stone: number): number => 6350.29 * stone,
            'pound': (stone: number): number => 14 * stone
        },

        'gram': {
            'gram': (gram: number): number => gram,
            'pound': (gram: number): number => 0.00220462 * gram,
            'stone': (gram: number): number => 0.000157472857142857152 * gram
        },

        'pound': {
            'pound': (pound: number): number => pound,
            'stone': (pound: number): number => 0.071428486482100012056 * pound,
            'gram': (pound: number): number => 453.59183056500188513 * pound
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