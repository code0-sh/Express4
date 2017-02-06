var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = require('../../../server')

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Successfully Posted a test message.'});
});

// non secure api -----------------------------------------------------------------
router.use('/authenticate', require('./authenticate'));

// Authentification Filter
router.use(function(req, res, next) {
  // get token from body:token or query:token of Http Header:x-access-token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // validate token
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

  jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    if (err) {
      return res.json({
        success: false,
        message: 'Invalid token'
      });
    }

    // if token valid -> save token to request for use in other routes
    req.decoded = decoded;
    next();
  });
});

// secure api -----------------------------------------------------------------
router.use('/users', require('./user'));


module.exports = router;