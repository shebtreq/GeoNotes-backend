var app = require('express')();

///////////////////////
// setup database
///////////////////////
require('mongoose')
    .connect('mongodb://localhost/tigerspike-demo');

///////////////////////
// setup model
///////////////////////
require('./models/setupModels.js');

///////////////////////
// setup routers
///////////////////////
app.use('/', require('./routes/setupRouters.js'));


module.exports = app;
