var book = require('../models/book');

module.exports = {

	createProduct: function(req, res){
		newProduct = new Product(req.body);
		newProduct.save(function(err, result) {
			if(err) {
				return res.sendStatus(500);
			} else {
				return res.send(result);
			}
		});
	},

	readProduct: function(req, res){
		Product.find(req.query, function(err, result){
			if(err){
				return res.status(500).json(err);
			} else {
				return res.json(result);
			}
		});
	},

	updateProduct: function(req, res){
		Product.findByIdAndUpdate(req.params.id, req.body, function(err, result){
				if(err) {
				return res.status(500).json(err);
			} else {
				res.send(result);
			}
		});
	},

	deleteProduct: function(req, res){
		Product.remove(req.body, function(err, result){
			if(err){
				return res.status(500).json(err);
			} else {
				return res.json(result);
			}
		});
	}

};