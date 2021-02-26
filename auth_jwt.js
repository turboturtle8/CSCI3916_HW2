/***CSC3916 HW2
 ***file: auth_jwt.js
 ***Desc: Web API scaffolding for Movie API
 *** Full disclosure: I retyped exactly what is in Shawn's hw2 git repo. I'm still learning all of this
 *** so I didn't copy paste, but it is an exact copy*/

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    var user = db.find(jwt_payload.id);
    if (user) {
        done(null, user);

    } else {
        done(null, false);
    }
}));

exports.isAuthenticated = passport.authenticate('jwt', { session: false });
exports.secret = opts.secretOrKey;