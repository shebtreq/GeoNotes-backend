var User = require('../../models/user.js');
var Note = require('../../models/note.js');

////////////////
// Notes Routers
////////////////
var notesRouter = require('express').Router({mergeParams: true});

notesRouter.put('/notes', function(req, res, next) {
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

notesRouter.get('/notes', function(req, res, next) {
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

module.exports = notesRouter;