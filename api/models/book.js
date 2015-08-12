var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	user: { }, //reference to user schema...needed?
	totalPages: { type: Number },
	pagesRead: { type: Number },
	finishDate: { type: Date },
	// goalMet: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);