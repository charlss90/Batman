"use strict";
var expect = require("chai").expect;
var should = require("chai").should;
var assert = require("chai").assert;
var mongoose = require("mongoose");
var Bcrypt = require("bcrypt");
var User = require("../../api/models/user");

var dbURI ='mongodb://localhost/test';
mongoose.connect(dbURI);

var timeout = 15000;


describe("User test mode", function () {
    var name = "Carlos";
    var lastname = "Pazmiño Peralta";
    var username = "charlss90";
    var password = "mypassword";
    var email = "carlos.pazmino.developer@gmail.com";

    var newUser = {
        name: name,
        username: username,
        lastname: lastname,
        password: password,
        email: email
    };
    var user;

    
    it("Register and create user", function (done) {
        user = new User();
        user.removeAll(function (err, doc) {
            if(err) {
                done();
            } else {
                user.register(newUser).then(function (_user) {
                    try {
                        assert.equal(_user.name, name);
                        assert.equal(_user.lastname, lastname);
                        assert.equal(_user.username, username);
                        assert.equal(_user.email, email);
                    } catch (ex) {
                        throw ex;
                    } finally {
                        done();
                    }

                }).fail(function(err) {
                    try {
                        assert.notOk(true, "Error controlador");
                    } catch (ex) {
                        throw ex;
                    } finally {
                        done();
                    }
                });
            }
        });
    });
    
    it("Register same user", function (done) {
        user = new User();

        user.register(newUser).then(function (_user) {
            try {
                throw new Errr("Doesn't not register");
            } catch (ex) {
                throw ex;
            } finally {
                done();
            }

        }).fail(function(err) {
            try {
                assert.isNotNull(err, "Error controlador");
            } catch (ex) {
                throw ex;
            } finally {
                done();
            }
        });

    });

    it("Register another user", function (done) {
        var anotherUser = new User();
        var fulgen = {
            name: "Fulgencio",
            lastname: "Pancracio apolodoro",
            username: "fulgen",
            password: "fulgen",
            email: "fulgen@gmail.com"
        };

        anotherUser.register(fulgen).then(function (_user) {
            try {
                assert.equal(_user.name, fulgen.name);
                assert.equal(_user.lastname, fulgen.lastname);
                assert.equal(_user.username, fulgen.username);
                assert.equal(_user.email, fulgen.email);
            } catch (ex) {
                throw ex;
            } finally {
                done();
            }

        }).fail(function(err) {
            try {
                assert.notOk(true, "Error controlador");
            } catch (ex) {
                throw ex;
            } finally {
                done();
            }
        });

    });

    it("Incomplete user", function (done) {
        user = new User();

        delete newUser.email;

        user.register(newUser).then(function (_user) {
            try {
                throw new Errr("Doesn't not register because there are missing values");
            } catch (ex) {
                throw ex;
            } finally {
                done();
            }

        }).fail(function(err) {
            try {
                assert.isNotNull(err, "Error controlador");
            } catch (ex) {
                throw ex;
            } finally {
                done();
            }
        });

    });
    

    it("Sign in user", function (done) {
        var user = new User();
        user.login(username, password).then(function (token) {
            try {
                assert.isNotNull(token, "This not exist token");
            } catch(ex) {
                throw ex;
                //console.log("Error: "+ex.message);
            } finally {
                done();
            } 
        }).fail(function (err) {
            try {
                console.log(err);
                assert.isNull(err, "Trigger error when it doesn't exists");
            } catch(ex) {
                throw ex;
            } finally {
                done();
            }
        });
    });

    it("Login password doesn't maching", function(done) {
        var user = new User();
        user.login(username, "password").then(function (token) {
            try {
                throw new Error("Password doesn't matching, but login function");
            } catch(ex) {
                throw ex;
            } finally {
                done();
            } 
        }).fail(function (err) {
            try {
                var message = "User and password incorrect";
                assert.equal(err.message, message, "Incorrect error");
            } catch(ex) {
                throw ex;
            } finally {
                done();
            }
        });
    });

});

