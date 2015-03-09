var assert = require("chai").assert;
var mongoose = require("mongoose");
var Account = require("../../api/models/account");

var dbURI ='mongodb://localhost/test';
mongoose.connect(dbURI);

describe("Account Test", function () {
    it("Create Account", function (done) {
        var accountName = "Kratos engine";
        var accountNif = "123456L";
        var newAccount = new Account();
        newAccount.Account.remove(function (err, doc) {
            if (!err) {
                newAccount.create(accountName, accountNif, {
                    name: "Carlos",
                    lastname: "Pazmiño Peralta",
                    username: "chraz90",
                    password: "carlos",
                    email: "chraz90@gmail.com"
                }).then(function (userId) {
                    console.log(userId);
                    try {
                        assert.isNotNull(userId, "Doesn't register client");
                    } catch (ex) {
                        throw ex;
                    } finally {
                        done();
                    }
                }).fail(function (err) {
                    try {
                        throw new Error("Doesn't create account");
                    } catch (ex) {
                        throw ex;
                    } finally {
                        done();
                    }
                });
            } else 
                done();
        });
    });
});