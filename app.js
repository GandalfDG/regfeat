var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var rss_parser = require('rss-parser');
var schedule = require('node-schedule');
var credentials = require('./credentials');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//set up mongoose
var mongoDB = 'mongodb://' + credentials.username + ":" + credentials.password + '@ds115569.mlab.com:15569/regularfeach';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//rss parser setup
let rss = new rss_parser();
(async function() {
  let feed = await rss.parseURL('http://feeds.soundcloud.com/users/soundcloud:users:39773595/sounds.rss');
  console.log(feed.title);

  feed.items.forEach(function(item) {
    console.log(item);
  });
})();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
