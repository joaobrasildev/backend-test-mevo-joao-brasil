import { Module } from '@nestjs/common';
import { GetResumeController } from './controllers/get-resume.controller';
import { PrismaService } from '@src/shared/database/prisma.service';
import { AbstractGetResumeUseCase } from './use-cases/abstract-get-resume.use-case';
import { GetResumeUseCase } from './use-cases/get-resume.use-case';
import { OperationFailedHistoryRepository } from './repositories/operation-failed-history/operation-failed-history.repository';
import { AbstractOperationFailedHistoryRepository } from './repositories/operation-failed-history/abstract-operation-failed-history.repository';
import { AbstractOperationRepository } from './repositories/operation/abstract-operation.repository';
import { OperationRepository } from './repositories/operation/operation.repository';

@Module({
    imports: [],
    controllers: [GetResumeController],
    providers: [
        PrismaService,
        { provide: AbstractGetResumeUseCase, useClass: GetResumeUseCase },
        { provide: AbstractOperationRepository, useClass:  OperationRepository},
        { provide: AbstractOperationFailedHistoryRepository, useClass: OperationFailedHistoryRepository },
    ],
    exports: [
        AbstractGetResumeUseCase,
        AbstractOperationRepository,
        AbstractOperationFailedHistoryRepository
    ]
})
export class OperationModule {}