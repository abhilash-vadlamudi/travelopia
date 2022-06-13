var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  return res.status(200).json({
    response_code: 'success',
    message: 'Welcome to Travelopia',
  });
});

module.exports = router;
