import {FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'


export const VolumeConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'Liter': {
            'I.Gallon': (liter: number): number => 0.219969 * liter,
            'Liter': (liter: number): number => liter
        },

        'I.Gallon': {
            'I.Gallon': (gallon: number): number => gallon,
            'Liter': (gallon: number): number => 4.546084868419069 * gallon
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