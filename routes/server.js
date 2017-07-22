var fs = require('fs');
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var User = require('../models/user.js');

////////////////
//Routers
////////////////
var router = require('express').Router();

router.get('/users/:name', function(req, res, next) {
    console.log("inside users");
    res.send(200);
    User.find({ name: res.name })
        .exec(function (err, user) {
            if (!err) {
                res.append("user", user);
            }

        });
});

router.put('/login?'
    + 'user=:name'
    // + '&password=:password'
    // + '&location=:longitude'
    // + '&latitude=:latitude'
    ,
    function(req, res, next) {

    var user = new User({
        name: req.name
    });
    res.send(200);
});

module.exports = router;