#!/usr/bin/env node

var express = require('express');
var appConfig = require('./config/app.json');
var dbConfig = require('./config/database.json');
var database = require('./app/database');

database.connect(dbConfig, null, function(error) {
    if (!error) {
        var app = express();

        app.use(require('./app/middleware'));
        app.use('/api', require('./app/controllers'));
        app.listen(appConfig.port, function() {
            console.log("Movie DB has started successfully")
        });
    } else {
        console.log("Error connecting to database!");
        process.exit(1);
    }
});
