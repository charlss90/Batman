var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    name: {type:String, required: true},
    lastname: {type:String, required: true},
    username: {type: String, unique: true, lowercase: true},
    password: {type:String, required: true},
    email: {type:String, required:true},
    createdOn: { type: Date, default: Date.now },
    modifyOn: { type: Date, default: Date.now },
    lastLogin: Date,
    tokens: [
        {value:String, date: Date}
    ]
});