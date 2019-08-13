const mongoose = require("mongoose");
// mongoose = no sql data base, but relations (if databases are interlinked), better NOT to use mongodb
// want to use what PRODUCTS (from another database, was ordered)
let userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

let user = mongoose.model("User", userSchema);

module.exports = user;
