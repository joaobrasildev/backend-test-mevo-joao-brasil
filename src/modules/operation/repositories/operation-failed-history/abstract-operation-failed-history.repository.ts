import { ICreateOperationFailedHistoryRequestOperation, IOperationFailedHistoryResponse } from "@src/shared/interfaces/create-operation-failed-history.interface";

export abstract class AbstractOperationFailedHistoryRepository {
    abstract createMany(object: ICreateOperationFailedHistoryRequestOperation[]): Promise<void>
    abstract getAll(): Promise<IOperationFailedHistoryResponse[]>
}