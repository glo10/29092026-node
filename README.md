# Formation Node JS

---

## Google Forms

[Validation des acquis 1/2 journée](https://docs.google.com/forms/d/e/1FAIpQLScokqKsGeLXY45A3SQe7fHS8XagsNQ1spNaw52xT2Nrvv94Ng/viewform)

## Erreur de sécurité sur Windows

Exécutez la commande suivante
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```
---

## Exercices

- [Sujets des exercices](./exercices/)
- [Corrections des exercices](./exercices/corrections/)

---

## Démos

- [Démos du cours](./demos/)

---

## Installation

1. [Node](https://nodejs.org/en/download)
2. [Visual Studio Code](https://code.visualstudio.com/download)
3. Extensions VSCODE à installer : 
    - JavaScript (ES6) code snippets
    - Node-snippets de Chris Noring
    - Node Extension Pack de Swellaby
    - MongoDB for VS Code de MongoDB

##### 4. pour MongoDb 2 options

###### Option 1 : Accès distant depuis un cluster MongoDB

- [Créez un compte sur MongoDB](https://account.mongodb.com/account/register) et de se laisser guider pour créer un cluster et récupérer les identifiants d'accès

###### Option 2  : Accès local depuis un conteneur MongoDB (serveur)

- [Suivez ce guide](./config/mongodb/README.md)

---

## Documentations

### Globale

- [Node officiel](https://nodejs.org/docs/latest/api/)
- [Node via devdocs](https://devdocs.io/node/)
- [MongoDB](https://www.mongodb.com/docs/)

### Modules internes Node

- [process](https://nodejs.org/docs/latest/api/process.html)
- [events](https://nodejs.org/docs/latest/api/events.html)
- [fs](https://nodejs.org/docs/latest/api/fs.html)
- [http](https://nodejs.org/docs/latest/api/http.html)
- [path](https://nodejs.org/docs/latest/api/path.html)
- [url](https://nodejs.org/docs/latest/api/url.html)
- [assert](https://nodejs.org/docs/latest/api/assert.html)

### Express

- [Installation Express](https://expressjs.com/en/starter/installing.html)
- [Express routage](https://expressjs.com/fr/guide/routing.html)
- [Express écriture middleware](https://expressjs.com/fr/guide/writing-middleware.html)
- [Express utilisation middleware](https://expressjs.com/fr/guide/using-middleware.html)
- [Express moteur de template](https://expressjs.com/fr/guide/using-template-engines.html)

### MongoDB

- [Documentation avec l'utilisation de Node](https://www.mongodb.com/docs/languages/javascript/)
- [Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

### Module SQLite avec Node

- Depuis Node ***V23.1.0***, il y a la dépendance [*node:sqlite*](https://nodejs.org/api/sqlite.html) interne
- Sinon l'utilisation du module externe [sqlite3](https://www.npmjs.com/package/sqlite3)

### Module MySQL avec Node

- [Documentation](https://sidorares.github.io/node-mysql2/docs)

### Module PostgreSQL avec Node

- [Module pg pour se connecter à un serveur de base de données PostgreSQL](https://www.npmjs.com/package/pg)

### Socket IO

- [Socket.io](https://socket.io/docs/v4/tutorial/introduction)

### Testing

- [node:test](https://nodejs.org/api/test.html#test-runner) et [node:assert](https://nodejs.org/api/assert.html) : librairies embarquées pour les tests unitaires
- [Vitest](https://vitest.dev/guide/)  : tests unitaires et d'intégration
- [Jest](https://jestjs.io/docs/getting-started) : tests unitaires et d'intégration
- [Supertest](https://www.npmjs.com/package/supertest) : tests d'intégration
- [Cypress](https://www.cypress.io/)  : tests fonctionnels (E2E)

