# Correction exercice 6.1 : MongoDB et Mongoose

## Lancement

1. `npm install`

2. Copiez/collez/renommez *.env.example* en *.env*

3. Lancez les services pour Docker ou votre serveur MongoDB ou le cluster distant [cf. indications mise en place serveur MongoDB](../../6.1.md)
- Pour docker
```bash
docker compose up --build -d
```
- Pour le cloud (cluster depuis MongoDB Cloud), récupérez l'URL commançant par mongo:srv+ depuis votre espace
- Pour MongoDB Community Edition, lancez juste le logiciel

4. Lancez l'application
```bash
npm run dev
```

## Intérrogez l'API

- Soit depuis un client tels que Postman ou ThunderClient
- Soit depuis CURL
```bash
# Récupérez toutes les équipes
curl http://localhost:6100/teams

# Récupérez une équipe
curl http://localhost:6100/teams/psg

# Ajoutez une équipe
curl -X POST http://localhost:6100/teams \
  -H "Content-Type: application/json" \
  -d '{ "name":"psg", "country": "france" }'
```
- Soit depuis les scripts dans le package.json
```bash
npm run add:psg
npm run find:psg
npm run find:all
npm run update:psg
```

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/6.1

#### `exercices/corrections/6.1/app.js`

```javascript
import express from "express";
import indexRouter from "./routes/index.js";
import teamsRouter from "./routes/teams.js";
import { connect } from "./models/connect.js";
process.loadEnvFile();

console.log("ENV", process.env.NODE_ENV, process.env.NODE_ENV !== "test");
// Se connecter uniquement en dehors de l'environnement de test car ce dernier se connecter sur une autre BDD dédiée aux tests
if (process.env.NODE_ENV.trim !== "test") {
  connect();
}
const app = express();
app.use(express.json());
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});
app.use("/", indexRouter);
app.use("/teams", teamsRouter);

export default app;

```

#### `exercices/corrections/6.1/controllers/index-controller.js`

```javascript
export const getDocumentation = (_, res) => {
  const { PORT } = process.env;
  const documentation = [
    {
      route: "GET /teams",
      description: "Teams list",
      path: `http://localhost:${PORT}/teams`,
    },
    {
      route: " GET /teams/:id",
      description: "One team",
      schema: {
        id: "String (MongoDB ID)",
      },
      path: `http://localhost:${PORT}/teams/6abfdb4ef60b977a669c856d`,
    },
    {
      route: "POST /teams",
      description: "Add a new team",
      schema: {
        type: "application/json",
        body: {
          name: "string",
          country: "string",
        },
      },
    },
    //...
  ];
  res.json({ routes: documentation, version: "2.1.0" });
};
```

#### `exercices/corrections/6.1/controllers/team-controller.js`

```javascript
import GenericRepository from "../repositories/generic-repository.js";
import TeamModel from "../models/schemas/team-model.js";

const repo = new GenericRepository(TeamModel);

export const findAll = async (_, res) => {// _ lorsqu'un paramètre n'est pas exploité, ici req
  repo
    .findAll()
    .then((teams) => {
      res.status(200).json({ success: true, data: teams});
    })
    .catch(() => {
      res.status(500).json({ success: false, message: "Can't get teams" });
    });
};

export const findOne = (req, res) => {
  const { id } = req.params;
  // Pour récupérer aussi les joueurs de l'équipe repo.findOne(name).populate('players').then()
  repo
    .findOne({ _id : id })
    .then((team) => {
      if (team && team._id) {
        res.status(200).json({ data: team, success: true });
      } else {
        res
          .status(404)
          .json({ message: team.message ?? "Team not found", success: false });
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: `Internal server error`,
      });
    });
};

export const save = async (req, res) => {
  let { team } = req;
  // avec les players team.players = [player1._id, player2._id, ...]
  const data = await repo.save(team);
  if (data._id)
    res.status(201).json({ message: "Team created", success: true, team });
  else {
    res.status(500).json({
      message:
        "Failed to insert new team, try again or contact-us please +33612345678",
      success: false,
    });
  }
};

