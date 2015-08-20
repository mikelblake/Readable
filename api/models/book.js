var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	//user: { }, //reference to user schema...needed?
	totalPages: { type: Number },
	pagesRead: { type: Number },
	finishDate: { type: Date },
});

module.exports = mongoose.model('Book', bookSchema);