var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	stock: {type: Number},
	catalog: [{type:ObjectId, ref:"Catalog"}],
	price: {
		total: {type: Number, required: true},
		subtotal: {type: Number, required: true},
		tax: {type: Number, required: true},
		discount: {type: Number, required: true}
	},
	createdOn: { type: Date, default: Date.now },
    modifyOn: { type: Date, default: Date.now },
});