```

#### `exercices/corrections/6.1/index.js`

```javascript
import app from './app.js'
process.loadEnvFile()
const PORT = process.env.PORT || 6100
app.listen(PORT, () => {
  console.info(`API on http://localhost:${PORT}`)
})
```

#### `exercices/corrections/6.1/middlewares/team-middleware.js`

```javascript
export const validateTeam = (req, res, next) => {
  const { name, country } = req.body;
  // TODO mutualiser vérifs name et country dont le code est similaire
  if (!name || typeof name !== "string" || name.trim() === "" || name.length < 3) {
    return res.status(400).json({
      message: "name must have a value and at least 3 chars",
      success: false,
    });
  }

  if (!country || typeof country !== "string" || country.trim() === "") {
    return res.status(400).json({
      message: "country must have a value",
      success: false,
    });
  }

  req.body.name = name.trim();
  req.body.country = country.trim();
  req.team = {...req.team, name, country }

  next();
};


// Middleware pour vérifier que l'_id de mongoDB
export const validateMongoId = (req, res, next) => {
  const id = req.params.id;
  req.team = {...req.team, _id : id }
  if (!/^6+.{23}/.test(id)) { // ou id.length === 24 && id.startsWith('6')
    res.status(400).send({ success: false, message: `${id} is wrong must have 24 chars` });
  }
  next();
}
```

#### `exercices/corrections/6.1/models/connect.js`

```javascript
import { mongoose } from "mongoose";
export async function connect(url = null, options = {}) {
  const state = mongoose.connection.readyState;
  if (state != 1) { // not connected
    return mongoose
      .connect(url || process.env.DB_LOCAL, options)
      .then(() => {
        console.info('connected OK')
      }) // 0 => disconnected, 1 => connected, 2 => Connecting, 3 => disconnecting
      .catch((err) => console.error("DB KO", err))
      .finally(() => {
        return mongoose.connection.readyState
      })
  }

  return state;
}
```

#### `exercices/corrections/6.1/models/schemas/game-model.js`

```javascript
import { Schema, model } from "mongoose";

export default model("Game",  Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  score: { type: String, required: true },
  at: { type: Date, required: true },
}));

```

#### `exercices/corrections/6.1/models/schemas/player-model.js`

```javascript
import { Schema, model } from "mongoose";

export default model("Player", Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
}));

```

#### `exercices/corrections/6.1/models/schemas/team-model.js`

```javascript
import { Schema, model } from "mongoose";
/**
 * @see vous pouvez mettre en place des middlewares https://mongoosejs.com/docs/middleware.html
 * schema.post('save', cb) // avant la sauvegarde , cb = callback function
 * schema.pre('save, cb)  // après la sauvegarde
*/
export default model("Team", Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  // players: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Player' // Player = nom du modèle qu'on a définit dans models/player.js
  //   }
  // ]
}));
```

#### `exercices/corrections/6.1/package.json`

```json
{
  "name": "6.1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node --env-file=.env index.js",
    "dev": "node --watch --env-file=.env index.js",
    "add:psg": "curl -X POST http://localhost:6100/teams -H \"Content-Type: application/json\" -d \"{\\\"name\\\":\\\"PSG\\\",\\\"country\\\":\\\"France\\\"}\"",
    "find:all": "curl http://localhost:6100/teams"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.10.3"
  }
}
```

#### `exercices/corrections/6.1/repositories/generic-repository.js`

```javascript
export default class GenericRepository {
  constructor(model) {
    this.model = model
  }

  async save(entity) {
    return this.model.create(entity)
    .catch((err) => err)
  }

  async findAll() {
    return this.model.find()
    .then((results) =>{
      return results
    })
    .catch((err) => err)
  }

  async findOne(objFilter) {
    return this.model.findOne(objFilter)
    .then((entity) => {
      if(entity && entity._id) return entity
      return { message : `entity ${_id} does not exist` }
    })
    .catch((err) => err)
  }
}
```

#### `exercices/corrections/6.1/routes/games.js`

```javascript
/**
 * Si vous n'avez pas réussi cet exercice
 * Faites la correction pour les matchs par vous-même
 * en vous appuyant sur la correction sur les équipes (teams)
 */
```

#### `exercices/corrections/6.1/routes/index.js`

```javascript
import express from "express";
const indexRouter = express.Router();
import { getDocumentation } from "../controllers/index-controller.js";
indexRouter.get("/", getDocumentation);
export default indexRouter;

```

#### `exercices/corrections/6.1/routes/teams.js`

```javascript
import express from "express";
import { validateTeam, validateMongoId } from "../middlewares/team-middleware.js";
import { findAll, findOne, save } from "../controllers/team-controller.js";
const teamsRouter = express.Router();

teamsRouter.get("/", findAll);
teamsRouter.get("/:id", validateMongoId, findOne);
teamsRouter.post("/", validateTeam, save);
export default teamsRouter;

```

<!-- END AUTO-GENERATED -->