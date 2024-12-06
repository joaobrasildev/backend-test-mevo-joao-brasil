import { ICreateOperationFailedHistoryRequestOperation, IOperationFailedHistoryResponse } from "@src/shared/interfaces/create-operation-failed-history.interface";

export abstract class AbstractOperationFailedHistory {
    abstract createMany(object: ICreateOperationFailedHistoryRequestOperation[]): Promise<void>
    abstract getAll(): Promise<IOperationFailedHistoryResponse[]>
}