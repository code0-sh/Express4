var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function(req, res) {
  res.json({ message: 'Successfully Posted a test message.'});
});


router.use('/users', require('./user.js'));

module.exports = router;

