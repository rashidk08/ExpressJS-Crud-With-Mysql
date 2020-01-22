 var createError = require('http-errors');
 var express = require('express');
 var path = require('path');
 var cookieParser = require('cookie-parser');//t's a cookie parsing middleware which allows you to parse Cookie header and populate req.cookies with an object keyed by the cookie names.
 var logger = require('morgan');
 var expressValidator = require('express-validator'); // For Validation
 var flash = require('express-flash'); // For Flash message
 var session = require('express-session'); // It's a simple session middleware for Express which allows you to manage sessions in your NodeJS-Express applications.
 var bodyParser = require('body-parser'); // It's a body parsing middleware which allows you to parse incoming request bodies in a middleware before your handlers, available under the req.body property.

 var mysql = require('mysql');
 var connection  = require('./lib/db');

 var indexRouter = require('./routes/index');
 var usersRouter = require('./routes/users');
 var customersRouter = require('./routes/customers');

 var app = express();

// view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 //app.use(logger('dev')); //For Log in console
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));// initialize body-parser to parse incoming parameters requests to req.body

 app.use(cookieParser());// initialize cookie-parser to allow us access the cookies stored in the browser. 

 app.use(express.static(path.join(__dirname, 'public')));

// req.session.id || req.sessionID
 app.use(session({
     secret: '123456cat',
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 60000 }
 }))

 app.use(flash());
 app.use(expressValidator());

 app.use('/', indexRouter);
 app.use('/users', usersRouter);
 app.use('/customers', customersRouter);

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   next(createError(404));
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
 //