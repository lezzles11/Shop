const mongoose = require("mongoose");
// mongoose = no sql data base, but relations (if databases are interlinked), better NOT to use mongodb
// want to use what PRODUCTS (from another database, was ordered)
let orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: {
		// get product id
		type: mongoose.Schema.Types.ObjectId,
		ref: "ProPro",
		required: true
	},
	// always store a quantity, so don't need required: true
	quantity: { type: Number, default: 1 }
});

let order = mongoose.model("OrdOrd", orderSchema);

module.exports = order;
