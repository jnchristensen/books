var express = require('express');
var bodyParser = require("body-parser");


var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

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

//Creating a variable that is the function
//pass the nav object to the bookRoutes
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));

//middleware that looks to see if there is a body that it sees as json and it will parse it and store it as an object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: "library"}));
require("./src/config/passport")(app);

//when we do a res.render it will look in the src/views folder for the file
app.set('views','./src/views');


//this is where we use the variable we created that is the function if they hit a certain URL
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

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