var express = require('express');

var app = express();

//process.env.PORT will pull the port out of the enviornment and if there is not one then it will use 3000
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.set('views','./src/views');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {list: ['a', 'b']});
});

app.get('/books', function(req, res){
    res.send('hello books');
});

app.listen(port,function(err){
    console.log('running server on port ' + port);
});