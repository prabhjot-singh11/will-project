var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/login');
var usersRouter = require('./routes/user');
var admin = require('./routes/admin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const url="mongodb://localhost:27017/Willproject"
const url="mongodb+srv://prabhjot:123@cluster0.6tgh1i7.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true,   
})


const con = mongoose.connection
con.on('error',console.error.bind(console,"connection EROOR"))
con.once("open", function () {
console.log("Connected successfully to database");
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin',admin)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;