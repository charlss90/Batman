var Class = require("../../core/class");
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

    userSchema: new mongoose.Schema({
        name: {type:String},
        lastname: String,
        username: {type: String, unique: true, lowercase: true},
        password: String,
        email: String,
        createdOn: { type: Date, default: Date.now },
        modifyOn: { type: Date, default: Date.now },
        lastLogin: Date,
        tokens: [
            {value:String, date: Date}
        ]
    }),

    register: function (user, callback) {
        var deferred = Q.defer();
        var self = this;

        cyphrePassword(user.password)
        .then(function (password) {
            user.password = password;
            var newUser = new self.User(user);
            newUser.save(function (err, doc) {
                if (err)
                    deferred.reject(err);
                else
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
                            
                            user.tokens.push(token);
                            user.update(function (err) {
                                if (err)
                                    deferred.reject(err);
                                deferred.resolve(token);
                            });
                        } else {
                            deferred.reject(err);
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
        this.User = mongoose.model(this.nameCollection, this.userSchema);
    }
});