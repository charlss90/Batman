var Class = require("../core/class");
var Q = require("q");
var uuid = require("node-uuid");
var mongoose = require("mongoose");
var Bcrypt = require("bcrypt");

var cyphrePassword = function (password) {
    var deferred = Q.defer();
    Bcrypt.genSalt(10, function(err, salt) {
        Bcrypt.hash(password, salt, function (err, hashPassword) {
            if (err)
                deferred.reject(err);
            else {
                deferred.resolve(hashPassword);
            }
        });
    });
    

    return deferred.promise;
};

module.exports = Class.extend({
    nameCollection: "User",
    openSessions: 5,
    duplicateKey: 11000,

    userSchema: require("../schemes/user"),

    register: function (user) {
        var deferred = Q.defer();
        var self = this;

        cyphrePassword(user.password)
        .then(function (password) {
            user.password = password;
            var newUser = new self.User(user);
            newUser.save(function (err, doc) {
                if (err) {
                    if (err.code == self.duplicateKey)
                        err.message = user.username + " user exists";
                    deferred.reject(err);
                } else
                    deferred.resolve(doc);
            });
        }).fail(function(err) {
            deferred.reject(err);
        });

        //deferred.promise.notify(callback);
        return deferred.promise; 
    },

    removeAll: function (callback) {
        return this.User.remove(callback);
    },

    find: function (user, callback) {
        this.User.find(user, callback);
    },
            
    login: function (username, password) {
        var self = this;
        var deferred = Q.defer();
        self.User.findOne({username: username}, function (err, user) {
            if (!err) {
                if (user) {
                    Bcrypt.compare(password, user.password, function (err, isValid) {
                        if (isValid) {
                            var token = uuid.v1();
                            if (user.tokens.length > self.openSessions)
                                user.tokens.splice(user.tokens.length-1, 1);
                            var timestamp = new Date().getTime();
                            user.lastLogin = timestamp;
                            user.tokens.push({value: token, date: timestamp});
                            user.save(function (err) {
                                if (err)
                                    deferred.reject(err);
                                else 
                                    deferred.resolve(token);
                            });
                        } else {
                            deferred.reject({message: "User and password incorrect"});
                        }
                    });
                } else {
                    deferred.reject({message: "User doesn't exist's"});
                }
                    
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise;
    },
    init: function () {

        //var User = mongoose.model(this.nameCollection);
        this.User = mongoose.model(this.nameCollection, this.userSchema);
    }
});