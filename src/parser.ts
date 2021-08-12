import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { ParserResponse } from './types'

export function parseApiEvent(event: APIGatewayProxyEventV2): ParserResponse {
    if (!event.body) {
        throw new Error('Body is undefined!')
    }
    const { name, country, price, quantity } = JSON.parse(event.body)

    return { name, country, price, quantity }
}