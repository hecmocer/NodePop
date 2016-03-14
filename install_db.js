"use strict";

// Importa la libreria fs de node
var fs = require('fs');

var mongoose = require('mongoose');
var User = require('./models/user_model');
var Ad = require('./models/ad_model');

// Borramos tablas previas para restaurar la base de datos
// Borramos usuarios
User.remove({}, function(err) {
    if(err){
        console.log('Error when trying to delete users', err);
    }
});

// Borramos anuncios
Ad.remove({}, function(err) {
    if(err){
        console.log('Error when trying to delete ads', err);
    }
});

console.log('Se han borrado los anuncios y usuarios previos');

// Leer fichero users e insertar usuarios
fs.readFile('./data/users.json', {encoding: 'utf8'}, function(err, data) {
    if(err){
        console.log('Ha habido un error al leer el fichero users: ', err);
    }
    else{
        var packageData = JSON.parse(data);

        for(let i = 0; i < packageData.users.length; i++){

            var new_user = new User(packageData.users[i]);
            new_user.save(function(err, new_row){
                if(err){
                    console.log("No se pudo insertar el usuario numero ", i);
                }else{
                    console.log("Se ha insertado el usuario numero ", i);
                }
            });
        }
    }
});

// Leer fichero ads e insertar anuncios
fs.readFile('./data/ads.json', {encoding: 'utf8'}, function(err, data) {
    if(err){
        console.log('Ha habido un error al leer el fichero ads: ', err);
    }
    else{
        var packageData = JSON.parse(data);

        for(let i = 0; i < packageData.ads.length; i++){

            var new_ad = new Ad(packageData.ads[i]);
            new_ad.save(function(err, new_row){
                if(err){
                    console.log("No se pudo insertar el anuncio numero ", i);
                }else{
                    console.log("Se ha insertado el anuncio numero ", i);
                }
            });
        }
    }
});