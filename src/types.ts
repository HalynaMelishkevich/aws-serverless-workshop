export type ParserResponse = {
    country: string,
    name: string,
    price: number,
    quantity: number
}

export type Parser = (event: any) => ParserResponse