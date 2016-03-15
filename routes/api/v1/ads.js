"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

router.get('/', function(req, res, next) {
    var sort = req.query.sort || "_id";
    var page = req.query.page || 0;
    var tags = req.query.tags || "";
    var sale = req.query.sale || true;
    var price = req.query.price || "";
    var name = req.query.name || "";

    var url = req.protocol + '://' + req.get('host') + req.originalUrl;

    // console.log('ORDEN: ', sort);
    // console.log('PAGINA: ', page);
    // console.log('TAGS: ', tags);
    // console.log('SALE: ', sale);
    // console.log('PRECIO: ', price);
    // console.log('NOMBRE: ', name);

    Ad.list(url, sort, page, tags, sale, price, name, function(err, rows, nextPage, prevPage){
        if(err){
            res.json({ result: false, err: err});
        }
        else{
            if(rows.length === 0)
                res.json({ result: true, rows: rows, nextpage: nextPage, prevpage: prevPage, msg: 'Búsqueda sin resultados'});
            else
                res.json({ result: true, rows: rows, nextpage: nextPage, prevpage: prevPage});
        }
    });
});

router.post('/', function(req, res){
    var ad = new Ad(req.body);

    ad.save(function(err, newRow){
        if(err){
            res.json( { result: false, error: err } );
        }
        else{
            res.json( { result: true, insertedElement: newRow } );
        }
    })
});

router.put('/:id', function(req, res){
    // Ad.update(
    //     { _id: req.params.id},
    //     {$set: {name: req.params.name}},
    //     {$set: {price: req.params.price}},
    //     {$set: {picture: req.params.picture}},
    //     {$set: {tags: req.params.tags}},
    //     {multi: true},
    //     function(err, data){
    //         if(err){
    //             res.json({ result: false, error: err});
    //         }
    //         else{
    //             res.json({ result: true, row: data});
    //         }
    //     });
    Ad.update(
        { _id: req.params.id},
        {$set: {sale: req.params.sale}},
        {multi: true},
        function(err, data){
            if(err){
                res.json({ result: false, error: err});
            }
            else{
                res.json({ result: true, row: data});
            }
        });
});

router.delete('/:id', function(req, res){
    Ad.remove({_id: ObjectId(req.params.id)}, function(err, data){
        if(err){
            res.json( { result: false, error: err});
        }
        else{
            res.json( { result: true, data: data});
        }
    });
});

module.exports = router;
