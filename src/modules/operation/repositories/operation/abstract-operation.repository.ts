import { ICreateRequestOperation } from "@src/shared/interfaces/create-operation.interface";

export abstract class AbstractOperationRepository {
    abstract create(object: ICreateRequestOperation): Promise<void>;
    abstract getAmount(): Promise<number>;
    abstract getOne(object: ICreateRequestOperation): Promise<ICreateRequestOperation>;
}