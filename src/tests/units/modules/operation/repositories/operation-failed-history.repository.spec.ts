import { OperationFailedHistoryRepository } from "@src/modules/operation/repositories/operation-failed-history/operation-failed-history.repository";
import { PrismaService } from "@src/shared/database/prisma.service";
import { Test, TestingModule } from '@nestjs/testing';
import { operationFailedHistoryMockGenerate, operationFailedHistoryResponseMockGenerate } from "@src/tests/mocks/operation-failed-history.mock";

describe('OperationFailedHistoryRepository', () => {
    let operationFailedHistoryRepository: OperationFailedHistoryRepository;
    let prismaService: PrismaService;
    let prismaServiceFindManyMock: jest.Mock;
    let prismaServiceCreateManyMock: jest.Mock;

    beforeEach(async () => {
        prismaServiceFindManyMock = jest.fn();
        prismaServiceCreateManyMock = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OperationFailedHistoryRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        operationFailedHistory: {
                            findMany: prismaServiceFindManyMock,
                            createMany: prismaServiceCreateManyMock
                        }
                    },
                },
            ],
        }).compile();
    
        operationFailedHistoryRepository = module.get<OperationFailedHistoryRepository>(OperationFailedHistoryRepository);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(operationFailedHistoryRepository).toBeDefined();
        expect(prismaService).toBeDefined();
    });

    describe('createMany', () => {
        it(`GIVING createMany
             WHEN is valid array param
             THEN should be create data`,
            async () => {
                const operationFailedHistoryMock = [
                    operationFailedHistoryMockGenerate(),
                    operationFailedHistoryMockGenerate()
                ]
                const result = await operationFailedHistoryRepository.createMany(operationFailedHistoryMock);

                expect(prismaServiceCreateManyMock).toHaveBeenCalledTimes(1);
                expect(prismaServiceCreateManyMock).toHaveBeenCalledWith({
                    data: operationFailedHistoryMock
                });
                expect(result).toEqual(undefined)
            }
        )
        it(`GIVING createMany
            WHEN is invalid array param
            THEN should be not fail`,
           async () => {
               const operationFailedHistoryMock = []
               const result = await operationFailedHistoryRepository.createMany(operationFailedHistoryMock);

               expect(prismaServiceCreateManyMock).toHaveBeenCalledTimes(1);
               expect(prismaServiceCreateManyMock).toHaveBeenCalledWith({
                   data: operationFailedHistoryMock
               });
               expect(result).toEqual(undefined)
           }
       )        
    })

    describe('getAll', () => {
        it(`GIVING getAll
            WITHOUT param data
            THEN should be return getAll data`,
            async () => {
                const operationsFailedHistoryMock = [
                    operationFailedHistoryResponseMockGenerate(),
                    operationFailedHistoryResponseMockGenerate()
                ]
                prismaServiceFindManyMock.mockReturnValue(operationsFailedHistoryMock)

                const result = await operationFailedHistoryRepository.getAll();

                expect(prismaServiceFindManyMock).toHaveBeenCalledTimes(1);
                expect(prismaServiceFindManyMock).toHaveBeenCalledWith();
                expect(result).toEqual(operationsFailedHistoryMock)
            }
        )
    })    
});