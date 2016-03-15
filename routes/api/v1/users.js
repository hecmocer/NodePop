var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/', function(req, res, next) {
    res.send('¿Creías que te íbamos a dejar ver el listado de usuarios y sus contraseñas?');
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
