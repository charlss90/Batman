"use strict";
var expect = require("chai").expect;
var mongoose = require("mongoose");
var Bcrypt = require("bcrypt");
// var User = require("../../api/users/core/user");

describe("User test mode", function () {
    console.log("User test");
    // var dbURI = 'mongodb://localhost/test';
    // mongoose.connect(dbURI);

    // mongoose.connection.on('connected', function () {
    //  console.log('Mongoose connected to ' + dbURI);
    // });
    // mongoose.connection.on('error',function (err) {
    //  console.log('Mongoose connection error: ' + err);
    // });
    // mongoose.connection.on('disconnected', function () {
    //  console.log('Mongoose disconnected');
    // });

    // var mongoose = require('mongoose');
    // it("save kitty", function () {
    beforeEach(function(done) {
        console.log("Fuck!!!!!!");
        mongoose.connect('mongodb://localhost/test');

        var Cat = mongoose.model('Cat', { name: String });

        var kitty = new Cat({ name: 'Zildjian' });
        kitty.save(function (err) {
            if (err) // ...
                console.log(err);
            // expect(err).to.be.a(undefined);
            console.log('meow');
            done();
        });
    });

    it("kitty save", function () {
        var Cat = mongoose.model('Cat', { name: String });
        Cat.find({name: "Zildjian"}, function(err, doc) {
            console.log(err);
            console.log(doc);
        });
    });
    // });


    // var name = "Carlos";
    // var lastname = "Pazmiño Peralta";
    // var username = "charlss90";
    // var password = "mypassword";
    // var email = "carlos.pazmino.developer@gmail.com";

    // it("Constructor class", function () {
    //     var user = new User(dbURI);
    // });
    // beforeEach(function (done) {
    //     it("Create User", function () {
    //         var debug = console.log;
    //         var user = new User(dbURI);
    //         user.register({
    //             username: username,
    //             password: password,
    //             name: name,
    //             lastname: lastname,
    //             email: email
    //         }, function (err) {
    //             if (!err) {
    //                 console.log("Register Success");
    //             } else {
    //                 console.log(err);
    //             }
    //             done();
    //         });
    //     });
    // });
    // beforeEach(function (done) {
    //     it("Find User", function () {
    //         var debug = console.log;
    //         var user = new User(dbURI);
    //         user.find({
    //             username: username,
    //         }, function (err, doc) {
    //             console.log(doc);
    //             if (!err) {
    //                 console.log("Register Success");
    //             } else {
    //                 console.log(err);
    //             }
    //             done();
    //         });
    //     });
    // });


});

