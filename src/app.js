"use strict";
exports.__esModule = true;
require('dotenv').config();
var bodyParser = require("body-parser");
var express = require("express");
var Knex = require("knex");
var morgan = require("morgan");
var api_1 = require("./api");
var objection_1 = require("objection");
var Errors_1 = require("./Errors");
var jwt = require("./accounts")["jwt"]
const methodOverride = require("method-override")


  

// Initialize knex the SQL query builder.
var knexConfig = require('../knexfile');
exports.knex = Knex(knexConfig.development);

// Create or migrate the database:
exports.knex.migrate.latest();
// Bind the knex instance to the base Model class
objection_1.Model.knex(exports.knex);
// Unfortunately the express-promise-router types are borked. Just require():
var router = require('express-promise-router')();
var app = express()
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(router)
    .set('json spaces', 2);
// Register our REST API.
api_1["default"](router);

app.use(function (err, req, res, next) {
    if (err) {
        if (err instanceof Errors_1.HttpError) {
            res.status(err.statusCode).send({
                status: err.statusCode,
                message: err.message
            });
        }
        else {
            res.status(500).send({
                status: 500,
                message: 'An unexpected error occurred!'
            });
        }
    }
    else {
        next();
    }
});



app.set("view-engine", "ejs")
var port = process.env.PORT || 8070;
app.listen(port, function () {
    console.log('Todo app listening at port %s', port);
});

app.delete("/logout", (req,res)=> {
    req.logOut();
    res.redirect("/login")
})

