var express = require('express');
var router = express.Router();
var User = require('../../models/user');

// /users というルートを作成する
router.route('/')
      // ユーザの作成 (POST http://localhost:3000/api/users)
      .post(function(req, res) {
        // 新しいユーザのモデルを作成する
        var user = new User();
        // ユーザの各カラムの情報を取得する
        user.twitter_id = req.body.twitter_id;
        user.name = req.body.name;
        user.age = req.body.age;

        // ユーザ情報をセーブする
        user.save(function(err) {
          if (err) res.send(err);
          res.json({message: 'User created!'});
        });
      })
      .get(function(req, res) {
        User.find(function(err, users) {
          if (err) res.send(err);
          res.json(users);
        });
      });

// /users/:user_id というルートを作成する．
router.route('/:user_id')
      // 1人のユーザの情報を取得
      .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
          if (err) res.send(err);
          res.json(user);
        });
      })
      // 1人のユーザの情報を更新
      .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
          if (err) res.send(err)
            // ユーザの各カラムの情報を更新する
            user.twitter_id = req.body.twitter_id;
            user.name = req.body.name;
            user.age = req.body.age;

            user.save(function(err) {
              if (err) res.send(err);
              res.json({message: 'User updated!'});
            });
          });
      })
      // 1人のユーザの情報を削除
      .delete(function(req, res) {
        User.remove({
          _id: req.params.user_id
        }, function(err, user) {
          if (err) res.send(err);
          res.json({message: 'Successfully deleted'});
        });
      });

module.exports = router;