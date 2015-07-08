var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
  request = require('request'),
  session = require('express-session'),
	GoodreadsStrategy = require('passport-goodreads').Strategy;
	// mongoose = require('mongoose');


var app = express();
var port = 8888;

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
      // return done(err, user);
    // });
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
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

app.get('/auth/goodreads/callback', 
  passport.authenticate('goodreads', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/home');

  });

app.get('/api/reviews', function(req, res){
  console.log(req.user);
  request.get('https://www.goodreads.com/review/list/993466?key=wXIuvQ4Icx6bai2S7FxwLQ&v=2&format=xml', function(err, response, body){
    if(err){
      res.status(500).json(err);
    } else {
      console.log(body);
      res.json(body);
    }
  });
});

app.listen(port, function(){
	console.log('listening on port....', port);
});
