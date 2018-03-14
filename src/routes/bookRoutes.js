var express = require('express');
var bookRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//we passed the nav in from app.js
var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {
            var uri = "mongodb+srv://PakYak:PBSqirvCwlDxgFT0@cluster0-d9jwc.mongodb.net/libraryApp";

            MongoClient.connect(uri, function (err, client) {
                const collection = client.db("libraryApp").collection("books");
                // perform actions on the collection object
                collection.find({}).toArray(
                    function (err, results) {
                        res.render('books', {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                    });
            });
        });

    //The : will send up whatever is behind the slash and will store it in a variable in this case named id
    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);
            var uri = "mongodb+srv://PakYak:PBSqirvCwlDxgFT0@cluster0-d9jwc.mongodb.net/libraryApp";

            MongoClient.connect(uri, function (err, client) {
                const collection = client.db("libraryApp").collection("books");

                //add books to that collection
                collection.findOne({ _id: id },
                    function (err, results) {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    }
                )
            });
        });
    return bookRouter;
}

module.exports = router;