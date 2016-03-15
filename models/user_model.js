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

// Creamos función que devuelva el usuario encontrado por nombre
userSchema.statics.findCredentials = function(qname, qpwd, cb) {

    // Preparamos y ejecutamos la query llamando al callback
    var query = User.find({name: qname, pwd: qpwd}, function(err, results){
        if(err || !results.length){
            cb(true);
        }
        else{
            cb();
        }
    });
};

// Registramos el schema en mongoose
var User = mongoose.model('User', userSchema);

// Exportamos el modelo
module.exports = User;