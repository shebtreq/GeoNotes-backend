var fs = require('fs');
var app = require('../app');
var User = require('../models/user.js');
var Note = require('../models/note.js');

////////////////
//Routers
////////////////
var router = require('express').Router();

router.put('/login',
    function(req, res, next) {
        var user = new User({
            name: req.query.user
        }).save(function (err, user) {
            if (err) next();
            res.sendStatus(200);
        });
    });

router.get('/users', function(req, res, next) {
    User.find({})
        .lean()
        .exec(function (err, users) {
            if (err) next();
            res.status(200).send(users);
        });
});

router.put('/users/:name', function(req, res, next) {
    var newUser = req.body.user;
    User.findOneAndUpdate(
        { name: req.params.name },
        newUser,
        { upsert: true },
        function(err) {
            if (err) next();
            return res.status(200).send(req.body);
        });
});

router.put('/users/:name/notes', function(req, res, next) {
    var note = req.body.note;
    User.findOne(
        { name: req.params.name },
        function(err, user) {
            if (err) next();
            note._creator = user._id;
            var newNote = new Note(note);
            newNote.save();
            user.notes.push(newNote);
            user.save();
            return res.status(200).send(user);
        });
});

router.get('/users/:name/notes', function(req, res, next) {
    User.findOne(
        { name: req.params.name })
        .exec(function (err, user) {
            if (err) next();
            Note.find({_creator: user._id})
                .exec(function (err, notes) {
                    if (err) next();
                    return res.status(200).send(notes);
                });
        });
});

module.exports = router;