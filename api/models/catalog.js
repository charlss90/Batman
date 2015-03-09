var Class = require("../core/class");
var Q = require("q");
var uuid = require("node-uuid");
var mongoose = require("mongoose");

module.exports = Class.extend({
    nameCollection: "Catalog",
    openSessions: 5,
    duplicateKey: 11000,

    catalogSchema: require("../schemes/user"),

    create: function (name) {
        var deferred = Q.defer();
        this.Catalog.create({
            name: name
        }, function (err, catalog) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(catalog);
        });
        return deferred.promise;
    },

    init: function () {
        this.Catalog = mongoose.model(this.nameCollection, this.catalogSchema);
    }
});