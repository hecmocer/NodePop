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

// Creamos función list de manera dinámica que recibe un callback
adSchema.statics.list = function(qsort, qpage, qtags, qsale, qprice, qname, cb) {
    // Preparamos la query sin ejecutarla
    var query = ad.find({});

    // Añadimos más parámetros a la query
    query.sort(qsort);

    query.limit(5);
    query.skip(5*qpage);
    query.where('sale').equals(qsale);

    var qtagsArray = qtags.split(',');
    if(qtagsArray[0] !== "" ){
        for(let i = 0; i < qtagsArray.length; i++){
            query.where('tags').equals(qtagsArray[i]);
        }
    }

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

    if(qname !== ''){
        var qnameArray = qname.split(',');
        var qRegExp = "";

        for(let i = 0; i < qnameArray.length; i++){
            qRegExp = new RegExp('^' + qnameArray[i]);
            query.where('name').regex(qRegExp);
        }
    }

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