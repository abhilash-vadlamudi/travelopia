'use strict';
var db = require('../../models');
var express = require('express');
var router = express.Router();

const fs = require('fs');
const enduserApisPath = __filename.replace('api.js', '');
var apis = new Object();
var ucFirst = function (str) {
    str += '';
    var f = str.charAt(0)
        .toUpperCase();
    return f + str.substr(1);
};
router.get('/', function (req, res) {
    res.send('Hello Login');
});
fs.readdir(enduserApisPath, function (err, items) {
    for (var i = 0; i < items.length; i++) {
        if (items[i] !== 'api.js') {
            var item = items[i].replace('.js', '');
            var ival = ucFirst(item);
            apis[ival] = require('./' + item);
            apis[ival].loadRoutes(router);
        }
    }
});

module.exports = router;
