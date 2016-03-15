"use strict";

// Importa la libreria fs de node
var fs = require('fs');

var mongoose = require('mongoose');
var User = require('./models/user_model');
var Ad = require('./models/ad_model');


var PdeleteUsers = new Promise( function(resolve, reject){
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


var PdeleteAds = new Promise( function(resolve, reject){
    // Borramos anuncios
    Ad.remove({}, function(err) {
        if(err){
            console.log('Error when trying to delete ads', err);
            reject(err);
        }
        else{
            console.log('Se han borrado los anuncios');
            resolve()
        }
    });

});

var PinsertUsers = new Promise( function(resolve, reject){
    // Leer fichero users e insertar usuarios
    fs.readFile('./data/users.json', {encoding: 'utf8'}, function(err, data) {
        if(err){
            console.log('Ha habido un error al leer el fichero users: ', err);
            reject(err);
        }
        else{
            var packageData = JSON.parse(data);

            for(let i = 0; i < packageData.users.length; i++){

                var new_user = new User(packageData.users[i]);
                new_user.save(function(err, new_row){
                    if(err){
                        console.log("No se pudo insertar el usuario numero ", i);
                    }else{
                        console.log("Insertado USUARIO numero ", i);
                    }
                });
            }
            console.log('Se han insertado los usuarios');
            resolve();
        }
    });
});

var PinsertAds = new Promise( function(resolve, reject){
    // Leer fichero ads e insertar anuncios
    fs.readFile('./data/ads.json', {encoding: 'utf8'}, function(err, data) {
        if(err){
            console.log('Ha habido un error al leer el fichero ads: ', err);
            reject(err);
        }
        else{
            var packageData = JSON.parse(data);

            for(let i = 0; i < packageData.ads.length; i++){

                var new_ad = new Ad(packageData.ads[i]);
                new_ad.save(function(err, new_row){
                    if(err){
                        console.log("No se pudo insertar el anuncio numero ", i);
                    }else{
                        console.log("Insertado anuncio numero ", i);
                    }
                });
            }
            console.log('Se han insertado los anuncios');
            resolve();
        }
    });
});

PdeleteUsers.then(PdeleteAds).then(PinsertUsers).then(PinsertAds).catch(function(err){
    console.error('Ha habido un problema en la ejecución');
})