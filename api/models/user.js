var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	goodreadsId: { type: Number },
	displayName: { type: String },
	books: [{ 
		totalPages: { type: Number },
		pagesRead: { type: Number },
		finishDate: { type: Date }
	}]  //refernce to the book schema??
});

module.exports = mongoose.model('User', userSchema);