var Class = require("../../core/class");
var mongoose = require("mongoose");
var Bcrypt = require("bcrypt");

mongoose.connection.on('connected', function () {
 console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
 console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
 console.log('Mongoose disconnected');
});



module.exports = Class.extend({
    nameCollection: "User",
    urlDataBase: null,
    getConnection: function ()  {
        return (this.urlDataBase) ? mongoose.createConnection(this.urlDataBase) : null;
    },

    userSchema: new mongoose.Schema({
        name: String,
        lastname: String,
        username: String,
        password: String,
        email: String,
        createdOn: { type: Date, default: Date.now },
        modifyOn: { type: Date, default: Date.now },
        lastLogin: Date
    }),

    register: function (user, callback) {

        mongoose.connect(this.urlDataBase);
        var newUser = new this.User(user);
        newUser.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success");
            }
            callback(err);
        });

        // this.userModel.create(user, function (err, _user) {
        //     var isRegister = false;
        //     if(!err) {
        //         console.log("Register Success");
        //         console.log(JSON.stringify(_user));
        //         isRegister = true;
        //         callback();
        //     }
        //     console.log(err);
        //     callback(err);
        // });

    },

    find: function (user, callback) {
        this.User.find(user, function (err, doc) {
            console.log(err);
            console.log(doc);
            callback(err, doc);
        });
    },
            

    init: function (urlDataBase) {
        this.urlDataBase = urlDataBase;
        this.User = mongoose.model(this.nameCollection, this.userSchema);
    }
});