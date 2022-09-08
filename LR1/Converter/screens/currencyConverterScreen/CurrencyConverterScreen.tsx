import React from 'react'
import {View, Text} from 'react-native'
import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import {Theme} from '../../types/Theme'
import {requestToServer} from '../../utils/requestToServer'


interface CurrencyConverterScreenProps {
    theme: Theme
}

const CURRENCY_API_URL: string = 'https://api.exchangerate.host/latest'


export const CurrencyConverterScreen = (props: CurrencyConverterScreenProps): JSX.Element => {
    const [exchange, setExchange] = React.useState<any>(undefined)
    const [converterRules, setConverterRules] = React.useState<ConverterRules | undefined>(undefined)

    React.useEffect(() => {
        requestToServer({
            url: CURRENCY_API_URL,
            method: 'GET',
            callback: data => {
                setExchange(data)
                setConverterRules({title1: 'EUR', title2: 'BYN', title3: 'USD', ratioTo2: data.rates.BYN, ratioTo3: data.rates.USD})
            }
        })
    }, [])

    return (
        <>
            {
                exchange !== undefined && converterRules !== undefined
                &&
                <FormConverter theme={props.theme} rules={converterRules}/>
            }
        </>
    )
}
