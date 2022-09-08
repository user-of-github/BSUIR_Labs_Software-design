import {ServerRequestParameters} from '../types/ServerRequestParameters'


export const requestToServer = (parameters: ServerRequestParameters) => {
    const request: XMLHttpRequest = new XMLHttpRequest()

    request.open(parameters.method ?? 'GET', parameters.url);
    request.responseType = 'json'
    request.send()

    request.onload = () => parameters.callback(request.response)
}