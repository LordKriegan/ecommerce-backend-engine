require('dotenv').config()
//dependencies
var express = require('express');
var bodyParser = require('body-parser');

//setup server
var port = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//start server
db.sequelize.sync({force: Boolean(process.env.DBSYNCOPTION)}).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});