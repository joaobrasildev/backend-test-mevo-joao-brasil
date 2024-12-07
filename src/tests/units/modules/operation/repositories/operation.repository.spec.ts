import { OperationRepository } from "@src/modules/operation/repositories/operation/operation.repository";
import { PrismaService } from "@src/shared/database/prisma.service";
import { Test, TestingModule } from '@nestjs/testing';
import { operationMockGenerate } from "@src/tests/mocks/operation.mock";

describe('OperationRepository', () => {
    let operationRepository: OperationRepository;
    let prismaService: PrismaService;
    let prismaServiceCountMock: jest.Mock;
    let prismaServiceCreateManyMock: jest.Mock;

    beforeEach(async () => {
        prismaServiceCountMock = jest.fn();
        prismaServiceCreateManyMock = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OperationRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        operation: {
                            count: prismaServiceCountMock,
                            createMany: prismaServiceCreateManyMock
                        }
                    },
                },
            ],
        }).compile();
    
        operationRepository = module.get<OperationRepository>(OperationRepository);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(operationRepository).toBeDefined();
        expect(prismaService).toBeDefined();
    });

    describe('createMany', () => {
        it(`GIVING createMany
             WHEN is valid array param
             THEN should be create data`,
            async () => {
                const operationMock = [
                    operationMockGenerate(),
                    operationMockGenerate()
                ]
                const result = await operationRepository.createMany(operationMock);

                expect(prismaServiceCreateManyMock).toHaveBeenCalledTimes(1);
                expect(prismaServiceCreateManyMock).toHaveBeenCalledWith({
                    data: operationMock
                });
                expect(result).toEqual(undefined)
            }
        )
        it(`GIVING createMany
            WHEN is invalid array param
            THEN should be not fail`,
           async () => {
               const operationMock = []
               const result = await operationRepository.createMany(operationMock);

               expect(prismaServiceCreateManyMock).toHaveBeenCalledTimes(1);
               expect(prismaServiceCreateManyMock).toHaveBeenCalledWith({
                   data: operationMock
               });
               expect(result).toEqual(undefined)
           }
       )        
    })

    describe('count', () => {
        it(`GIVING count
            WITHOUT param data
            THEN should be return count data`,
            async () => {
                prismaServiceCountMock.mockReturnValue(10)

                const result = await operationRepository.getAmount();

                expect(prismaServiceCountMock).toHaveBeenCalledTimes(1);
                expect(prismaServiceCountMock).toHaveBeenCalledWith({
                    where: {}
                });
                expect(result).toEqual(10)
            }
        )
    })    
});