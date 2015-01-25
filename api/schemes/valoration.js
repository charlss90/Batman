var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	title: {type: String, required: true},
	body: {type: String, required: true},
	user: {type: "ObjectId", required: true},
	createOn: {type: Date, required: true}
});