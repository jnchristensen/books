var express = require('express');
var bookRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookController = require('../controlers/bookController');

//we passed the nav in from app.js
var router = function (nav) {
    var bookController = require('../controlers/bookController')(null,nav);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    //The : will send up whatever is behind the slash and will store it in a variable in this case named id
    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
}

module.exports = router;