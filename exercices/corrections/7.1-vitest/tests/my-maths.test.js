import { describe, it, expect } from "vitest";
import { sum, divide } from "../src/my-maths.js";
describe("Testing Maths functions", () => {
  describe("Testing sum", () => {
    it("Should have 6 when sum(2,4)", () => {
      // Arrange
      const n1 = 2;
      const n2 = 4;
      // Act
      const result = sum(n1, n2);
      // Assert
      expect(result).toBe(6);
    });

    it("Should have 45 when sum(0,1,2,3,4,5,6,7,8,9)", () => {
      expect(sum(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)).toEqual(45);
    });
  });

  describe("Testing division", () => {
    it("Should have 2 when divide(8,2)", () => {
      expect(divide(8,2)).toStrictEqual(4)
    });

    it("Should have error message when nb2 equals 0", () => {
      expect(() => divide(10, 0).toThrow("Divide by 0 impossible"));
    });

    it("Should throw new Error('Divide by 0 impossible')", () => {
      expect(() => divide(0, 0).toThrow(new Error("Divide by 0 impossible")));
    });
  });
});
