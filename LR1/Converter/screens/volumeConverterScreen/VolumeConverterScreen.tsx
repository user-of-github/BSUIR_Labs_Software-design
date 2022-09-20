import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'
import {ScreenProps} from '../../types/ScreenProps'



export const VolumeConverterScreen = (props: ScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {title1: 'Gallon', title2: 'Liter', ratioTo2: 3.78541, ratioTo1: 0.264172}

    return (
        <FormConverter theme={props.theme}
                       rules={converterRules}
                       premium={props.premium}
                       orientation={props.orientation}
        />
    )
}