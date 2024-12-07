import { faker } from "@faker-js/faker/.";
import { IGetResumeResponse } from "@src/shared/interfaces/get-resume.interface";

export function resumeResponseMock(overrides: Partial<IGetResumeResponse> = {}): IGetResumeResponse {
    const defaultData: IGetResumeResponse = {
      validAmount: faker.number.int(),
      resume: [
          {
          id: faker.number.int(),
          from: faker.string.alpha(),
          to: faker.string.alpha(),
          amount: faker.number.int(),
          reason: faker.helpers.arrayElement(['negative', 'duplicate'])
        }
      ]
    }
  
    return { ...defaultData, ...overrides };
}