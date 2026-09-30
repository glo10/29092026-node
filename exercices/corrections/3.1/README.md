# Correction exercice 3.1 : lecture/écriture

## Lancement du projet

##### Sans le Bonus

```javascript
npm run start
```
##### Avec le Bonus

```javascript
npm run bonus
```

#### Transformation callback/promise vis-versa

[cf. la demo avec callbackify](../../../demos/08-util/promise-to-cb.js)
[cf. la demo avec promisify](../../../demos/08-util/cb-to-promise.js)

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/3.1/

#### `exercices/corrections/3.1/bonus.mjs`

```javascript
import { writeFile, readFile } from "node:fs/promises";
import { HTML } from "./data.mjs";
import { createServer } from "node:http";
const filename = "index.html";
const PORT = 3100;
await writeFile(filename, HTML, { encoding: "utf-8" })
  .then(() => {
    console.info(`Ecriture du fichier ${filename} OK`);
  })
  .catch((err) => console.error("error writeFile", err));

createServer(async (req, res) => {
  const content = await readFile(filename, { encoding: "utf-8" })
    .then((data) => data)
    .catch(() => "Impossible de lire le fichier");
  res.end(content);
}).listen(PORT, () => {
  console.info(`Running on http://localhost:${PORT}`);
});

```

#### `exercices/corrections/3.1/data.mjs`

```javascript
export const HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lecture/écriture avec Node</title>
</head>
<body>
  <h1>Module fs</h1>
</body>
</html>
`;
```

#### `exercices/corrections/3.1/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lecture/écriture avec Node</title>
</head>
<body>
  <h1>Module fs</h1>
</body>
</html>
```

#### `exercices/corrections/3.1/index.mjs`

```javascript
import { readFile } from "node:fs";
import { writeFile } from "node:fs/promises";
import { HTML } from "./data.mjs";

await writeFile("index.html", HTML)
  .then(() => console.log("écriture OK"))
  .catch((err) => console.error("Can't write index.html", err));

readFile("index.html", { encoding: "utf-8" }, (err, data) => {
  if (!err) console.info("index.html", data);
  else console.error("can't read index.html", err);
});

```

#### `exercices/corrections/3.1/package.json`

```json
{
  "name": "3.1",
  "version": "1.0.0",
  "description": "Exercise 3.1 read and write file",
  "main": "index.mjs",
  "scripts": {
    "start": "node --watch index.mjs",
    "bonus": "node --watch bonus.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

<!-- END AUTO-GENERATED -->