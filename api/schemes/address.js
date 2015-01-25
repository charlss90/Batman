var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	street: {type: String, required: true, trim:true}, 
	number: {type: Number, required: true},
	city: {type: String, required: true. trim:true},
	code: Number,
	country: {type: String, required: true, trim:true}
});