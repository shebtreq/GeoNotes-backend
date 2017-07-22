var User = require('../models/user.js');
var Note = require('../models/note.js');

////////////////
//User Routers
////////////////
var usersRouter = require('express').Router();

usersRouter.put('/login',
    function(req, res, next) {
        var user = new User({
            name: req.query.user
        }).save(function (err, user) {
            if (err) next();
            res.sendStatus(200);
        });
    });

usersRouter.get('/users', function(req, res, next) {
    User.find({})
        .lean()
        .exec(function (err, users) {
            if (err) next();
            res.status(200).send(users);
        });
});

usersRouter.put('/users/:name', function(req, res, next) {
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

usersRouter.use('/users/:name', require('./usersRouters/notesRouter.js'));

module.exports = usersRouter;