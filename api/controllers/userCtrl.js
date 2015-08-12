var User = require('../models/user');
var q = require('q');

module.exports = {
	findOrCreate: function(profile){
		var dfd = q.defer();
		User.findOne({
        'goodreadsId': profile.id 
	    }, function(err, user) {
	        if (err) {
	            dfd.reject(err);
	        }
	        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
	        if (!user) {
	            var newUser = new User({
	                goodreadsId: profile.id, 
					displayName: profile.displayName
	                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
	                // facebook: profile._json
	            });
	            newUser.save(function(err) {
	                if (err) console.log(err);
	                dfd.resolve(newUser);
	            });
	        } else {
	            //found user. Return
	            dfd.resolve(user);
	        }
	    });
			return dfd.promise;
	}
};
// mine
	// 	if(User.findOne()){
	// 		console.log('user already created');
	// 	} else {
	// 		User.create({
	// 			goodreadsId: profile.goodreadsId, 
	// 			displayName: profile.displayName
	// 		});
	// 	}
	// }

	// function(accessToken, refreshToken, profile, done) {
 //        //check user table for anyone with a facebook ID of profile.id
 //        User.findOne({
 //            'facebook.id': profile.id 
 //        }, function(err, user) {
 //            if (err) {
 //                return done(err);
 //            }
 //            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
 //            if (!user) {
 //                user = new User({
 //                    name: profile.displayName,
 //                    email: profile.emails[0].value,
 //                    username: profile.username,
 //                    provider: 'facebook',
 //                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
 //                    facebook: profile._json
 //                });
 //                user.save(function(err) {
 //                    if (err) console.log(err);
 //                    return done(err, user);
 //                });
 //            } else {
 //                //found user. Return
 //                return done(err, user);
 //            }
 //        });
 //    }

	// updateOrCreateUser: function(req, res){
	// 	newUser = new User(req.body);
	// 	newUser.save(function(err, result) {
	// 		if(err) {
	// 			return res.sendStatus(500);
	// 		} else {
	// 			return res.send(result);
	// 		}
	// 	});
	// }