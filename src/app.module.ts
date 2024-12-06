import { Module } from '@nestjs/common';
import { GetResumeController } from './modules/operation/controllers/get-resume.controller';
import { PrismaService } from './shared/database/prisma.service';
import { AbstractGetResumeUseCase } from './modules/operation/use-cases/abstract-get-resume.use-case';
import { GetResumeUseCase } from './modules/operation/use-cases/get-resume.use-case';
import { AbstractOperationRepository } from './modules/operation/repositories/operation/abstract-operation.repository';
import { OperationFailedHistoryRepository } from './modules/operation/repositories/operation-failed-history/operation-failed-history.repository';
import { AbstractOperationFailedHistoryRepository } from './modules/operation/repositories/operation-failed-history/abstract-operation-failed-history.repository';
import { OperationModule } from './modules/operation/operation.module';

@Module({
    imports: [OperationModule],
    controllers: [],
    providers: []
})
export class AppModule {}
