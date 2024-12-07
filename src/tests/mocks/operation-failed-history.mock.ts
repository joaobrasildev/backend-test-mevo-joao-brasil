import { faker } from "@faker-js/faker/.";
import { ICreateOperationFailedHistoryRequestOperation, IOperationFailedHistoryResponse } from "@src/shared/interfaces/create-operation-failed-history.interface";

export function operationFailedHistoryMockGenerate(overrides: Partial<ICreateOperationFailedHistoryRequestOperation> = {}): ICreateOperationFailedHistoryRequestOperation {
    const defaultData: ICreateOperationFailedHistoryRequestOperation = {
      from: faker.string.alpha(),
      to: faker.string.alpha(),
      amount: faker.number.int(),
      reason: faker.helpers.arrayElement(['negative', 'duplicate'])
    };
  
    return { ...defaultData, ...overrides };
}

export function operationFailedHistoryResponseMockGenerate(overrides: Partial<IOperationFailedHistoryResponse> = {}): IOperationFailedHistoryResponse {
  const defaultData: IOperationFailedHistoryResponse = {
    id: faker.number.int(),
    from: faker.string.alpha(),
    to: faker.string.alpha(),
    amount: faker.number.int(),
    reason: faker.helpers.arrayElement(['negative', 'duplicate'])
  };

  return { ...defaultData, ...overrides };
}
