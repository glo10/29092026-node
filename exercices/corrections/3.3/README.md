# Correction exercice 3.3 : serveur web avec *JSON*

## Lancement du projet

```js
npm run dev
```

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/3.3

#### `exercices/corrections/3.3/package.json`

```json
{
  "name": "3.3",
  "version": "1.0.0",
  "description": "Exercise Web server with JSON",
  "main": "server.mjs",
  "scripts": {
    "start": "node server.mjs",
    "dev": "node --watch server.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

#### `exercices/corrections/3.3/server.mjs`

```javascript
import { createServer } from "node:http";

const PORT = 3300;
const contentType = { "Content-Type": "application/json; charset=utf-8" };

createServer((req, res) => {
  const { url } = req;
  const msg = url === "/" ? { message: "success" } : { message: "not found" };
  const status = url === "/" ? 200 : 404;
  res.writeHead(status, contentType);
  res.end(JSON.stringify(msg));
}).listen(PORT, () => {
  console.info(`Running on http://localhost:${PORT}`);
});

```

<!-- END AUTO-GENERATED -->