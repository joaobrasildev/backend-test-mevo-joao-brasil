import { faker } from "@faker-js/faker/.";
import { Test, TestingModule } from "@nestjs/testing";
import { AbstractOperationFailedHistoryRepository } from "@src/modules/operation/repositories/operation-failed-history/abstract-operation-failed-history.repository";
import { AbstractOperationRepository } from "@src/modules/operation/repositories/operation/abstract-operation.repository";
import { GetResumeUseCase } from "@src/modules/operation/use-cases/get-resume.use-case";
import { operationFailedHistoryResponseMockGenerate } from "@src/tests/mocks/operation-failed-history.mock";
import { operationMockGenerate } from "@src/tests/mocks/operation.mock";

describe('GetResumeUseCase', () => {
    let operationRepository: AbstractOperationRepository;
    let operationFailedHistoryRepository: AbstractOperationFailedHistoryRepository;
    let operationFailedHistoryRepositoryCreateManyMock: jest.Mock;
    let operationFailedHistoryRepositoryGetAllMock: jest.Mock;
    let getResumeUseCase: GetResumeUseCase;
    let operationRepositoryCreateMock: jest.Mock;
    let operationRepositoryGetAmountMock: jest.Mock;
    let operationRepositoryGetOneMock: jest.Mock;


    beforeEach(async () => {
        operationRepositoryCreateMock = jest.fn();
        operationRepositoryGetAmountMock = jest.fn()
        operationRepositoryGetOneMock = jest.fn()

        operationFailedHistoryRepositoryCreateManyMock = jest.fn()
        operationFailedHistoryRepositoryGetAllMock = jest.fn()

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetResumeUseCase,
                {
                    provide: AbstractOperationRepository,
                    useValue: {
                        create: operationRepositoryCreateMock,
                        getAmount: operationRepositoryGetAmountMock,
                        getOne: operationRepositoryGetOneMock
                    },
                },
                {
                    provide: AbstractOperationFailedHistoryRepository,
                    useValue: {
                        createMany: operationFailedHistoryRepositoryCreateManyMock,
                        getAll: operationFailedHistoryRepositoryGetAllMock
                    },
                },                
            ],
        }).compile();
    
        operationRepository = module.get<AbstractOperationRepository>(AbstractOperationRepository);
        operationFailedHistoryRepository = module.get<AbstractOperationFailedHistoryRepository>(AbstractOperationFailedHistoryRepository)
        getResumeUseCase = module.get<GetResumeUseCase>(GetResumeUseCase);
    });

    it('should be defined', () => {
        expect(operationRepository).toBeDefined();
        expect(operationFailedHistoryRepository).toBeDefined();
        expect(getResumeUseCase).toBeDefined();
    });

    describe('execute', () => {
        it(`GIVING execute 
            WHEN buffer file has a invalid amount
            THEN should be return resume`, async () => {
                const csvData = 
                'from;to;amount\n' +
                '4276070982701;9281297941669;-203611771'
            const csv = Buffer.from(csvData);
            const operationFailedHistoryGetAllResponseMock = [
                operationFailedHistoryResponseMockGenerate()
            ]

            operationFailedHistoryRepositoryCreateManyMock.mockReturnValue(undefined)
            operationFailedHistoryRepositoryGetAllMock.mockReturnValue(operationFailedHistoryGetAllResponseMock)


            const result = await getResumeUseCase.execute(csv)

            expect(result).toHaveProperty('validAmount')
            expect(result).toHaveProperty('resume')
            expect(operationFailedHistoryRepositoryCreateManyMock).toHaveBeenCalledTimes(1)
            expect(operationFailedHistoryRepositoryCreateManyMock).toHaveBeenCalledWith([{
                    from: '4276070982701',
                    to: '9281297941669',
                    amount: -203611771 /100,
                    reason: 'negative'
            }])
            expect(result.resume).toEqual(operationFailedHistoryGetAllResponseMock)
            expect(operationRepositoryCreateMock).toHaveBeenCalledTimes(0)

        })
    })

    it(`GIVING execute 
        WHEN buffer file has a valid amount
        THEN should be return resume`, async () => {
            const csvData = 
            'from;to;amount\n' +
            '4276070982701;9281297941669;203611771'
        const csv = Buffer.from(csvData);

        operationRepositoryCreateMock.mockReturnValue(undefined)
        operationRepositoryGetOneMock.mockReturnValue(undefined)
        operationRepositoryGetAmountMock.mockReturnValue(1)
        operationFailedHistoryRepositoryGetAllMock.mockReturnValue([])


        const result = await getResumeUseCase.execute(csv)

        expect(result).toHaveProperty('validAmount')
        expect(result).toHaveProperty('resume')
        expect(operationRepositoryCreateMock).toHaveBeenCalledTimes(1)
        expect(operationRepositoryGetOneMock).toHaveBeenCalledTimes(1)
        expect(operationRepositoryCreateMock).toHaveBeenCalledWith({
                from: '4276070982701',
                to: '9281297941669',
                amount: 203611771 /100,
                suspect: true
        })
        expect(result.resume).toEqual([])
        expect(operationFailedHistoryRepositoryCreateManyMock).toHaveBeenCalledTimes(0)

    })   
});