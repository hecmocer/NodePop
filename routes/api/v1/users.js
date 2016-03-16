"use strict";

// Importamos Express, modulo router, mongoose y el modelo de anuncios
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Para la petición GET
router.get('/', function(req, res, next) {
    res.send('¿Creías que te íbamos a dejar ver el listado de usuarios y sus contraseñas?');
});

// Para la petición POST
router.post('/', function(req, res){
    // Creamos un objeto con lo que nos pasen en el cuerpo de la petición
    var user = new User(req.body);

    // Buscamos en la base de datos un usuario con el mismo nombre para evitar insertar usuarios duplicados
    var query = User.find({ name: req.body.name }, function(err, rows){
        if(err){
            res.json( { result: false, error: err});
        }
        // Si no se ha encontrado otro usuario
        else if(rows.length === 0){
            // Guardamos el nuevo usuario
            user.save(function(err, newRow){
                if(err){
                    res.json( { result: false, error: err});
                }
                else{
                    res.json( { result: true, insertedElement: newRow});
                }
            });
        }
        // Si se ha encontrado un usuario con el mismo nombre
        else{
            res.json( { result: false, error: 'el usuario ya se encuentra en la base de datos'});
        }
    });
});

// Exportamos el router
module.exports = router;
