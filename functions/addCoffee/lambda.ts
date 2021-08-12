import { APIGatewayProxyResultV2, APIGatewayProxyEventV2 } from 'aws-lambda'
import { CoffeeDbRepository } from '../../common/coffee-db-repository'
import { addCoffee } from '../../src/main'
import { parseApiEvent } from '../../src/parser'

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!process.env.COFFEE_TABLE) {
        throw new Error('Table name is required')
    }
    const coffeeDbRepository = new CoffeeDbRepository(process.env.COFFEE_TABLE)
    const result = await addCoffee(event, parseApiEvent, coffeeDbRepository)
    console.log(result)

    return {
        statusCode: 204
    }
}