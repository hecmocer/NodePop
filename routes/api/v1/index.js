"use strict";

// Importamos express y el módulo de routers
var express = require('express');
var router = express.Router();

// Para el método GET
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Exportamos el router
module.exports = router;
