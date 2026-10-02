# Correction exercice 3.4 : serveur web avec du *HTML*

## Lancement

1. Copier/coller et renommer .env.example en .env

2. Installer les dépendances
```bash
npm i
```

3. Générer le certificat SSL
```bash
npm run ssl
```

4. Lancer le serveur
```bash
npm run dev
```

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/3.4

#### `exercices/corrections/3.4/eslint.config.js`

```javascript
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
]);

```

#### `exercices/corrections/3.4/package.json`

```json
{
  "name": "3.4",
  "version": "1.0.0",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "ssl": "node src/utils/generate-ssl.js",
    "dev": "node --watch src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@eslint/js": "^9.39.5",
    "eslint": "^9.39.5",
    "globals": "^17.12.0"
  }
}

```

#### `exercices/corrections/3.4/public/css/main.css`

```css
body {
  background-color: lightgreen;
}

h1, p {
  text-align: center;
}

img {
  display: block;
  margin: auto;
}
```

#### `exercices/corrections/3.4/public/html/404.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <h1>404 NOT FOUND</h1>
    <img src="/img/dog.webp" alt="Dog">
</body>
</html>
```

#### `exercices/corrections/3.4/public/html/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <h1>Bienvenue</h1>
    <img src="/img/coding.jpg" alt="Coding image">
</body>
</html>
```

#### `exercices/corrections/3.4/src/index.js`

```javascript
import { readFile } from "node:fs";
import { createServer } from "node:https";
import { PUBLIC_PATH, ENV_FILE } from "./utils/paths.js";
import { join } from "node:path";
import OPTIONS from "./utils/options.js";
process.loadEnvFile(ENV_FILE);
const { PORT } = process.env;

createServer(OPTIONS, (req, res) => {
  const { url } = req;
  const filename =
    url === "/" || url === "/index.html" ? "index.html" : "404.html";
  if (url.startsWith("/css/")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    return readFile(join(PUBLIC_PATH, url), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.end("Erreur serveur rendu css", err);
      }
      res.end(data);
    });
  }

  if (url.startsWith("/img/")) {
    /**
     * const ext = path.extname(imgPath).toLowerCase();
     * const MIME_TYPES = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png'
      };
      res.setHeader('Content-Type'), MIMES_TYPES[ext])
     */ 
    res.setHeader("Content-Type", "image/jpeg");
    return readFile(join(PUBLIC_PATH, url), (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end("Image introuvable");
      }
      res.end(data);
    });
  }

  res.statusCode = filename.endsWith("index.html") ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  return readFile(join(PUBLIC_PATH, 'html', filename), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      console.error("err", err);
      return res.end("Erreur serveur");
    }
    res.end(data);
  });
}).listen(PORT, () => {
  console.info(`Running On https://localhost:${PORT}`);
});

```

#### `exercices/corrections/3.4/src/utils/generate-ssl.js`

```javascript

import { exec } from 'node:child_process'
import { CONFIG_PATH } from './paths.js';
const cmd = `openssl req -x509 -newkey rsa:2048 -keyout ${CONFIG_PATH}/key.pem -out ${CONFIG_PATH}/cert.crt -days 90 -nodes -subj "/CN=localhost"`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  console.info('Certificat et clé générés avec succès !');
});
```

#### `exercices/corrections/3.4/src/utils/options.js`

```javascript
import { KEY_FILE, CERT_FILE } from "./paths.js";
import { readFileSync } from "node:fs";
export default {
  key: readFileSync(KEY_FILE),
  cert: readFileSync(CERT_FILE)
};
```

#### `exercices/corrections/3.4/src/utils/paths.js`

```javascript
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const PUBLIC_PATH = resolve(__dirname, "..", "..", "public");
export const CONFIG_PATH = resolve(__dirname, "..", "..", "config");
export const ENV_FILE = resolve(__dirname, "..", "..", ".env");
export const KEY_FILE = join(CONFIG_PATH, "key.pem");
export const CERT_FILE = join(CONFIG_PATH, "cert.crt");

```

<!-- END AUTO-GENERATED -->