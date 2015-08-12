var book = require('../models/book');

module.exports = {

	createBook: function(req, res){
		newBook = new Book(req.body);
		newBook.save(function(err, result) {
			if(err) {
				return res.sendStatus(500);
			} else {
				return res.send(result);
			}
		});
	},

	// readBook: function(req, res){
	// 	Book.find(req.query, function(err, result){
	// 		if(err){
	// 			return res.status(500).json(err);
	// 		} else {
	// 			return res.json(result);
	// 		}
	// 	});
	// },

	updateBook: function(req, res){
		Book.findByIdAndUpdate(req.params.id, req.body, function(err, result){
				if(err) {
				return res.status(500).json(err);
			} else {
				res.send(result);
			}
		});
	}

	// deleteBook: function(req, res){
	// 	Book.remove(req.body, function(err, result){
	// 		if(err){
	// 			return res.status(500).json(err);
	// 		} else {
	// 			return res.json(result);
	// 		}
	// 	});
	// }

};