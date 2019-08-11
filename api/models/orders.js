const mongoose = require("mongoose");

const ObjectId = Schema.Types.ObjectId;

let OrderSchema = new mongoose.Schema({
	productId: {
		type: String
	},
	quantity: {
		type: Number
	}
});

OrderSchema.set("autoIndex", true);

module.exports = mongoose.model("Order", OrderSchema);
