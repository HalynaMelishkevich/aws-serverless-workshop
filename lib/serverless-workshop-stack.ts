import { Stack, Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { Table, AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2'
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'

export class ServerlessWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const coffeeTable = new Table(this, 'CoffeeTable', {
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'SK',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST
    })

    coffeeTable.addLocalSecondaryIndex({
      indexName: 'LSI1',
      sortKey: {
        name: 'LSI1',
        type: AttributeType.STRING
      }
    })

    // Function
    const addCoffeeFunction = new NodejsFunction(this, 'AddCoffee', {
      entry: 'functions/addCoffee/lambda.ts',
      handler: 'handler',
      environment: {
        COFFEE_TABLE: coffeeTable.tableName,
        // NODE_OPTIONS: '--enable-source-maps' // TODO investigate why this does not work
      }
    })

    const addCoffeeFunctionIntegration = new LambdaProxyIntegration({
      handler: addCoffeeFunction
    })

    coffeeTable.grantWriteData(addCoffeeFunction)
    
    // API
    const api = new HttpApi(this, 'CoffeeAPI', {})
    api.addRoutes({
      path: '/addCoffee',
      integration: addCoffeeFunctionIntegration,
      methods: [HttpMethod.POST]
    })

    new CfnOutput(this, 'ApiUrl', {
      value: api.url || ''
    })
  }
}
