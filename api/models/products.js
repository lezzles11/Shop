const mongoose = require("mongoose");

let ProductSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	date: {
		type: Date
	}
});

let product = mongoose.model("ProPro", ProductSchema);

module.exports = product;
