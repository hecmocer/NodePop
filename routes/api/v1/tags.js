"use strict";

// Importamos el express y router
var express = require('express');
var router = express.Router();

// Para la petición GET
router.get('/', function(req, res, next) {

    // Reconstruimos la url
    var url = req.protocol + '://' + req.get('host') + '/api/v1/ads?';

    // Construimos la url de búsqueda de tags
    var Swork = url + 'tags=work';
    var Slifestyle = url + 'tags=lifestyle';
    var Smotor = url + 'tags=motor';
    var Smobile = url + 'tags=mobile';

    // Listado de tags
    var tagsArray = []
    tagsArray[0] = 'work';
    tagsArray[1] = 'lifestyle';
    tagsArray[2] = 'motor';
    tagsArray[3] = 'mobile';

    // Listado de links de tags
    var linksArray = [];
    linksArray[0] = Swork;
    linksArray[1] = Slifestyle;
    linksArray[2] = Smotor;
    linksArray[3] = Smobile;

    // Respondemos el objeto json con tags y links
    res.json( { tags: tagsArray,
        links: linksArray } );
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