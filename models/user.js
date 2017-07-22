var mongoose = require('mongoose');
var uuid = require('node-uuid');

var User = new mongoose.Schema({
    _id: {  type: String,
            default: function genUUID() {
                    return uuid.v1();
          }},
    name: {
        type: String,
        unique: true
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

module.exports = mongoose.model('User', User);