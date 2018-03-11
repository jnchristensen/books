var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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
            var url =
                'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, client) {

                console.log(client);

                //create a collection called books
                var db = client.db('books');

                //add books to that collection
                db.collection('books').insertMany(books, function (err, results) {
                    res.send(results);

                    //close the database connection (make sure this is inside the callback)
                    client.close();
                }
                );
            });
        });

    return adminRouter;
}

module.exports = router;