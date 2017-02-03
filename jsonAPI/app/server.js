// 必要なパッケージの読み込み
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// データベースを接続
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jsonAPI');

// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3000番を指定
var port = process.env.PORT || 3000;

// ルーティング登録
var router = require('./route/v1/');
app.use('/api/v1/', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);