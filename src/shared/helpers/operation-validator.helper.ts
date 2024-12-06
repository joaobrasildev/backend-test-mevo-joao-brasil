import { IOperationFailedHistory } from "../interfaces/create-operation-failed-history.interface";
import { IOperation } from "../interfaces/create-operation.interface";

export function operationValidator(operations: IOperation[]) {
    let invalidObject: IOperationFailedHistory[] = [];
    let validObject = [];
    let processed = [];

    operations.forEach((operation) => {
        if(processed.filter((processedItem) => {
                operation.from == processedItem.from &&
                operation.to == processedItem.to && 
                operation.amount == processedItem.amount
            }).length
        ) {
            invalidObject.push({...operation, reason: 'duplicate'})
        }    
        if(operation.amount < 0) {
            invalidObject.push({...operation, reason: 'negative'})
            processed.push(operation)
        }
        validObject.push(operation)

    })

    return { invalidObject, validObject }
}