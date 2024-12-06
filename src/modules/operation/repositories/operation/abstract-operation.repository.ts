import { ICreateRequestOperation } from "@src/shared/interfaces/create-operation.interface";

export abstract class AbstractOperationRepository {
    abstract createMany(object: ICreateRequestOperation[]): Promise<void>;
    abstract getAmount(): Promise<number>;
}