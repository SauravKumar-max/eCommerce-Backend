const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new mongoose.Schema({
	_id: {
		type: Schema.Types.ObjectId, 
		ref: "Product" 
	},
	quantity: Number,
})

const UserCartSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
	cart: [ CartSchema ]

}, { timestamps: true })

const Cart = mongoose.model( "Cart", UserCartSchema );

module.exports = { Cart };