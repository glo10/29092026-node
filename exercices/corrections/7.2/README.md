# Correction exercise 7.2 : tests d'intégrations des routes de l'API avec supertest et vitest

## Explications

- Valeur de la variable ***NODE_ENV=test*** permet de bien isoler nos tests et éviter des collisions avec l'environnement de développement au niveau de la base de données.

- Pour éviter les collisions entre les différents environnements, pour les tests, nous avons effectué l'installation du module `mongodb-memory-server` qui charge la base de données en mémoire, c'est plus rapide pour les tests et cela permet d'isoler et de supprimer facilement la base de données à la fin de la suite de tests. Puis, dans les tests et dans cet environnement, le module permettant de se connecter à la base de données est surchargé par l'utilisation des mocks. Ainsi connect() dans le contrôle se connecte à la base de données en mémoire sans modifier la fonction connect() originelle.

- Une solution alternative est d'avoir un autre fichier .env.test qui remplace lors du lancement des tests le fichier .env classique (un copier/coller et renommage de .env.test en .env). Ce fichier contient les informations de connexion à une autre base de données spécialement utilisé pour le test. Il faut penser également à le nettoyer (remettre à son état initial) après la série des tests.

---

## Lancement

```bash
npm install
npm run test
```
**PS: certains tests vont échouer et c'est normal à cause des opérations en BDD qui prennent trop de temps. Idéalement ici l'utilisation des tests doublés est préférable que de tester en se connectant directement à une vraie BDD**

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/7.2

#### `exercices/corrections/7.2/package.json`

```json
{
  "name": "7.2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "SET NODE_ENV=test && vitest --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "mongoose": "^9.10.3",
    "supertest": "^7.3.0",
    "vitest": "^5.0.3"
  }
}

```

#### `exercices/corrections/7.2/tests/teams.test.js`

```javascript
import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../../6.1/app.js";
import { randomNameGenerator } from "../utils.js";
import { loadEnvFile } from "node:process";
loadEnvFile();
/**
 * L'état de votre application doit être stable après le lancement des tests
 * Ici idéalement faudrait mocker la base de données pour éviter une connexion directe
 * mock = simulation d'un programme (fonction, api, module, etc.)
 * L'option choisit ici pour simplifier ce test est l'utilisation d'une autre BDD dédiées aux tests
 */

describe("Testing routes /teams", () => {
  let id = beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST, {  bufferCommands: false });
  });

  beforeEach(async () => {
    try {
      const db = mongoose.connection.db;
      await db.collection("teams").deleteMany({});
      await db.collection("teams").insertMany([
        { name: "psg", country: "France" },
        { name: "arsenal", country: "UK" },
        { name: "barcelona", country: "Spain" },
        { name: "AC Milan", country: "Italy" },
      ]);
      const { _id } = await db.collection("teams").findOne({ name: "psg" });
      id = _id;
    } catch (err) {
      console.error("Erreur critique dans beforeEach :", err);
      throw err; // Permet de stopper immédiatement les tests si l'insertion échoue
    }
  });

  afterAll(async () => {
    await mongoose.connecttion.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("Testing GET /teams", () => {
    it("Should have status 200", () => {
      return request(app) // Arrange
        .get("/teams") // Act
        .expect(200); // Assert
    });
    // it() ou son alias test() effectue le test avec une assertion
    it("Should have JSON data", () => {
      return request(app).get("/teams").expect("Content-Type", /json/);
    });

    it("Should have a response with success and data keys", async () => {
      const { body } = await request(app).get("/teams");
      expect(body.success).toBeDefined();
      expect(body.data).toBeDefined();
    });

    it("Should have a response with data key as an array", async () => {
      const { body } = await request(app).get("/teams");
      expect(Array.isArray(body.data)).toBeTruthy();
    });

    it("Should have a response with success equals true", async () => {
      const { body } = await request(app).get("/teams");
      expect(body.success).toBe(true);
    });
  });

  describe("Testing GET /teams/:id", () => {
    it("Should have 400 when id is not a MongoDB id format", () => {
      return request(app).get("/teams/ko").expect(400);
    });

    it("Should have a team with _id, name and country properties", async () => {
      const { body } = await request(app).get(`/teams/${id}`);
      console.log('body', body)
      expect(Object.keys(body.data)).toEqual(["_id", "name", "country", "__v"]);
    });

    it("Should not have an array of teams", async () => {
      const { body } = await request(app).get(`/teams/${id}`);
      expect(Array.isArray(body.data)).toBe(false);
    });
  });

  describe("Testing POST /teams", () => {
    it("Should GET status 201", () => {
      const name = randomNameGenerator(5);
      request(app).post("/teams").send({ name, country: "France" }).expect(201);
    });

    it("Should have success key equals true", async () => {
      const name = randomNameGenerator(4);
      const { body } = await request(app)
        .post("/teams")
        .send({ name, country: "France" });
      expect(body.success).toBe(true);
    });

    it("Should have data._id equals to MongoDB _id", async () => {
      const name = randomNameGenerator();
      const { body } = await request(app)
        .post("/teams")
        .send({ name, country: "France" });
      // document id _id généré par MongoDB commence par 69 et fait exactement 24 caractères
      expect(body.data._id).toMatch(/^69.{22}$/);
    });

    describe("Testing POST /teams duplicate name", () => {
      it("Should have a duplicate name error message", async () => {
        const name = randomNameGenerator();
        await request(app).post("/teams").send({ name, country: "France" });
        const { body } = await request(app)
          .post("/teams")
          .send({ name, country: "France" });
        expect(body).toEqual({
          data: { error: `Duplicate name ${name}` },
          success: false,
        });
      });

      it("Should have status 400", async () => {
        const name = randomNameGenerator();
        await request(app).post("/teams").send({ name, country: "France" });
        await request(app)
          .post("/teams")
          .send({ name, country: "France" })
          .expect(400);
      });
    });
  });
});

```

#### `exercices/corrections/7.2/utils.js`

```javascript
export const randomNameGenerator = (max = 10) => {
  let name = "";
  for (let i = 0; i < max; i++) {
    const random = Math.floor(Math.random() * 25);
    name += String.fromCharCode(97 + random);
  }
  return name;
};
```

#### `exercices/corrections/7.2/vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    hookTimeout: 25000,
    testTimeout: 15000, // par defaut 500 (1/2 sec) ici au moins 15secs à cause des opérations en BDD
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    exclude: [ 'node_modules']
  }
})

```

<!-- END AUTO-GENERATED -->
