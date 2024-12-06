import { ICreateRequestOperation } from "@src/shared/interfaces/create-operation.interface";
import { AbstractOperationRepository } from "./abstract-operation.repository";
import { PrismaService } from "@src/shared/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OperationRepository implements AbstractOperationRepository {
    constructor(
        private prismaService: PrismaService
    ) {}

    async createMany(object: ICreateRequestOperation[]): Promise<void> {
        await this.prismaService.operation.createMany({
            data: object
        })
    }
    async getAmount(): Promise<number> {
        return await this.prismaService.operation.count({
            where: {}
        })
    }
}