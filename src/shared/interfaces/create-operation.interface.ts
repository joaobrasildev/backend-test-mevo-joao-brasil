export interface ICreateRequestOperation {
    from:string
    to:string
    amount:number
    suspect: boolean
}

export interface IOperation {
    id: number
    from:string
    to:string
    amount:number
}