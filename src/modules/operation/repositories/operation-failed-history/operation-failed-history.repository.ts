import { PrismaService } from "@src/shared/database/prisma.service";
import { AbstractOperationFailedHistory } from "./abstract-operation-failed-history.repository";
import { ICreateOperationFailedHistoryRequestOperation, IOperationFailedHistoryResponse } from "@src/shared/interfaces/create-operation-failed-history.interface";

export class OperationFailedHistoryRepository implements AbstractOperationFailedHistory{
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async createMany(object: ICreateOperationFailedHistoryRequestOperation[]): Promise<void> {
        await this.prismaService.operationFailedHistory.createMany({
            data: object
        }) 
    }
    async getAll(): Promise<IOperationFailedHistoryResponse[]> {
        return this.prismaService.operationFailedHistory.findMany()
    }
}