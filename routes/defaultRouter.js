var express = require('express');
var defaultRouter = express.Router();

defaultRouter.use('/', function (req, res, next) {
    console.log("entered default rotuer");
    res.status(500).send('This is the default response!!!');
});

module.exports = defaultRouter;