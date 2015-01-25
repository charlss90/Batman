var Class = require("../core/class");
var Q = require("q");
var mongoose = require("mongoose");


module.exports = Class.extend({
	nameCollection: "Store",
	storeSchema: require("../schemes/store"),

	create: function (store) {
		var deferred = Q.defer();
		var newStore = new this.Store(store);
		newStore.save(function (err, _store) {
			if(err) deferred.reject(err);
			deferred.resolve(_store);
		});
		return deferred.promise;
	},

	addAddress: function (storeId, address) {
		var deferred = Q.defer();
		this.Store.findByIdAndUpdate(
		    storeId,
		    {$push: {"addresses": address}},
		    {safe: true, upsert: true},
		    function(err, model) {
		    	if (err)
		    		deferred.reject(err);
		        else
		        	deferred.resolve(address);
		    }
		);
		return deferred.promise;
	},

	removeAll: function (callback) {
		this.Store.remove(callback);
	},

	init: function () {
		this.Store = mongoose.model(this.nameCollection, this.storeSchema);
	}
});