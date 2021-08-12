import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { CoffeeDbRepository } from '../common/coffee-db-repository'
import { Parser } from './types'
import { ICoffee } from '../common/types/coffee'

export async function addCoffee(event: any, parser: Parser, coffeeDbRepository: CoffeeDbRepository): Promise<ICoffee> {
    const { country, name, quantity, price } = parser(event)
    await coffeeDbRepository.addCoffee(country, name, quantity, price)

    return { country, name, quantity, price }
}