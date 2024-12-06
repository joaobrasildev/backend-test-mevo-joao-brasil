export interface ICreateOperationFailedHistoryRequestOperation {
    from:string
    to:string
    amount:number
    reason: string
}

export interface IOperationFailedHistoryResponse {
    id: number
    from:string
    to:string
    amount:number
    reason: string
}

export interface IOperationFailedHistory {
    from:string
    to:string
    amount:number
    reason: string
}