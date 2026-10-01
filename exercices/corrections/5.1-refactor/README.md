# Correction exercice 5.1 : express

## Lancement

1. Copiez/collez/renommez .env.example en .env

2. Démarrez l'application
```
npm install
npm run dev
```

---

## Fichiers sources

<!-- AUTO-GENERATED -->

### exercices/corrections/5.1

#### `exercices/corrections/5.1/app.js`

```javascript
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// pour accéder depuis le client aux images qui se trouvent dans
// le dossier /public/images => http://localhost:PORT/images
/**
 * avec commonJS
 * Il y a 2 constiables qui donne le chemin absolue du dossier racine et du fichier en cours
 *  __dirname
 *  __filename
 * Parallèle avec EcmaScript
 * __dirname => import.meta.dirname
 * __filename => import.meta.filename
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

#### `exercices/corrections/5.1/package.json`

```json
{
  "name": "5.1",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "SET DEBUG=5.1:* & npm start",
    "dev:port": "SET DEBUG=5.1:* & SET PORT=8055 & npm start",
    "dev:env": "node --env-file=.env --watch ./bin/www",
    "start": "node --watch ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "^6.0.1",
    "express": "^4.22.2",
    "http-errors": "~1.6.3",
    "morgan": "^1.10.1"
  }
}

```

#### `exercices/corrections/5.1/public/stylesheets/style.css`

```css
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}

```

#### `exercices/corrections/5.1/routes/index.js`

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

```

#### `exercices/corrections/5.1/routes/users.js`

```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      res.render("users/list", { users });
    })
    .catch(() =>
      /**
       * On peut ici juste déclencher une erreur avec throw new Error('Aucun utilistateur')
       * Cet erreur sera interceptée par Express qui va retourner au client la page d'erreur
       * cf. implémentation suivante router.get(':login')
       */
      res.render("error", { message: "Aucun utilisateur", status: 500 }),
    );
});

// match avec GET /users/:login avec login dynamique
router.get("/:login", async (req, res) => {
  const login = req.params.login;
  const user = await fetch(`https://api.github.com/users/${login}`).then(
    (data) => data.json(),
  );
  if(user) {
    res.render("users/single", { user });
    return
  } else {
    throw new Error('login incorrect')
  }
});

module.exports = router;

```

<!-- END AUTO-GENERATED -->