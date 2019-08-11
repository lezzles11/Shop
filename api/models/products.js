const mongoose = require("mongoose");

const ObjectId = Schema.Types.ObjectId;

let ProductSchema = new mongoose.Schema({
	ObjectId,
	name: {
		type: String
	},
	price: {
		type: Number
	}
});

ProductSchema.set("autoIndex", true);

module.exports = mongoose.model("Product", ProductSchema);
