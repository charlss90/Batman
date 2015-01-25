var Class = require("../core/class");
var Q = require("q");
var mongoose = require("mongoose");


module.exports = Class.extend({
	nameCollection: "Store",
	storeSchema: require("../schemes/store"),

	init: function () {
		this.storeModel = mongoose.Model(this.nameCollection, this.storeSchema);
	}
});