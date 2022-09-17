import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'



export const VolumeConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {title1: 'Liter', title2: 'Barrel', ratioTo2: 163.65, ratioTo1: 1 / 163.65}

    return (
        <FormConverter theme={props.theme}
                       rules={converterRules}
                       premium={props.premium}
                       orientation={props.orientation}
        />
    )
}