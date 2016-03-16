"use strict";

// Importamos el módulo de autenticación y el modelo de usuarios
var basicAuth = require('basic-auth');
var User = require('../models/user_model');

var fn = function(){
    return function(req, res, next){
        var user = basicAuth(req);

        // Si se envia algun usuario
        if (user){
            // Manejamos los valores por defecto de usuario y contraseña
            user.name = user.name || '';
            user.pass = user.pass || '';

            // Buscamos a ver si los credenciales concuerdan
            User.findCredentials(user.name, user.pass, function(err){
                // Si no concuerdan
                if(err){
                    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                    res.send(401);
                }
                // Si concuerdan
                else{
                    next();
                }
            });
        }
        else{
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
        }
    }
}

// Exportamos la función de autenticación
module.exports = fn;