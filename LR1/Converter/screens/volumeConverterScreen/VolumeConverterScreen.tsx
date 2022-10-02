import {FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'
import BigNumber from 'bignumber.js'


export const VolumeConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'Liter': {
            'I.Gallon': (liter: string): BigNumber => new BigNumber(liter).multipliedBy(new BigNumber(0.219969)),
            'Liter': (liter: string): BigNumber => new BigNumber(liter)
        },

        'I.Gallon': {
            'I.Gallon': (gallon: string): BigNumber => new BigNumber(gallon),
            'Liter': (gallon: string): BigNumber => new BigNumber(gallon).multipliedBy(new BigNumber(4.546084868419069))
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