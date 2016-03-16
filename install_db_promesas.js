"use strict";

// Importa la libreria fs de node
var fs = require('fs');

// Importamos mongoose y los modelos de usuario y anuncio
var mongoose = require('mongoose');
var User = require('./models/user_model');
var Ad = require('./models/ad_model');

// Función que devuelve promesa que borra usuarios
function PdeleteUsers(){
    return new Promise( function(resolve, reject){
        // Borramos usuarios
        User.remove({}, function(err) {
            if(err){
                console.log('Error when trying to delete users', err);
                reject(err);
            }
            else{
                console.log('Se han borrado los usuarios');
                resolve();
            }
        });
    });
}

// Función que devuelve promesa que borra anuncios
function PdeleteAds(){
    return new Promise( function(resolve, reject){
        // Borramos anuncios
        Ad.remove({}, function(err) {
            if(err){
                console.log('Error when trying to delete ads', err);
                reject(err);
            }
            else{
                console.log('Se han borrado los anuncios');
                resolve();
            }
        });
    });
}

// Función que devuelve promesa que inserta usuarios
function PinsertUsers(){
    return new Promise( function(resolve, reject){
        // Leer fichero users e insertar usuarios
        fs.readFile('./data/users.json', {encoding: 'utf8'}, function(err, data) {
            if(err){
                console.log('Ha habido un error al leer el fichero users: ', err);
                reject(err);
            }
            else{
                var packageData = JSON.parse(data);

                // Inserta usuario a usuario y resuelve en el callback
                insertSingleUser(packageData, 0, function(){
                    console.log('Se han insertado los usuarios');
                    resolve();
                });
            }
        });
    });
}

// Inserta usuario a usuario y una vez acabado llama al callback (resolverá la promesa)
function insertSingleUser(packageData, i, cb){
    // Condición de parada
    if(i < packageData.users.length){
        var new_user = new User(packageData.users[i]);

        new_user.save(function(err, new_row){
            if(err){
                console.log("No se pudo insertar el usuario numero ", i);
            }else{
                console.log("Insertado USUARIO numero ", i);
                // Llamada a insertar siguiente usuario
                insertSingleUser(packageData, i+1, cb)
            }
        });
    }
    else{
        cb();
    }
}

// Función que devuelve promesa que inserta anuncios
function PinsertAds(){
    return new Promise( function(resolve, reject){
        // Leer fichero ads e insertar anuncios
        fs.readFile('./data/ads.json', {encoding: 'utf8'}, function(err, data) {
            if(err){
                console.log('Ha habido un error al leer el fichero ads: ', err);
                reject(err);
            }
            else{
                var packageData = JSON.parse(data);

                // Inserta usuario a usuario y resuelve en el callback
                insertSingleAd(packageData, 0, function(){
                    console.log('Se han insertado los anuncios');
                    resolve();
                });
            }
        });
    });
}

// Inserta anuncio a anuncio y una vez acabado llama al callback
function insertSingleAd(packageData, i, cb){
    // Condición de parada
    if(i < packageData.ads.length){
        var new_ad = new Ad(packageData.ads[i]);

        new_ad.save(function(err, new_row){
            if(err){
                console.log("No se pudo insertar el anuncio numero ", i);
            }else{
                console.log("Insertado anuncio numero ", i);

                // Inserta anuncio a anuncio y resuelve en el callback
                insertSingleAd(packageData, i+1, cb);
            }
        });
    } else{
        cb();
    }
}

// Cadena de cadenas que primero borra usuarios y anuncios y luego los reinserta. Por último imprime mensaje por pantalla y termina el proceso
PdeleteUsers().then(PdeleteAds).then(PinsertUsers).then(PinsertAds).then(function(){
    process.exit();
}).catch(function(err){
    console.error('Ha habido un problema en la ejecución');
    process.exit(1);
})