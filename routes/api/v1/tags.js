"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var url = req.protocol + '://' + req.get('host') + '/api/v1/ads?';

    var Swork = url + 'tags=work';
    var Slifestyle = url + 'tags=lifestyle';
    var Smotor = url + 'tags=motor';
    var Smobile = url + 'tags=mobile';

    res.json( { tags: '[work, lifestyle, motor, mobile]',
        searchWork: Swork,
        searchLifestyle: Slifestyle,
        searchMotor: Smotor,
        searchMobile: Smobile } );
});

router.post('/', function(req, res){
    var user = new User(req.body);

    user.save(function(err, newRow){
        if(err){
            res.json( { result: false, error: err});
        }
        else{
            res.json( { result: true, insertedElement: newRow});
        }
    });
});

module.exports = router;