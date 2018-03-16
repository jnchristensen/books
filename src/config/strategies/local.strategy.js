var passport = require("passport"),
    LocalStrategy = require('passport-local'),
    MongoClient = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },

        function (username, password, done) {
            var uri = "mongodb+srv://PakYak:PBSqirvCwlDxgFT0@cluster0-d9jwc.mongodb.net/libraryApp";

            MongoClient.connect(uri, function (err, client) {
                const collection = client.db("libraryApp").collection("users");
                // perform actions on the collection object
                collection.findOne({ username: username },
                    function (err, results) {
                        if(results.password === password){
                            var user = results;
                            done(null, user);
                        } else{
                            done(null, false, {message: 'Bad password'});
                        }
                        
                    });
            }
            )
        }))
};