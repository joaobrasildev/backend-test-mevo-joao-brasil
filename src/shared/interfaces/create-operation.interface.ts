export interface ICreateRequestOperation {
    from:string
    to:string
    amount:number
    suspect: boolean
}

export interface IOperation {
    from:string
    to:string
    amount:number
}