var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var app = require('../../../server')

router.route('/')
      .post(function(req, res) {
        User.findOne({name: req.body.name}, function(err, user) {
          if (err) res.send(err);

          // validation
          if (!user) {
            res.json({
              succes: false,
              message: 'Authentication failed. User not found.'
            });
            return;
          }

          if (user.password != req.body.password) {
            res.json({
              succes: false,
              message: 'Authentication failed. Wrong password.'
            });
            return;
          }

          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: '24h'
          });

          res.json({
            succes: true,
            message: 'Authentication successfully finished.',
            token: token
          });
        });
      });

module.exports = router;