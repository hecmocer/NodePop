"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Autenticación con basic-auth
var basic_auth = require('./lib/basic_auth');

// Inicializamos los modelos de mongoose
// Se puede acceder a ellos mediante mongoose.model('<MODELO>')
require('./models/user_model');
require('./models/ad_model');

// Requerimos las rutas
var index = require('./routes/api/v1/index');
var ads = require('./routes/api/v1/ads');
var users = require('./routes/api/v1/users');
var tags = require('./routes/api/v1/tags');

var app = express();

// Rutas que requieren de autenticación
app.use('/api/v1/ads', basic_auth());
app.use('/api/v1/users', basic_auth());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Hacemos que las rutas para los routers sean las especificadas
app.use('/api/v1/', index);
app.use('/api/v1/ads', ads);
app.use('/api/v1/users', users);
app.use('/api/v1/tags', tags);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
