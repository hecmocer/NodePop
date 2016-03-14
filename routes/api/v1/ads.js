"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

/* GET home page. */
router.get('/', function(req, res, next) {
    var sort = req.query.sort || "_id";
    var page = req.query.page || "0";
    var tags = req.query.tags || "";
    var sale = req.query.sale || true;
    var price = req.query.price || "";
    var name = req.query.name || "";

    // console.log('ORDEN: ', sort);
    // console.log('PAGINA: ', page);
    // console.log('TAGS: ', tags);
    // console.log('SALE: ', sale);
    // console.log('PRECIO: ', price);
    // console.log('NOMBRE: ', name);

    Ad.list(sort, page, tags, sale, price, name, function(err, rows){
        if(err){
            res.json({ result: false, err: err});
        }
        else{
            res.json({ result: true, rows: rows});
        }
    });
});

module.exports = router;
