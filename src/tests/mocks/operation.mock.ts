import { faker } from "@faker-js/faker/.";
import { ICreateRequestOperation } from "@src/shared/interfaces/create-operation.interface";

export function operationMockGenerate(overrides: Partial<ICreateRequestOperation> = {}): ICreateRequestOperation {
    const defaultData: ICreateRequestOperation = {
      from: faker.string.alpha(),
      to: faker.string.alpha(),
      amount: faker.number.int(),
      suspect: faker.helpers.arrayElement([true, false])
    };
  
    return { ...defaultData, ...overrides };
}