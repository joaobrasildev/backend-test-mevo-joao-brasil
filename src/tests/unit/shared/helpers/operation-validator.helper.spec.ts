import { operationValidator } from "@src/shared/helpers/operation-validator.helper";
import { IOperation } from "@src/shared/interfaces/create-operation.interface";

describe('OperationValidatorHelper', () => {
  it('should be return duplicated data', () => {
    const operations: IOperation[] = [
        {
            id: 1,
            to: '1232',
            from: '123928',
            amount: 219832

        },
        {
            id: 1,
            to: '1232',
            from: '123928',
            amount: 219832

        }
    ]
    const data = operationValidator(operations)

    expect(data?.invalidObject).toEqual([{
        id: 1,
        to: '1232',
        from: '123928',
        amount: 219832

    }])
  });
});
