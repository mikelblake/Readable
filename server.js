var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
  request = require('request'),
  session = require('express-session'),
	GoodreadsStrategy = require('passport-goodreads').Strategy,
	mongoose = require('mongoose'),
  mongoUri = 'mongodb://localhost:27017/readable',
  // mongoUri = 'mongodb://https://radiant-bayou-9926.herokuapp.com/';
  cookieParser = require('cookie-parser');
  
var app = express();
var port = 80;

// CONTROLLERS

var bookCtrl = require('./api/controllers/bookCtrl');
var userCtrl = require('./api/controllers/userCtrl');
// var User = require('./api/models/user');

app.use(express.static(__dirname + '/public'));

app.use(cors());
app.use(bodyParser.json());

passport.use(new GoodreadsStrategy({
    consumerKey: 'wXIuvQ4Icx6bai2S7FxwLQ',
    consumerSecret: 'QDxtKnP9BPEIFOOGf7yvkngbP3DKynHCYI3DHHObnW8',
    callbackURL: "http://readible.co/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    userCtrl.findOrCreate(profile).then(
     function (user) {
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done){
   done(null, user);
  return user;
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
  return obj; 
});

app.use(session({
  secret: 'random string'
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.json();
});

app.get('/auth/goodreads',
  passport.authenticate('goodreads'));

app.get('/user/', function(req, res){
   request.get('https://www.goodreads.com/api/auth_user', function(err, res, body){
      if(err) console.log(err); 
      return res;
    }); 
});

app.get('/auth/goodreads/callback', 
  passport.authenticate('goodreads', { failureRedirect: '/#/login' }),
  function(req, res) {
    res.redirect('/#/home');
  });

app.get('/api/reviews/:shelftype', function(req, res){
  request.get('https://www.goodreads.com/review/list/'+req.user.goodreadsId+'?key=wXIuvQ4Icx6bai2S7FxwLQ&v=2&format=xml&per_page=200&shelf=' + req.params.shelftype, function(err, response, body){
    if(err){
      res.status(500).json(err);
    } else {
      res.json(body);
    }
  });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/login');
});

// //Book endpoints
// app.post('/api/books', bookCtrl.createBook);
// app.put('/api/books/:id', bookCtrl.updateBook);

// //User endpoints

// app.post('/api/user', userCtrl.createUser);
// app.get('/api/user', userCtrl.readUser);
app.put('/api/user/:id', userCtrl.updateUser);
// app.delete('/api/user', userCtrl.deleteUser);

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
  console.log('Connceted to Mongo at ', mongoUri);
});

app.listen(port, function(){
	console.log('listening on port....', port);
});
