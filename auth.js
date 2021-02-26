/***CSC3916 HW2
 ***file: auth.js
 ***Desc: Web API scaffolding for Movie API
 *** Full disclosure: I retyped exactly what is in Shawn's hw2 git repo. I'm still learning all of this
 *** so I didn't copy paste, but it is an exact copy*/


var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function (username, password, done) {
        var user = { name: "lgcu_user" };   //harcoded user. DB LU could be used
        if (username === user.name && password === "cu_rules") {
            return done(null, user);
        }
        else {
            return done(null, fulse);
        }
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });