/***CSC3916 HW2
 ***file: server.js
 ***Desc: Web API scaffolding for Movie API
 *** Full disclosure: I retyped exactly what is in Shawn's hw2 git repo. I'm still learning all of this
 *** so I didn't copy paste, but it is an exact copy*/

var express = require('express');
//'use strict';
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
db = require('./db')(); //db workaround to make project easy for now
var jwt = require('jsonwebtoken');
var cors = require('cors');


var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,        //WHAT IS UNIQUE_KEY??
        body: "No body"
    };
    if (req.body != null) {
        json.body = req.body;

    }//do we need ; here? Yes I know they aren't required, but is this the end of the if statement?

    if (req.headers != null) {
        json.headers = req.headers;
    }//again, ; reqd? end of stmt?

    return json;

};

router.post('/signin', function (req, res) {
    var user = db.findOne(req.body.username);

    if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
        if (req.body.password == user.password) {
            var userToken = { id: user.id, username: user.username };
            var token = jwt.sign(userToken, process.env.SECRET_KEY);
            res.json({ success: true, token: 'JWT' + token });
        }
        else {
            res.status(401).send({ success: false, msg: 'Authentication failed.' });
        }
    }
});

router.route('/testcollection')
    .delete(authController.isAuthenticated, function (req, res) {
        console.log(req.body);
        res = res.status(200);
        if (req.get('Content-Type')) {
            res = res.type(req.get('Content-Type'));
        }

        var o = getJSONObjectForMovieRequirement(req);
        res.json(o);
    }
    );

app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app; //for testing only???







//var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
