import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'


export const WeightConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {title1: 'Kilogram', title2: 'Pound', ratioTo2: 0.45359237, ratioTo1: 2.20462}

    return (
        <FormConverter theme={props.theme}
                       rules={converterRules}
                       premium={props.premium}
                       orientation={props.orientation}
        />
    )
}