var mongoose = require('mongoose');

var Note = new mongoose.Schema({
    _creator : { type: String, ref: 'User' },
    content: String,
    latitude: String,
    longitude: String
});

module.exports = mongoose.model('Note', Note);