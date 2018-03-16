var express = require('express');
var authRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    authRouter.route("/signUp")
        .post(function (req, res) {
            console.log(req.body);
            var uri = "mongodb+srv://PakYak:PBSqirvCwlDxgFT0@cluster0-d9jwc.mongodb.net/libraryApp";

            MongoClient.connect(uri, function (err, client) {
                const collection = client.db("libraryApp").collection("users");
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                // perform actions on the collection object
                collection.insert(user, function (err, results) {
                    //our passport middleware adds login to the request. This is so they don't have to login again after they sign up
                    req.login(results.ops[0], function () {
                        //once they login send them to the auth/profile route
                        res.redirect('/auth/profile');
                    });
                });
            });


        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            //if the user is not signed in then they cannot go to auth/profile and redirect them to the home page
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        })

    return authRouter;
}

module.exports = router;