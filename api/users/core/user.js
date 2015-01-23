var Class = require("../../core/class");



module.exports = Class.extend({

  name: "",
  lastname: "",

  toString: function () {
    return "name: " + this.name + " surname: " + this.lastname;
  },

  init: function (name, lastname) {
    this.name = name;
    this.lastname = lastname;
  }
});