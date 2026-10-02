# Correction exercice 7.1 avec Vitest

## Installation et lancement des tests

1. `npm install`

2. Depuis la racine de ce dossier, lancez la commande suivante : 
```bash
npm run test
```

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/7.1-vitest

#### `exercices/corrections/7.1-vitest/package.json`

```json
{
  "name": "7.1",
  "version": "1.0.0",
  "description": "Testing with TDD approach",
  "type": "module",
  "scripts": {
    "test": "vitest"
  },
  "keywords": [
    "Vitest",
    "TDD"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vitest": "^5.0.3"
  }
}

```

#### `exercices/corrections/7.1-vitest/src/my-maths.js`

```javascript
// ...args récupère tous les arguments de la fonction sous forme de tableau
export const sum = (...args) => {
  let sum = 0
  args.forEach(nb => sum += nb)
  return sum
}

export const divide = (nb1, nb2) => {
  if(nb2 == '0') throw new Error('Divide by 0 impossible')
  return nb1/nb2
}
```

#### `exercices/corrections/7.1-vitest/tests/my-maths.test.js`

```javascript
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

```

#### `exercices/corrections/7.1-vitest/vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 1000,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    environmentMatchGlobs: [
      [
        'tests/*/*.test.[c|m]js',
        'tests/*/*integration*.test.{js,mjs,cjs,ts}',
        'node',
      ]
    ],
    exclude: ['config', 'cypress', 'node_modules']
  }
})

```

<!-- END AUTO-GENERATED -->