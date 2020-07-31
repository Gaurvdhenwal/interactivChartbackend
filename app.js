var createError = require('http-errors');
var express = require('express');
var app = express();
var http = require('http').createServer(app)
http.listen(3000, () => {
  console.log('listening on *:3000');
});


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var commentRouter = require('./routes/comment');
var io = require('socket.io')(http);
mongoose.connect("mongodb+srv://gaurav699:ch5vKLpRKX1xXP0F@cluster0.4hbdd.gcp.mongodb.net/sensex?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true })
.then(() => {
  console.log('connected to mongodb')
}, err => {
  console.error('error connecting mongoDB  ' + err)
})
app.use((req, res, next) => { // a MW to set headers to response for CORS error
  res.setHeader('Access-Control-Allow-Origin', "*");

  res.setHeader('Access-Control-Allow-Headers', // to allow extra headers to pass through
      "Origin, X-Requested-With, Content-Type, Accept, Authorization") // incoming req may have these extra headers
  //if any extra header is present in req besides these access will still be blocked

  res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, PATCH, OPTIONS') //which HTTP verbs will be allowed
  next(); // go to next middleware 
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
  console.log('a user connected',socket);
  // io.emit('refreshComment', 'refresh')
});
app.set('socketio', io);
app.use('/', indexRouter);
app.use('/comment', commentRouter);


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
