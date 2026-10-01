var createError = require('http-errors');
var express = require('express');
var path = require('node:path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // router pour l'accueil => définition des routes pour l'accueil
var usersRouter = require('./routes/users'); // router pour l'entité user => plusieurs routes (une route match avec un chemin et méthode HTTP)
const postRouter = require('./routes/post')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // déf. dossier racines pour les templates
app.set('view engine', 'ejs'); // définition du moteur de template utilisé par l'app

// Les middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// L'association d'une racine de route avec le router
app.use('/', indexRouter);
app.use('/users', usersRouter); // Toutes les routes associées au router user commençent par /users
app.use('/posts', postRouter)
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
