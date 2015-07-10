var User = require('../models/user');

module.exports = {
	createUser: function(req, res){
		newUser = new User(req.body);
		newUser.save(function(err, result) {
			if(err) {
				return res.sendStatus(500);
			} else {
				return res.send(result);
			}
		});
	},

	readUser: function(req, res){
		Product.find(req.query, function(err, result){
			if(err){
				return res.status(500).json(err);
			} else {
				return res.json(result);
			}
		});
	},

	updateUser: function(req, res){
		User.findByIdAndUpdate(req.params.id, req.body, function(err, result){
				if(err) {
				return res.status(500).json(err);
			} else {
				res.send(result);
			}
		});
	},

	deleteUser: function(req, res){
		User.remove(req.body, function(err, result){
			if(err){
				return res.status(500).json(err);
			} else {
				return res.json(result);
			}
		});
	}
};