"use strict";

// Importamos express, router y el modelo de anuncios de mongoose
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

// Para la petición GET
router.get('/', function(req, res, next) {

    // Variable donde almacenaremos aquellos tags existentes
    var foundTags = [];

    // Reconstruimos la url
    var url = req.protocol + '://' + req.get('host') + '/api/v1/ads?';

    // Funcion auxiliar para insertar tags no repetidos
    function insertarSiNoExiste(valor){
        var found = false;

        // Para cada tag, buscamos a ver si es igual a valor
        for(let i = 0; i < foundTags.length && !found; i++){
            if(foundTags[i] === valor){
                found = true;
            }
        }
        // Si no se ha encontrado previamente, lo insertamos
        if(!found){
            foundTags.push(valor);
        }
    }

    // Llamamos a la función que busca todos los anuncios
    Ad.listAll( function(err, rows){
        if(err){
            res.json({ result: false, err: err});
        }
        else{

            // Para cada anuncio
            for(let i = 0 ; i < rows.length; i++){
                // Para cada elemento tag dentro del array de tags del anuncio
                for(let j = 0; j < rows[i].tags.length; j++){
                    insertarSiNoExiste(rows[i].tags[j]);
                }
            }

            // Variable donde almacenaremos los links a la búsqueda de tags
            var linksArray = [];

            // Para cada tag encontrado, manufacturamos su link
            for(let i = 0; i < foundTags.length; i++){
                linksArray[i] = url + 'tags=' + foundTags[i];
            }

            // Respondemos el objeto json con tags y links
            res.json( { tags: foundTags, links: linksArray } );
        }
    });

});

// Para la petición POST
router.post('/', function(req, res){

    // Creamos un nuevo usuario con los datos obtenidos en el body
    var user = new User(req.body);

    // Guardamos el usuario en la base de datos
    user.save(function(err, newRow){
        if(err){
            res.json( { result: false, error: err});
        }
        else{
            res.json( { result: true, insertedElement: newRow});
        }
    });
});

// Exportamos el router
module.exports = router;