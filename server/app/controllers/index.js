var controllers = {};

// load models
require("fs").readdirSync(__dirname).forEach(function (file) {

    if (file != 'index.js') {
        controllers[file.replace('.js', '')] = require(__dirname + '/' + file);
    }

});

module.exports = controllers;