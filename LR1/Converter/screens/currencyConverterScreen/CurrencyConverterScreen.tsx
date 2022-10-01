import React from 'react'
import {FormConverter} from '../../components/formConverter/FormConverter'
import {ScreenProps} from '../../types/ScreenProps'


export const CurrencyConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'BYN': {
            'BYN': (byn: number): number => byn,
            'USD': (byn: number): number => 0.4 * byn,
            'EUR': (byn: number): number => 0.41 * byn
        },

        'USD': {
            'USD': (usd: number): number => usd,
            'BYN': (usd: number): number => 2.52 * usd,
            'EUR': (usd: number): number => 1.04 * usd
        },

        'EUR': {
            'EUR': (eur: number): number => eur,
            'BYN': (eur: number): number => 2.42 * eur,
            'USD': (eur: number): number => 0.96 * eur
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
