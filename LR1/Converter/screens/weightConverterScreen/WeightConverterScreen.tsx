import {Theme} from '../../types/Theme'
import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'

interface WeightConverterScreenProps {
    theme: Theme
    premium: boolean
}


export const WeightConverterScreen = (props: WeightConverterScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {title1: 'Kilogram', title2: 'Pound', ratioTo2: 0.45359237, ratioTo1: 2.20462}

    return <FormConverter theme={props.theme} rules={converterRules} premium={props.premium}/>
}