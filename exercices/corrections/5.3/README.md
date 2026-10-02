# Correction exercice 5.3 : API ligue de champions

Projet express avec l'utilisation du module *express* et le standard ECMAScript.
Express a été installé avec `npm i express` et pas la CLI

## Lancement du projet

1. `npm install`
2. `npm run dev`

---

## Pour générer la documentation de votre API

- via les modules suivants avec Express
    - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/tree/master)
    - [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
    - [Article sur leur utilisation ensemble](https://dev.to/qbentil/swagger-express-documenting-your-nodejs-rest-api-4lj7)

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/5.3

#### `exercices/corrections/5.3/app.js`

```javascript
import express from 'express'

import indexRouter from './routes/index.js'
import  teamsRouter from './routes/teams.js'

const app = express();
// Middleware qui transforme req.body en objet JS donc évite par la suite de faire req.on('data'), req.on('end') et JSON.parse()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware qui définie tout ce qu'on autorise (les méthodes, les clients (navigateur, terminal, etc.))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRouter);
app.use('/teams', teamsRouter);

export default app

```

#### `exercices/corrections/5.3/data/teams.json`

```json
[
  {
    "id": 15,
    "name": "PSG",
    "country": "France"
  },
  {
    "id": 15,
    "name": "PSG",
    "country": "France"
  },
  {
    "id": 15,
    "name": "PSG",
    "country": "France"
  },
  {
    "id": 3,
    "name": "PSG",
    "country": "France"
  }
]
```

#### `exercices/corrections/5.3/index.js`

```javascript
import app from './app.js'

const PORT = 5300
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})
```

#### `exercices/corrections/5.3/package.json`

```json
{
  "name": "5.3",
  "version": "1.0.0",
  "description": "Champions league API",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "add:psg": "curl -X POST http://localhost:5300/teams -H \"Content-Type: application/json\" -d \"{\\\"id\\\":3,\\\"name\\\":\\\"PSG\\\",\\\"country\\\":\\\"France\\\"}\"",
    "find:psg": "curl http://localhost:5300/teams/3",
    "find:all": "curl http://localhost:5300/teams",
    "update:psg": "curl -X PUT http://localhost:5300/teams/3 -H \"Content-Type: application/json\" -d \"{\\\"name\\\":\\\"Paris Saint Germain\\\",\\\"country\\\":\\\"France\\\"}\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "cypress": "^15.16.0",
    "supertest": "^7.2.2",
    "vitest": "^4.1.7"
  }
}
```

#### `exercices/corrections/5.3/routes/games.js`

```javascript
import express from 'express'
const gamesRouter = express.Router()
gamesRouter.get('/', (req, res) => {
  const games = [{ id: "", home: "", away: "", score: "", date: ""}, { id: "", home: "", away: "", score: "", date: ""}]
  res.status(200).send(games)
})

gamesRouter.get('/', (req, res) => {
  const games = [{ id: "", home: "", away: "", score: "", date: ""}, { id: "", home: "", away: "", score: "", date: ""}]
  res.status(200).send(games)
})

gamesRouter.get('/search', (req, res) => {
 const games = [{ id: "", home: "", away: "", score: "", date: ""}, { id: "", home: "", away: "", score: "", date: ""}]
  const gamesByTeam = games.filter(t => t.home === req.query.team || t.away === req.query.team )
  res.status(200).send(gamesByTeam)
})

gamesRouter.post('/', (req, res) => {
  const game = { id: "", home: "", away: "", score: "", date: ""}
  res.status(201).send(game)
})

gamesRouter.put('/:id', (req, res) => {
  const game = {data: { id: "", home: "", away: "", score: "", date: ""}, updated: true}
  res.status(200).send(game)
})


export default gamesRouter
```

#### `exercices/corrections/5.3/routes/index.js`

```javascript
import express from 'express'
const indexRouter = express.Router()
indexRouter.get('/', (req, res) => {
    res.send('API documentation')
})
export default indexRouter
```

#### `exercices/corrections/5.3/routes/teams.js`

```javascript
import express from "express";
import { dirname, resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const teamsRouter = express.Router(); // Création du router
const filename = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "teams.json",
);
// Middleware pour vérifier que l'id est un entier
teamsRouter.param("id", (req, res, next) => {
  const id = req.params.id;
  if (!/\d+/.test(id)) {
    res.status(400).send({ success: false, message: `${id} must be a number` });
  }
  next();
});

teamsRouter.get("/", (req, res) => {
  readFile(filename)
    .then((content) => JSON.parse(content))
    .catch(() => []) // une promesse qui retourne un tableau vide
    .then((teams) => {
      res.status(200).json(teams);
    })
});

teamsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then((teams) => {
      const team = teams.find((t) => parseInt(t.id) === parseInt(id));
      if (team) {
        res.status(200).json(team);
      }
      res.status(404).json({ message: "Team not found", success: false });
    })
    .catch(() =>
      res
        .status(500)
        .json({ success: false, message: `Can't get a team with ID ${id}` }),
    );
});

teamsRouter.post("/", async (req, res) => {
  // Attention ici au niveau sécurité c'est light, il faudrait ajouter un middleware pour vérifier les données envoyées
  const team = req.body;
  const { id, name } = team;
  if (id && name) {
    let teams = []
    try {
      teams = await readFile(filename).then((content) => JSON.parse(content.toString()))
    } catch(error) {

    }
    teams.push(team);
    writeFile(filename, JSON.stringify(teams, null, 2))
      .then(() => {
        res.status(201).json({ message: "Team created", success: true });
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "Contact-us please support@", success: false });
      });
  } else {
    res
      .status(400)
      .json({
        message: "new team should have an id and a name",
        success: false,
      });
  }
});

teamsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {name, country} = req.body;

  if (!name || !country) {
    return res.status(400).json({
      message: "name and country required",
      success: false,
    });
  }

  try {
    const content = await readFile(filename);
    let teams = JSON.parse(content.toString());

    const index = teams.findIndex((t) => parseInt(t.id) === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        message: "Team not found",
        success: false,
      });
    }

    teams[index] = { ...teams[index], ...req.body, id: teams[index].id };

    await writeFile(filename, JSON.stringify(teams, null, 2));

    return res.status(200).json({
      message: "Team updated successfully",
      success: true,
      team: teams[index],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Contact-us please support@",
      success: false,
    });
  }
});
export default teamsRouter;

```

#### `exercices/corrections/5.3/tests/app.test.js`

```javascript
import { describe, it } from 'vitest'
import request from 'supertest'
import app from '../app.mjs'

// describe() décrit une suite de tests
describe("Testing route GET /teams/:id", () => {
  // it() ou son alias test() effectue le test avec une assertion
  it.todo("Should have 404 when id is not numeric");
  it.todo("Should have 200 when id is numeric")
});

describe("Testing route GET /teams", () => {
  it("Should have status 200", () => {
    // AAA
    // Arrange = preparer l'environnement nécessaire pour tester
    // Act = appeler vos fonctions ou réaliser l'action à tester
    // Assert = vérifications (vérifier que le résultat obtenu = résultat attendu)
    return request(app) // arrange
    .get('/teams') // act 
    .expect(200) // assert
  });
  it("Should have JSON data", () => {
    return request(app)
    .get('/teams')
    .expect('Content-Type', /json/)
  });

  it("Should have content a collection(array) of teams", async () => {
    const response = await request(app)
      .get('/teams')
      expect(Array.isArray(response.body)).toBe(true)
  });
});

describe.todo("Testing route POST /teams");

```

<!-- END AUTO-GENERATED -->