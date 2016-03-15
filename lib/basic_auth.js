"use strict";

var basicAuth = require('basic-auth');
var User = require('../models/user_model');

var fn = function(){
    return function(req, res, next){
        var user = basicAuth(req);

        if (user){
            user.name = user.name || '';
            user.pass = user.pass || '';

            User.findCredentials(user.name, user.pass, function(err){
                if(err){
                    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                    res.send(401);
                }
                else{
                    next();
                }
            });
        }
        else{
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
        }
    }
}

module.exports = fn;