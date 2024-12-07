import { converteMoneyHelper } from "@src/shared/helpers/converte-money.helper";

describe('converteMoneyHelper', () => {
    it('should be return number converted', () => {
        const amount = 100000

        const result = converteMoneyHelper(amount);

        expect(result).toEqual(1000)
    })

    it('giving number lower to 100 should be return number converted', () => {
        const amount = 10

        const result = converteMoneyHelper(amount);

        expect(result).toEqual(0.10)
    })

    it('giving negative amount should be return number converted', () => {
        const amount = -5000

        const result = converteMoneyHelper(amount);

        expect(result).toEqual(-50)
    })
})