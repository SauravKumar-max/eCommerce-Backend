const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishlistSchema = mongoose.Schema({
	_id: { 
		type: Schema.Types.ObjectId, 
		ref: "Product" 
	},
},{ timestamps: true });


const Wishlist = mongoose.model( "Wishlist", WishlistSchema );

module.exports = { Wishlist };