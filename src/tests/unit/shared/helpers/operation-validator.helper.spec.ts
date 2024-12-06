import { operationValidator } from "@src/shared/helpers/operation-validator.helper";
import { IOperation } from "@src/shared/interfaces/create-operation.interface";

describe('OperationValidatorHelper', () => {
    it('should be return duplicated data', () => {
        const operations: IOperation[] = [
            {
                to: '1232',
                from: '123928',
                amount: 21983

            },
            {
                to: '1232',
                from: '123928',
                amount: 21983

            }
        ]
        const data = operationValidator(operations)

        expect(data?.invalidObject).toEqual([{
            to: '1232',
            from: '123928',
            amount: 21983,
            reason: 'duplicate'
        }])
        expect(data?.validObject).toEqual([{
            to: '1232',
            from: '123928',
            amount: 21983
        }])

    });

    it('should be return negative data', () => {
        const operations: IOperation[] = [
            {
                to: '1232',
                from: '123928',
                amount: -219832

            }
        ]
        const data = operationValidator(operations)

        expect(data?.invalidObject).toEqual([{
            to: '1232',
            from: '123928',
            amount: -219832,
            reason: 'negative'

        }])
        expect(data?.validObject).toEqual([])
    });

    it('should be return suspect operation data', () => {
        const operations: IOperation[] = [
            {
                to: '1232',
                from: '123928',
                amount: 219832

            }
        ]
        const data = operationValidator(operations)

        expect(data?.validObject).toEqual([{
            to: '1232',
            from: '123928',
            amount: 219832,
            suspect: true

        }])
    });    
});
