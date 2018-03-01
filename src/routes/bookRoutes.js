var express = require('express');

var bookRouter = express.Router();

//we passed the nav in from app.js
var router = function(nav){
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
    
    bookRouter.route('/')
        .get(function(req,res){
            res.render("books",{title: "hello from render",
            nav: nav,
            books: books});
        });
    
        //The : will send up whatever is behind the slash and will store it in a variable in this case named id
    bookRouter.route('/:id')
        .get(function(req,res){
                var id = req.params.id;
                res.render("bookView",{title: "hello from render",
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
}




    module.exports = router;