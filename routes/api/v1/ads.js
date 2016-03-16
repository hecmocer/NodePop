"use strict";

// Importamos Express, modulo router, mongoose y el modelo de anuncios
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

// Para la petición GET
router.get('/', function(req, res, next) {
    // Manejamos el valor por defecto de los parámetros
    var sort = req.query.sort || "_id";
    var page = req.query.page || 0;
    var tags = req.query.tags || "";
    var sale = req.query.sale;
    var price = req.query.price || "";
    var name = req.query.name || "";

    // Reconstruimos la url para poder añadir paginacion HATEOAS
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;

    // Llamamos a la función que busca los resultados
    Ad.list(url, sort, page, tags, sale, price, name, function(err, rows, nextPage, prevPage){
        if(err){
            res.json({ result: false, err: err});
        }
        else{
            // Manejamos que no haya resultados
            if(rows.length === 0)
                res.json({ result: true, rows: rows, nextpage: nextPage, prevpage: prevPage, msg: 'Búsqueda sin resultados'});
            else
                res.json({ result: true, rows: rows, nextpage: nextPage, prevpage: prevPage});
        }
    });
});

// Para la petición POST
router.post('/', function(req, res){
    // Creamos un objeto con lo que nos pasen en el cuerpo de la petición
    var ad = new Ad(req.body);

    // Insertamos dicho objeto. Mongoose se encargará de comprobar si concuerdan los campos
    ad.save(function(err, newRow){
        if(err){
            res.json( { result: false, error: err } );
        }
        else{
            res.json( { result: true, insertedElement: newRow } );
        }
    })
});

// Para la petición PUT
router.put('/:id', function(req, res){

    // Manejamos el parámetro sale en caso de que sea un string
    var qsale = req.body.sale;
    if(qsale === 'true')
        qsale = true;
    if(qsale === 'false')
        qsale = false;

    // Manejamos el parámetro price en caso de que sea un string
    var qprice = req.body.price;
    if(qprice !== undefined)
        qprice = parseInt(req.body.price);

    // Añadimos dinámicamente a un objeto los parámetros que vamos a actualizar
    var set_obj = {};

    if(qsale !== undefined)
        set_obj.sale = qsale;
    if(qprice !== undefined)
        set_obj.price = qprice;
    if(req.body.picture !== undefined)
        set_obj.picture = req.body.picture;
    if(req.body.name !== undefined)
        set_obj.name = req.body.name;
    if(req.body.tags !== undefined)
        set_obj.tags = req.body.tags;

    // Ejecutamos la actualización
    Ad.update(
        { _id: req.params.id},
        {$set: set_obj},
        function(err, data){
            if(err){
                res.json({ result: false, error: err});
            }
            else{
                res.json({ result: true, row: data});
            }
        });
});

// Para la petición DELETE
router.delete('/:id', function(req, res){

    // Borramos el elemento con el id especificado en la petición
    Ad.remove({_id: req.params.id}, function(err, data){
        if(err){
            res.json( { result: false, error: err});
        }
        else{
            res.json( { result: true, data: data});
        }
    });
});

// Exportamos el router
module.exports = router;
