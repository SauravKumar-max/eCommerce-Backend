const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
	
	_id: Schema.Types.ObjectId,
	name: String,
  image: String,
  price: Number,
  brand: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  quantity: Number,
  ratings: Number,
  offer: String,

},{ timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };