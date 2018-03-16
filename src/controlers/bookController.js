var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookServer, nav) {
    var middleware = function(req,res,next){
        //if the user is not signed in then they cannot go to books yet so redirect them to the home page
        if (!req.user) {
            //res.redirect('/');
        }
        next();
    };

    var getIndex = function (req, res) {
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
    };

    var getById = function (req, res) {
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
    }

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
};

module.exports = bookController;