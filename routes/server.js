var fs = require('fs');
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var User = require('../models/user.js');

////////////////
//Routers
////////////////
var router = require('express').Router();

router.put('/login',
    function(req, res, next) {
        console.log("user being added: " + req.query.user);
        var user = new User({
            name: req.query.user
        }).save();
        res.sendStatus(200);
    });


router.put('/users/:name', function(req, res, next) {
    console.log("getting user: " + req.params.name);
    var newUser = req.body.user;
    User.findOneAndUpdate(
        { name: req.params.name },
        newUser,
        { upsert: true },
        function(err, doc) {
            if (err) next();
            return res.status(200).send(req.body);
    });
});

router.get('/users', function(req, res, next) {
    console.log("getting users");
    User.find({})
        .lean()
        .exec(function (err, users) {
            if (err === null) {
                res.status(200).send(users);
            } else {
                next();
            }
        });
});


module.exports = router;