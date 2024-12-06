import * as Papa from 'papaparse';

export function csvParserHelper(buffer: Buffer): Record<string, any>[] {
    const csvString = buffer.toString('utf-8');
    const result = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      throw new Error(`Erro ao processar o CSV: ${result.errors[0].message}`);
    }

    return result.data;
}