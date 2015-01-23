"use strict";
var expect = require("chai").expect;
var should = require("chai").should;
var mongoose = require("mongoose");
var Bcrypt = require("bcrypt");
var User = require("../../api/users/core/user");

var dbURI ='mongodb://localhost/test';
mongoose.connect(dbURI);


describe("User test mode", function () {

    var name = "Carlos";
    var lastname = "Pazmiño Peralta";
    var username = "charlss90";
    var password = "mypassword";
    var email = "carlos.pazmino.developer@gmail.com";

    var newUser = {
        username: username,
        lastname: lastname,
        password: password,
        email: email
    };
    var user;

//    before(function(done) {
  //  });

    
    it("Register and create user", function (done) {
        user = new User(dbURI);
        user.removeAll(function (err, doc) {
            if(err) {
                done();
            } else {
                user.register(newUser).then(function (doc) {
                    should.exist(doc);
                    done();
                }).fail(function(err) {
                    should.exist(err);
                });
            }
        });
    });

    it("Login user", function (done) {
        var user = new User();
        user.login(username, password).then(function (token) {
            should.exist(token);
            done();
        }).fail(function (err){
            should.exist(err);
            done();
        });
    });

});

