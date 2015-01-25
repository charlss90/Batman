var assert = require("chai").assert;
var mongoose = require("mongoose");
var Store = require("../../api/models/store");

var dbURI ='mongodb://localhost/test';
mongoose.connect(dbURI);

describe("Store test", function () {
	var storeData = {
		name: "My Store"
	};
	var storeId = null;
	it("Create a new store", function (done) {
		var newStore = new Store();
		newStore.removeAll(function (err) {
			if (!err) {
				newStore.create(storeData)
				.then(function (store) {
					try {
						assert.isNotNull(store, "The store is not null");
						assert.isNotNull(store._id, "The id is not null");
						assert.equal(store.name,storeData.name);
						storeId = store._id;
					} catch(ex) {
						throw ex;
					} finally {
						done();
					}
				}).fail(function (err) {
					try {
						assert.isNotNull(err, "Error is not null");
					} catch (ex) {
						throw ex;
					} finally {
						done();
					}
				});
			}
		});
	});

	it("Add address", function (done) {
		var newStore = new Store();

		newStore.addAddress(storeId, {
			street: "Calle palomares",
			number: 14,
			city: "Barcelona",
			code: "0887",
			country: "Spain"
		}).then(function (address) {
			try {
				console.log(address);
				assert.isNotNull(address, "Address is null");
			} catch (ex) {
				throw ex;
			} finally {
				done();
			}
		}).fail(function (err) {
			try {
				throw new Error("There are an unexcepted error");
			} catch (ex) {
				throw ex;
			} finally {
				done();
			}
		})
	});

});
				
