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
  
// require('request-debug')(request);
var app = express();
var port = 8888;

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
    callbackURL: "http://localhost:8888/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    userCtrl.findOrCreate(profile).then(
     function (user) {
      return done(null, user);
    });
  })
);


// function(accessToken, refreshToken, profile, done) {
//         //check user table for anyone with a facebook ID of profile.id
//         User.findOne({
//             'facebook.id': profile.id 
//         }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             //No user was found... so create a new user with values from Facebook (all the profile. stuff)
//             if (!user) {
//                 user = new User({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     username: profile.username,
//                     provider: 'facebook',
//                     //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
//                     facebook: profile._json
//                 });
//                 user.save(function(err) {
//                     if (err) console.log(err);
//                     return done(err, user);
//                 });
//             } else {
//                 //found user. Return
//                 return done(err, user);
//             }
//         });
//     }


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
app.post('/api/books', bookCtrl.createBook);
// app.put('/api/books/:id', bookCtrl.updateBook);

// //User endpoints

// app.post('/api/user', userCtrl.createUser);
// app.get('/api/user', userCtrl.readUser);
// app.put('/api/user/:id', userCtrl.updateUser);
// app.delete('/api/user', userCtrl.deleteUser);

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
  console.log('Connceted to Mongo at ', mongoUri);
});

app.listen(port, function(){
	console.log('listening on port....', port);
});
