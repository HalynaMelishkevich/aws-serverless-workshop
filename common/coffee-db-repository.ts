import { PolicyDocument } from 'aws-lambda'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ICoffee } from './types/coffee'

export class CoffeeDbRepository {
    table: string
    dc: DocumentClient
    
    constructor(table: string, dc = new DocumentClient()) {
        this.table = table
        this.dc = dc
    }

    async addCoffee(country: string, name: string, quantity: number, price: number): Promise<ICoffee> {
        await this.dc.put({
            TableName: this.table,
            Item: {
                PK: 'COFFEE',
                SK: `COUNTRY#${country}#NAME#${name}`,
                country,
                name,
                quantity,
                price,
                createdAt: new Date().toUTCString()
            }
        }).promise()

        return {
            country,
            name,
            price,
            quantity
        }
    }
}