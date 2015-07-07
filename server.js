var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	GoodreadsStrategy = require('passport-goodreads').Strategy;
	// mongoose = require('mongoose');


var app = express();
var port = 8888;

app.use(cors());
app.use(bodyParser.json());

passport.use(new GoodreadsStrategy({
    consumerKey: wXIuvQ4Icx6bai2S7FxwLQ,
    consumerSecret: QDxtKnP9BPEIFOOGf7yvkngbP3DKynHCYI3DHHObnW8,
    callbackURL: "http://127.0.0.1:3000/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ goodreadsId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/auth/goodreads',
  passport.authenticate('goodreads'));

app.get('/auth/goodreads/callback', 
  passport.authenticate('goodreads', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(port, function(){
	console.log('listening on port....', port);
});
