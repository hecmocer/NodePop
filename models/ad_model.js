"use strict";

// Conectamos con el driver
var conn = require('../lib/connect_mongoose');
var mongoose = require('mongoose');

// Creamos el esquema de usuarios
var adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    picture: String,
    tags: [String]
});

// Creamos función list que devuelve los anuncios segun ciertos parámetros
adSchema.statics.list = function(qurl, qsort, qpage, qtags, qsale, qprice, qname, cb) {
    // Preparamos la query sin ejecutarla
    var query = ad.find({});

    // Añadimos más parámetros a la query

    // Ordenamos segun el parámetro sort
    query.sort(qsort);

    // Establecemos un límite de resultados por página
    var qlimit = 5

    // Convertimos el parámetro página a entero
    qpage = parseInt(qpage);

    // Establecemos la paginación
    query.limit(qlimit);
    query.skip(qlimit * qpage);

    // Buscamos segun el parámetro sale
    if(qsale !== undefined){
        query.where('sale').equals(qsale);
    }

    // Buscamos segun el parámetro tags
    var qtagsArray = qtags.split(',');
    if(qtagsArray[0] !== "" ){
        for(let i = 0; i < qtagsArray.length; i++){
            query.where('tags').equals(qtagsArray[i]);
        }
    }

    // Buscamos segun el parámetro precio
    if(qprice !== ''){
        var indexInPrice = qprice.indexOf("-");
        //Precio exacto
        if(indexInPrice === -1 && qprice !== ""){
            query.where('price').equals(parseInt(qprice));
        }
        //Precio no exacto
        else{
            var qpriceArray = qprice.split('-');
            //Menor que
            if(indexInPrice === 0){
                query.where('price').lt(parseInt(qpriceArray[1]));
            }
            //Mayor que
            else if(indexInPrice === qprice.length-1){
                query.where('price').gt(parseInt(qpriceArray[0]));
            }
            //Rango de precios
            else{
                query.where('price').gt(parseInt(qpriceArray[0]));
                query.where('price').lt(parseInt(qpriceArray[1]));
            }
        }
    }

    // Buscamos segun el parámetro name
    if(qname !== ''){
        var qnameArray = qname.split(',');
        var qRegExp = "";

        for(let i = 0; i < qnameArray.length; i++){
            qRegExp = new RegExp('^' + qnameArray[i]);
            query.where('name').regex(qRegExp);
        }
    }

    // Manejamos la url para hacer HATEOAS y añadir prevPage y nextPage
    var uri = qurl.split('?')[0];
    uri = uri + '?';

    if(qsort !== '_id' && qsort !== undefined){
        uri = uri + '&sort=' + qsort;
    }
    if(qtags !== '' && qtags !== undefined){
        uri = uri + '&tags=' + qtags;
    }
    if(qsale !== undefined){
        uri = uri + '&sale=' + qsale;
    }
    if(qprice !== '' && qprice !== undefined){
        uri = uri + '&price' + qprice;
    }
    if(qname !== '' && qname !== undefined){
        uri = uri + '&name=' + qname;
    }
    uri = uri.substring(0,uri.indexOf('&')) + uri.substring(uri.indexOf('&')+1, uri.length);

    // Ejecutamos la query y llamamos al callback
    query.exec(function(err, rows, nextPage, prevPage){
        if(err){
            cb(err);
        }
        else{
            var nextpage = uri + '&page=' + (qpage+1);
            var prevpage = null;
            // Si la página es distinta de la primera, añadir prevPage
            if(qpage !== 0)
                prevpage = uri + '&page=' + (qpage-1);
            cb(null, rows, nextpage, prevpage);
        }
    });
};

// Creamos función listAll que devuelve todos los anuncios
adSchema.statics.listAll = function(cb) {
    // Preparamos la query sin ejecutarla
    var query = ad.find({});

    // Ejecutamos la query y llamamos al callback
    query.exec(function(err, rows){
        if(err){
            cb(err);
        }
        else{
            cb(null, rows);
        }
    });
};

// Registramos el schema en mongoose
var ad = mongoose.model('Ad', adSchema);

// Exportamos el modelo
module.exports = ad;