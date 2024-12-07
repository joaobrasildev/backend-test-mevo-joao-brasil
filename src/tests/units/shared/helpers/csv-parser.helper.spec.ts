import { InternalServerErrorException } from "@nestjs/common";
import { csvParserHelper } from "@src/shared/helpers/csv-parser.helper";

describe('OperationValidatorHelper', () => {
    it('should be return csv data', () => {
        const csvData = 
        'from;to;amount\n' +
        '4276070982701;9281297941669;-203611771'

        const buffer = Buffer.from(csvData);

        const result = csvParserHelper(buffer);

        expect(result).toEqual([{
           from: '4276070982701',
           to: '9281297941669',
           amount: '-203611771'
        }])
    })

    it('should be return an empty array', () => {
        const csvData = 
        'from;to;amount\n'

        const buffer = Buffer.from(csvData);

        const result = csvParserHelper(buffer);

        expect(result).toEqual([])
    }) 
})