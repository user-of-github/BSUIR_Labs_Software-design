import React from 'react'
import {View, Text} from 'react-native'
import {FormConverter} from '../../components/formConverter/FormConverter'
import {Theme} from '../../types/Theme'


interface CurrencyConverterScreenProps {
    theme: Theme
}

export const CurrencyConverterScreen = (props: CurrencyConverterScreenProps): JSX.Element => (
    <FormConverter theme={props.theme}/>
)