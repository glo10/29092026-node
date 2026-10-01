# Correction exercice 4.1 : gestionnaire de routes

## Lancement du projet

1. Copiez/collez et renommez .env.example en .env

2. Lancez l'application avec la commande suivante
```js
npm run dev
```
3. Lancez les requêtes qui interroge le serveur sur les différentes routes avec la commande suivante

```bash
./scripts/run.sh
```

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/4.1/

#### `exercices/corrections/4.1/data/users.json`

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]
```

#### `exercices/corrections/4.1/package.json`

```json
{
  "name": "4.1",
  "version": "1.0.0",
  "description": "Handle routes",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "add:user": "curl -X POST http://localhost:4100/users -H \"Content-Type: application/json\" -d \"{\\\"id\\\":15,\\\"username\\\":\\\"JD\\\",\\\"name\\\":\\\"John\\\"}\""

  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

#### `exercices/corrections/4.1/src/app.js`

```javascript
import { createServer } from "node:http";
import { constants } from "node:fs";
import { findAll, save } from "./repository/user-repository.js";
import { readFile, access } from "node:fs/promises";
import { USERS_FILENAME } from "./utils/utils.js";
import { render } from "./utils/render.js";
import { routes } from "./routes/user-route.js";
import { URL } from "node:url";

const app = createServer(async (req, res) => {
  let { method, url } = req;
  let status = 200;
  // GET /
  let body = {
    message: "Documentation",
    routes
  };

  // POST /users
  if (method === "POST" && url === "/users") {
    let users = JSON.parse(await readFile(USERS_FILENAME, { encoding: "utf-8" }));
    let data = "";
    // Réception des données envoyées par le client en écoutant l'événement data
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => {
      try {
        data = JSON.parse(data);
        users.push(data);
        save(USERS_FILENAME, users);
        status = 201;
        body = { message: "user created", data };
      } catch (err) {
        status = 404;
        body = { message: `Invalid JSON data ${data}` };
      } finally {
        render(res, status, JSON.stringify(body));
      }
    });
    // GET /users & GET /users?id=
  } else if (method === "GET" && url.startsWith("/users")) {
    const myURL = new URL(`http://${req.headers.host}/${req.url}`)
    const id =  myURL.searchParams.get('id')// récupération valeur paramètre ?id=
    let users = [];
    try {
      await access(USERS_FILENAME, constants.R_OK);
    } catch (error) {
      users = await findAll();
      save(USERS_FILENAME, users);
    } finally {
      users = JSON.parse(await readFile(USERS_FILENAME, { encoding: "utf-8" }));
    }

    if (id) {
      const user = users.find((u) => parseInt(u.id) === parseInt(id));
      if (user) body = user
    } else {
      body = users;
    }
    render(res, status, JSON.stringify(body));
  } else {
    render(res, status, JSON.stringify(body));
  }
});

export default app;

```

#### `exercices/corrections/4.1/src/repository/user-repository.js`

```javascript
import { writeFileSync } from 'node:fs'

export async function findAll(url = "https://jsonplaceholder.typicode.com/users") {
  return fetch(url)
  .then(res => res.json())
  .catch(error => {
    console.error(`Error get users from ${url}`, error)
  })
}

export function save(filename, users) {
  writeFileSync(filename, JSON.stringify(users, null, 2), { encoding: 'utf8', flag: "w+", mode: 0o666}, (error) => {
    if(error) console.error(`Error write users.json ${filename}`, error)
    else console.log('save OK')
  })
}
```

#### `exercices/corrections/4.1/src/routes/user-route.js`

```javascript
const PORT = process.env.PORT
export const routes = [
  {
    route: "GET /users",
    description: "User list",
    path: `http://localhost:${PORT}/users`,
  },
  {
    route: " GET /users/?id=",
    description: "One user",
    schema: {
      id: "number",
    },
    path: `http://localhost:${PORT}/users/?id=`,
  },
  {
    route: "POST /users",
    description: "Add a new user",
    schema: {
      type: "application/json",
      body: {
        id: "number required",
        name: "string required",
        username: "string required",
        email: "string",
        address: {
          street: "string",
          suite: "string",
          city: "string",
          zipcode: "string",
          geo: {
            lat: "number",
            lng: "number",
          },
        },
      },
    },
  },
];

```

#### `exercices/corrections/4.1/src/server.js`

```javascript
import app from './app.js'

const { PORT } = process.env
app.listen(PORT, () => {
  console.info(`App running on http://localhost:${PORT}`)
})
```

#### `exercices/corrections/4.1/src/utils/render.js`

```javascript
export const render = (
  response,
  status,
  body,
  contentType = { "content-type": "application/json" },
) => {
  response.writeHead(status, contentType);
  response.end(body);
};

```

#### `exercices/corrections/4.1/src/utils/utils.js`

```javascript
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const USERS_FILENAME = join(ROOT_PATH,  'data', 'users.json')
process.loadEnvFile(join(ROOT_PATH, '.env'))
```

<!-- END AUTO-GENERATED -->