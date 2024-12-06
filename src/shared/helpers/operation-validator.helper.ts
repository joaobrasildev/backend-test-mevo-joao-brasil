import { IOperationFailedHistory } from "../interfaces/create-operation-failed-history.interface";
import { IOperation } from "../interfaces/create-operation.interface";

export function operationValidator(operations: IOperation[]) {
    let invalidObject: IOperationFailedHistory[] = [];
    let validObject = [];
    let processed = [];

    operations.forEach((operation) => {
        const isDuplicate = processed.some(
            (processedItem) =>
                operation.from === processedItem.from &&
                operation.to === processedItem.to &&
                operation.amount === processedItem.amount
        );

        if (isDuplicate) {
            invalidObject.push({ ...operation, reason: 'duplicate' });
        } else if (operation.amount < 0) {
            invalidObject.push({ ...operation, reason: 'negative' });
        } else if(operation.amount > 50000){
            validObject.push({...operation, suspect: true});
            processed.push(operation);
        } else {
            validObject.push({...operation, suspect: false });
            processed.push(operation);
        }
    });

    return { invalidObject, validObject };
}