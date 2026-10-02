import { describe, test } from 'node:test'
import assert from 'node:assert'
import { sum, divide } from '../src/my-math.js'
describe('Testing src/test.js', () => {
    describe('Testing sum()', () => {
        test("Should be 5 when nb1 = 1  et nb2 = 4", () => {
            // Arrange
            const nb1 = 1
            const nb2 = 4
            // Act
            const result = sum(nb1, nb2)
            // Assert
            assert.strictEqual(result, 5)
        })

        test("Should be 10 when 1, 2, 5, 2", () => {
            assert.strictEqual(sum(1,2,'5',2), 10)
        })

        test("Should be 100 when 5, 25, 10, 15, 15, 20, 10", () => {
            assert.strictEqual(sum(5, 25, 10, 15, 15, 20, 10), 100)
        })
    })

    describe('Testing divide()', () => {
        test('Should throw new Error exception when divide by zero', () => {
            assert.throws(() => divide(10,0), (error) => {
                assert.equal(error.message, 'Division par zero impossible')
                return true
            })
        })
        test.todo('Should be 5 when 10/2')
    })
})