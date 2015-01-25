var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	name: {type: String, require: true, unique: true, trim: true},
	createdOn: { type: Date, default: Date.now },
    modifyOn: { type: Date, default: Date.now },
});