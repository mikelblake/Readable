var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	goodreadsId: { type: Number, required: true },
	displayname: { type: String },
	// currentlyreading_books: [],
	// book_pages: { type: Number }
});

module.exports = mongoose.model('User', userSchema);