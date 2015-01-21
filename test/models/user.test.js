"use strict";
var expect = require("chai").expect;
var User = require("../../api/users/core/user");

describe("User test mode", function () {

  it("Constructor class", function () {
    var name = "Carlos";
    var lastname = "Pazmiño Peralta";
    var carlos = new User(name, lastname);
    expect(carlos.name).to.equal(name);
    expect(carlos.lastname).to.equal(lastname);
  });
});

