import React from 'react'
import {FormConverter} from '../../components/formConverter/FormConverter'
import {ScreenProps} from '../../types/ScreenProps'
import BigNumber from 'bignumber.js'


export const DistanceConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'meter': {
            'meter': (meter: string): BigNumber => new BigNumber(meter),
            'yard': (meter: string): BigNumber => new BigNumber(meter).multipliedBy(new BigNumber(1.09361)),
            'inch': (meter: string): BigNumber => new BigNumber(meter).multipliedBy(new BigNumber(39.3701))
        },

        'yard': {
            'yard': (yard: string): BigNumber => new BigNumber(yard),
            'meter': (yard: string): BigNumber => new BigNumber(yard).multipliedBy(new BigNumber(0.9144)),
            'inch': (yard: string): BigNumber => new BigNumber(yard).multipliedBy(new BigNumber(36))
        },

        'inch': {
            'inch': (inch: string): BigNumber => new BigNumber(inch),
            'meter': (inch: string): BigNumber => new BigNumber(inch).multipliedBy(new BigNumber(0.0254)),
            'yard': (inch: string): BigNumber => new BigNumber(inch).multipliedBy(new BigNumber(0.0277778))
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