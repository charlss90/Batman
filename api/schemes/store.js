var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	name: {type: String, require: true },
	addresses: [
		require("./address")
	],
	catalogs: [ {type:"ObjectId", ref: "Catalog"} ],
	valorations: [
		require("./valoration")
	],
	createdOn: { type: Date, default: Date.now },
    modifyOn: { type: Date, default: Date.now },
});