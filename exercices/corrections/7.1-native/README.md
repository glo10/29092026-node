# Correction 7.1  : unit testing avec vitest

## Rappels

- tests automatisés : écrire du code qui permet de vérifier un comportement ou un résultat attendu par notre application

#### Libraires pour les tests unitaires

- Native (node:test et node:assert)
- Vitest (le plus populaire, développer par l'écosytème VueJS) : nativement TypeScript, compatible avec Jest
- Jest (ancien roi, dev par ecosystème Facebook)
- Mocha

#### Logique des tests

- AAA :
    - Arrange : préparer tout ce qu'il faut pour effectuer les tests (importer les fonctions, déclarer les variables, environnement, etc.)
    - Act : appeler la fonction à tester
    - Assert : faire les vérifications
- Critères : FIRST : Fast (<1s), isolé au maximum les briques du code, repetable (même résultat à chaque exécution), etc.
- Les tests doublés (SpyOn, Mock) : simuler l'appel des fonctions, les résultats obtenus pour garantir l'isolation en évitant des connexions à la base de données, API externes, traitements lourds, etc.

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/7.1-native

#### `exercices/corrections/7.1-native/package.json`

```json
{
  "name": "7.1-live",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "node --watch --test"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```

#### `exercices/corrections/7.1-native/src/my-math.js`

```javascript
// ...args recup liste des paramètres sous forme de tableau
export function sum(...args) {
    let total = 0
    args.forEach(param => {
        total += Number(param)
    })
    return total
}

export function divide(n1, n2) {
    if(parseInt(n2) === 0) throw new Error('Division par zero impossible')
    else return n1 / n2
}
```

#### `exercices/corrections/7.1-native/tests/math.test.js`

```javascript
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
```

<!-- END AUTO-GENERATED -->


