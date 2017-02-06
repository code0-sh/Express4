var express = require('express');
var router = express.Router();
var User = require('../../models/user');

router.route('/')
      .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.admin = req.body.admin;

        user.save(function(err) {
          if (err) res.send(err);
          res.json({success: true});
        });
      })
      .get(function(req, res) {
        console.log(express);
        User.find(function(err, users) {
          if (err) res.send(err);
          res.json(users);
        });
      });

module.exports = router;