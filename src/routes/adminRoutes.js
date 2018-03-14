var express = require('express');
var adminRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;

var books = [{
    "Title": "Company",
    "Author": "Bettye Banton"
}, {
    "Title": "Duck Season (Temporada de patos)",
    "Author": "Ivor Sothcott"
}, {
    "Title": "There's No Business Like Show Business",
    "Author": "Mellisa Melbert"
}, {
    "Title": "On the Town",
    "Author": "Thacher Keymer"
}, {
    "Title": "Johnny Mnemonic",
    "Author": "Garald Hollingsby"
}];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var uri = "mongodb+srv://PakYak:PBSqirvCwlDxgFT0@cluster0-d9jwc.mongodb.net/libraryApp";

            MongoClient.connect(uri, function (err, client) {
                const collection = client.db("libraryApp").collection("books");
                // perform actions on the collection object
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    client.close();
                });
            });
        });

    return adminRouter;
}

module.exports = router;