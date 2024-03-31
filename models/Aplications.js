const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: String,
		required: true,
	},
	message: {
		type: String,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
