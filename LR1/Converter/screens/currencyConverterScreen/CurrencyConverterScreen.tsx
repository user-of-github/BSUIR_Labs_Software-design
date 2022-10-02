import React from 'react'
import {FormConverter} from '../../components/formConverter/FormConverter'
import {ScreenProps} from '../../types/ScreenProps'
import BigNumber from 'bignumber.js'


export const CurrencyConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'BYN': {
            'BYN': (byn: string): BigNumber => new BigNumber(byn),
            'USD': (byn: string): BigNumber =>  new BigNumber(byn).multipliedBy(new BigNumber(0.4)),
            'EUR': (byn: string): BigNumber => new BigNumber(byn).multipliedBy(new BigNumber(0.41))
        },

        'USD': {
            'USD': (usd: string): BigNumber => new BigNumber(usd),
            'BYN': (usd: string): BigNumber => new BigNumber(usd).multipliedBy(new BigNumber(2.52)),
            'EUR': (usd: string): BigNumber => new BigNumber(usd).multipliedBy(new BigNumber(1.04))
        },

        'EUR': {
            'EUR': (eur: string): BigNumber => new BigNumber(eur),
            'BYN': (eur: string): BigNumber => new BigNumber(eur).multipliedBy(new BigNumber(2.42)),
            'USD': (eur: string): BigNumber => new BigNumber(eur).multipliedBy(new BigNumber( 0.96))
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
