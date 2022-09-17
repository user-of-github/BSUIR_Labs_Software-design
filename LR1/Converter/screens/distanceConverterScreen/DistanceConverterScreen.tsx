import React from 'react'
import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import {ScreenProps} from '../../types/ScreenProps'


export const DistanceConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {title1: 'Meter', title2: 'Foot', ratioTo2: 0.3048, ratioTo1: 3.28084}

    return (
        <FormConverter theme={props.theme}
                       rules={converterRules}
                       premium={props.premium}
                       orientation={props.orientation}
        />
    )
}