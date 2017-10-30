var express = require('express');
var bootcampsRouter = express.Router();

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://admin:c0decl7n@ds157971.mlab.com:57971/heroku_j33b7f5k", function(error, database){
    db = database;
});

// Show
bootcampsRouter.get("/", function(request, response){
    db.collection("bootcamps").find().toArray(function(error, results){
    response.json(results);    
    });
});


module.exports = bootcampsRouter;