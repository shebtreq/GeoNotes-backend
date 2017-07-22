var express = require('express');
var path = require('path');
var fs = require("fs");

var router = express.Router();

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0
        && file !== "defaultRouter.js"
        &&  file !== path.basename(__filename))
}).forEach(function(file) {
    router.use('/', require("./" + file));
});

router.use('/', require("./defaultRouter.js"));

module.exports = router;
