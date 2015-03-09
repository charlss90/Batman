var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	name: {type: String, require: true, unique: true},
	nif: {type: String, require: true, unique:true},
	addresses: [
		require("./address")
	],
	stores: [
		{type: "ObjectId", ref: "Store", unique: true}
	],
	catalogs: [
		{type: "ObjectId", ref: "Catalog"}
	],
	administrators: [
		{type: "ObjectId", ref: "User"}
	],	
	createdOn: { type: Date, default: Date.now },
    modifyOn: { type: Date, default: Date.now },
})