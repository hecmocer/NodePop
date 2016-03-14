"use strict";

// Conectamos con el driver
var conn = require('../lib/connect_mongoose');
var mongoose = require('mongoose');

// Creamos el esquema de usuarios
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    pwd: String
});

// Registramos el schema en mongoose
var User = mongoose.model('User', userSchema);

// Exportamos el modelo
module.exports = User;