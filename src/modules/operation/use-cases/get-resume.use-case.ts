import { IGetResumeResponse } from "@src/shared/interfaces/get-resume.interface";
import { AbstractGetResumeUseCase } from "./abstract-get-resume.use-case";
import { csvParserHelper } from "@src/shared/helpers/csv-parser.helper";
import { converteMoneyHelper } from "@src/shared/helpers/converte-money.helper";
import { operationValidator } from "@src/shared/helpers/operation-validator.helper";
import { AbstractOperationRepository } from "../repositories/operation/abstract-operation.repository";
import { AbstractOperationFailedHistoryRepository } from "../repositories/operation-failed-history/abstract-operation-failed-history.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetResumeUseCase implements AbstractGetResumeUseCase {
    constructor(
        private readonly operationRepository: AbstractOperationRepository,
        private readonly operationFailedHistoryRepository: AbstractOperationFailedHistoryRepository
    ){}

    async execute(csv: Buffer): Promise<IGetResumeResponse> {
        const csvData = csvParserHelper(csv);
        const csvDataAmountConverted = csvData.map((data) => {
            return {
                from: data.from,
                to: data.to,
                amount: converteMoneyHelper(data.amount)
            }
        })
        const csvValidatedData = operationValidator(csvDataAmountConverted);
        if(csvValidatedData.validObject.length) {
            await this.operationRepository.createMany(csvValidatedData.validObject);
        }
        if(csvValidatedData.invalidObject.length) {
            await this.operationFailedHistoryRepository.createMany(csvValidatedData.invalidObject);
        }
        
        const [amount, resume] = await Promise.all([
            this.operationRepository.getAmount(),
            this.operationFailedHistoryRepository.getAll()
        ])

        return { validAmount: amount, resume }

    }
}