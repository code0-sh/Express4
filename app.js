var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var session = require("express-session");
var csurf = require("csurf");
var flash = require("connect-flash");
var mongoose = require("mongoose");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// データベースを接続
mongoose.connect("mongodb://localhost/blog");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HTTP METHOD を上書き
app.use(methodOverride(function(req, res){
  if( req.body && typeof req.body === "object" && "_method" in req.body ){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// SessionとCSRF、flashメッセージの設定
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
}));
app.use(csurf());
app.use(flash());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/', index);
app.use('/users', users);

module.exports = app;
