var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
  request = require('request'),
  session = require('express-session'),
	GoodreadsStrategy = require('passport-goodreads').Strategy,
	mongoose = require('mongoose'),
  mongoUri = 'mongodb://localhost:27017/readable';
  // mongoUri = 'mongodb://https://radiant-bayou-9926.herokuapp.com/';
var Firebase = require("firebase");

  
require('request-debug')(request);
var app = express();
var port = 8888;

// CONTROLLERS

var bookCtrl = require('./controllers/bookCtrl');
var userCtrl = require('./controllers/userCtrl');
var User = require('./models/user');

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
  console.log('Connceted to Mongo at ', mongoUri);
});

app.use(express.static(__dirname + '/public'));

app.use(cors());
app.use(bodyParser.json());

passport.use(new GoodreadsStrategy({
    consumerKey: 'wXIuvQ4Icx6bai2S7FxwLQ',
    consumerSecret: 'QDxtKnP9BPEIFOOGf7yvkngbP3DKynHCYI3DHHObnW8',
    callbackURL: "http://localhost:8888/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ goodreadsId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

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
  request.get('https://www.goodreads.com/review/list/'+req.user.id+'?key=wXIuvQ4Icx6bai2S7FxwLQ&v=2&format=xml&per_page=200&shelf=' + req.params.shelftype, function(err, response, body){
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
// app.get('/api/products', bookCtrl.readProduct);



// //User endpoints

// app.post('/api/user', userCtrl.createUser);
app.get('/api/user', userCtrl.readUser);
// app.put('/api/user/:id', userCtrl.updateUser);
// app.delete('/api/user', userCtrl.deleteUser);


app.listen(port, function(){
	console.log('listening on port....', port);
});
