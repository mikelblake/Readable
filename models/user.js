var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	goodreadsId: { type: Number, required: true },
	read_pages: { type: Number }
});

module.exports = mongoose.model('User', userSchema);