import {Theme} from '../../types/Theme'
import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import React from 'react'

interface VolumeConverterScreenProps {
    theme: Theme
}


export const VolumeConverterScreen = (props: VolumeConverterScreenProps): JSX.Element => {
    const converterRules: ConverterRules = {
        title1: 'Liter',
        title2: 'Barrel',
        ratioTo2: 163.65
    }

    return (
        <FormConverter theme={props.theme} rules={converterRules}/>
    )
}