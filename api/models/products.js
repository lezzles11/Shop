const mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		trim: true
	},
	price: {
		type: Number,
		trim: true
	},
	date: {
		type: Date
	}
});

ProductSchema.set("autoIndex", true);

let product = mongoose.model("ProPro", ProductSchema);

module.exports = product;
