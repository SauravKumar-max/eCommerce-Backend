const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserWishlistSchema = mongoose.Schema({ 

	_id: Schema.Types.ObjectId, 
	wishlist: [{ 
		type: Schema.Types.ObjectId, 
		ref: "Product" 
	}],

}, { timestamps: true });


const Wishlist = mongoose.model( "Wishlist", UserWishlistSchema );

module.exports = { Wishlist };


