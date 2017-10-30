var express = require('express');
var favouritesRouter = express.Router();

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://admin:c0decl7n@ds157971.mlab.com:57971/heroku_j33b7f5k", function(error, database){
    db = database;
});

// Show
favouritesRouter.get("/", function(request, response){
    db.collection("favourites").find().toArray(function(error, results){
    response.json(results);    
    });
});

// Create
favouritesRouter.post("/", function(request,response){
    console.log(request.body);
    db.collection("favourites").insertOne(request.body, function(error, results){
        response.json(results);
    })
})

// Delete
favouritesRouter.delete("/:id", function(request, response){
    var idNum = parseInt(request.params.id);
    db.collection("favourites").remove({ id: idNum}, function(error, results){
        response.json(results);
    });
});



module.exports = favouritesRouter;