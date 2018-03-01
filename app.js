var express = require('express');

var app = express();

//process.env.PORT will pull the port out of the enviornment and if there is not one then it will use 3000
var port = process.env.PORT || 3000;

var nav = [{
        Link:'/Books',
        Text: 'Books'
    }, {
        Link: "/Authors",
        Text: 'Authors'
    }];

    //pass the nav object to the bookRoutes
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));

//when we do a res.render it will look in the src/views folder for the file
app.set('views','./src/views');

app.use('/Books', bookRouter);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {title: "hello from render",
        nav: [{Link:'/Books', Text: 'Books'}, {Link: "/Authors", Text: 'Authors'}]});
});

app.get('/books', function(req, res){
    res.send('hello books');
});

app.listen(port,function(err){
    console.log('running server on port ' + port);
});