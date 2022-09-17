import React from 'react'
import {ConverterRules, FormConverter} from '../../components/formConverter/FormConverter'
import {requestToServer} from '../../utils/requestToServer'
import {ScreenProps} from '../../types/ScreenProps'


const CURRENCY_API_URL: string = 'https://api.exchangerate.host/latest'


export const CurrencyConverterScreen = (props: ScreenProps): JSX.Element => {
    const [exchange, setExchange] = React.useState<any>(undefined)
    const [converterRules, setConverterRules] = React.useState<ConverterRules | undefined>(undefined)

    React.useEffect(() => {
        requestToServer({
            url: CURRENCY_API_URL,
            method: 'GET',
            callback: data => {
                setExchange(data)
                setConverterRules({title1: 'EUR', title2: 'BYN', ratioTo2: data.rates.BYN, ratioTo1: 1 / data.rates.BYN})
            }
        })
    }, [])

    return (
        <>
            {
                exchange !== undefined && converterRules !== undefined
                &&
                <FormConverter theme={props.theme}
                               rules={converterRules}
                               premium={props.premium}
                               orientation={props.orientation}
                />
            }
        </>
    )
}
