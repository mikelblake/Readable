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
	},

	updateUser: function(req, res){
		Book.findByIdAndUpdate(req.params.id, req.body, function(err, result){
				if(err) {
				return res.status(500).json(err);
			} else {
				res.send(result);
			}
		});
	}
};