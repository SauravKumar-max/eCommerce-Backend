const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({

	name: {
		type: String, 
		required: true
	},

	username: {
		type: String,
		required: true,
		unique: [true, "username already exists!"]
	},

	email: {
		type: String, 
		required: true,
		unique: [true, "email already exists, please login!"],
		index: true
	},

	password: {
		type: String,
		required: true
	},

}, {timestamps: true}, { autoIndex: false });

const User = mongoose.model("User", UserSchema);

module.exports = { User };