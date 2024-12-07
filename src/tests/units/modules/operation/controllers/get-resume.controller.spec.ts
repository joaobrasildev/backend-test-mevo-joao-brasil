import { Test, TestingModule } from "@nestjs/testing";
import { GetResumeController } from "@src/modules/operation/controllers/get-resume.controller";
import { AbstractGetResumeUseCase } from "@src/modules/operation/use-cases/abstract-get-resume.use-case";
import { resumeResponseMock } from "@src/tests/mocks/resume-response.mock";

describe('GetResumeController', () => {
    let getResumeController: GetResumeController;
    let getResumeUseCase: AbstractGetResumeUseCase
    let getResumeUseCaseExecute: jest.Mock;

    beforeEach(async () => {
        getResumeUseCaseExecute = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetResumeController,
                {
                    provide: AbstractGetResumeUseCase,
                    useValue: {
                        execute: getResumeUseCaseExecute,
                    },
                },
            ],
        }).compile();
    
        getResumeUseCase = module.get<AbstractGetResumeUseCase>(AbstractGetResumeUseCase);
        getResumeController = module.get<GetResumeController>(GetResumeController);
    });

    it('should be defined', () => {
        expect(getResumeController).toBeDefined();
        expect(getResumeUseCase).toBeDefined();
    });

    it(`GIVING execute 
        WHEN csv has a valid data
        THEN should be return resume`, async () => {
        const resumeResponse = resumeResponseMock()
       
        getResumeUseCaseExecute.mockReturnValue(resumeResponse)

        const csvData = 
                'from;to;amount\n' +
                '4276070982701;9281297941669;-203611771'
        const buffer = Buffer.from(csvData);
        const file = {
            fieldname: 'file',
            filename: 'csv',
            originalname: 'data.csv',
            encoding: '7bit',
            mimetype: 'text/csv',
            buffer: buffer,
            size: buffer.length,
            stream: {} as any,
            destination: '',
            path: ''
          };    

       const response = await getResumeController.execute(file)

       expect(getResumeUseCaseExecute).toHaveBeenCalledTimes(1)
       expect(getResumeUseCaseExecute).toHaveBeenCalledWith(file.buffer)
       expect(response).toEqual(resumeResponse)
    })
});