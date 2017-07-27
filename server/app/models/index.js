var models = {};

// load models
require("fs").readdirSync(__dirname).forEach(function (file) {

    if (file != 'index.js') {
        models[file.replace('.js', '')] = require(__dirname + '/' + file);
    }

});

module.exports = models;