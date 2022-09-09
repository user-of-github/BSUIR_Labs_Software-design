import {Theme} from '../../types/Theme'
import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'

interface WeightConverterScreenProps {
    theme: Theme
}


export const WeightConverterScreen = (props: WeightConverterScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {title1: 'Kilogram', title2: 'Pound', ratioTo2: 0.45359237}

    return <FormConverter theme={props.theme} rules={converterRules}/>
}