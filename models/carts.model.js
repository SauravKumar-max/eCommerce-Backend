const mongoose = require("mongoose");
const { Schema} = mongoose;

const CartSchema = new mongoose.Schema({
	_id: {type: Schema.Types.ObjectId, ref: "Product" },
	quantity: Number,

}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema)

module.exports = { Cart };