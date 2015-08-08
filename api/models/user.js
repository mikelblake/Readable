var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	goodreadsId: { type: Number, required: true },
	books: { }  //needs to be a refernce to the book schema
});

module.exports = mongoose.model('User', userSchema);