"use strict";

// Importamos mongoose
var mongoose = require('mongoose');

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'mongodb connection error:'));

// Hacemos console log cuando se conecte a mongodb
conn.once('open', function() {
    console.info('Connected to mongodb.');
});

mongoose.connect('mongodb://localhost/NodePop');