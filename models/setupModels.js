var fs = require("fs");
var path = require("path");

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0 &&  file !== path.basename(__filename))
}).forEach(function(file) {
    var model = require("./" + file)
});