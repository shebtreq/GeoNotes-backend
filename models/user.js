// db link
var mongoose = require('mongoose');

// define the product model (fields and data types)
var User = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }//,
    // lattidue: String,
    // longitude: String
});

// make the model public so other files can access it
module.exports = mongoose.model('User', User);