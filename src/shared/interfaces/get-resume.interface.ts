export interface IResume {
    id: number
    from: string
    to: string
    amount: number
    reason: string
}
export interface IGetResumeResponse {
    validAmount: number,
    resume: IResume[]
}