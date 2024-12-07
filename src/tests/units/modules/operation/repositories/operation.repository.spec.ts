import { OperationRepository } from "@src/modules/operation/repositories/operation/operation.repository";
import { PrismaService } from "@src/shared/database/prisma.service";
import { Test, TestingModule } from '@nestjs/testing';
import { operationMockGenerate } from "@src/tests/mocks/operation.mock";

describe('OperationRepository', () => {
    let operationRepository: OperationRepository;
    let prismaService: PrismaService;
    let prismaServiceCountMock: jest.Mock;
    let prismaServiceCreateMock: jest.Mock;

    beforeEach(async () => {
        prismaServiceCountMock = jest.fn();
        prismaServiceCreateMock = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OperationRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        operation: {
                            count: prismaServiceCountMock,
                            create: prismaServiceCreateMock
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

    describe('create', () => {
        it(`GIVING create
             WHEN is valid param
             THEN should be create data`,
            async () => {
                const operationMock = operationMockGenerate()
                const result = await operationRepository.create(operationMock);

                expect(prismaServiceCreateMock).toHaveBeenCalledTimes(1);
                expect(prismaServiceCreateMock).toHaveBeenCalledWith({
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