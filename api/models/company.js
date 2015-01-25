var Class = require("../core/class");
var Q = require("q");
var mongoose = require("mongoose");
var Bcrypt = require("bcrypt");

modules.exports = Class.extend({
	companySchema: mongoose.Schema({
		name: {type: String, require: true, unique: true},
		NIF: {type: String, require, true, unique:true}
	}),

	init: function () {

	}
});