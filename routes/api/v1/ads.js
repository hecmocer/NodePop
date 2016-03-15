"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

/* GET home page. */
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
            res.json({ result: true, rows: rows, nextpage: nextPage, prevpage: prevPage});
        }
    });
});

module.exports = router;
