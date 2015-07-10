var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	goodreadsId: { type: Number },
	displayname: { type: String, required: true },
	currentlyreading_books: [],
	book_pages: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);