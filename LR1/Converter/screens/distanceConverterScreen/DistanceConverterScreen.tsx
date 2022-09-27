import React from 'react'
import {FormConverter} from '../../components/formConverter/FormConverter'
import {ScreenProps} from '../../types/ScreenProps'


export const DistanceConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules = {
        'meter': {
            'meter': (meter: number): number => meter,
            'yard': (meter: number): number => 1.09361 * meter,
            'inch': (meter: number): number => 39.3701 * meter
        },

        'yard': {
            'yard': (yard: number): number => yard,
            'meter': (yard: number): number => 0.9144 * yard,
            'inch': (yard: number): number => 36 * yard
        },

        'inch': {
            'inch': (inch: number): number => inch,
            'meter': (inch: number): number => 0.0254 * inch,
            'yard': (inch: number): number => 0.0277778 * inch
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