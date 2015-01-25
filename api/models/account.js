var Class = require("../core/class");
var User = require("./user");
var Q = require("q");
var mongoose = require("mongoose");


module.exports = Class.extend({
	nameCollection: "Account"
	companySchema: require("../schemes/account"),

	createAccount: function (name, nif) {
		var deferred = Q.defer();

		var newAccount = new this.Account({
			name: name,
			nif: nif
		});

		newAccount.save(function (err, _account) {
			if (err)
				deferred.reject(err)
			else
				deferred.resolve(_account);
		});

		return deferred.promise;
	},

	/**
	* Return id of user
	**/
	addAdministrator: function (idAccount, user) {
		var deferred = Q.defer();

		this.Account.update({_id: idAccount}, function (err, _account) {
			if (err) 
				deferred.reject(err);
			else if (_account) {
				var newUser = new User();
				newUser.register(user).then(function (_user) {
					_account.administrators.push(_user._id);
					_account.save(function (err) {
						if (err) {
							err.userId = _user.id;
							deferred.reject(err);
						} else {
							deferred.resolve(_user._id);
						}
					});
				}).fail(function (err) {
					deferred.reject(err);
				});
			} else {
				deferred.reject({message: "Account doesn't exist"});
			}
		});
		return deferred.promise;
	},

	addStore: function (idAccount, store) {
		var deferred = Q.defer();
		var newStore = new Store();
		newStore.create(store).then(function(_store) {

			this.Account.findByIdAndUpdate(
			    idAccount,
			    {$push: {"store": _store._id}},
			    {safe: true, upsert: true},
			    function(err, model) {
			    	if (err)
			    		deferred.reject(err);
			        else
			        	deferred.resolve(_store._id);
			    }
			);
		}).fail(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	},

	init: function () {
		this.Account = mongoose.model(this.nameCollection, this.userSchema);
	}
});