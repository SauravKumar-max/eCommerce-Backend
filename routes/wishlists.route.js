const express = require('express');
const router = express.Router();
const { Product } = require("../models/products.model");
const { Wishlist } = require('../models/wishlists.model');


router.route('/')
.get( async (req, res) => {
	try{
		let wishlist = await Wishlist.find({}).populate('_id');
		wishlist = wishlist.map(item => item._id);
		res.json({ success: true, wishlist });
	}catch(error){
		console.error(error);
	}
})

.post(async (req, res) => {
	try{
		const newWishlistItem = req.body;
		const AddWishlistItem = new Wishlist(newWishlistItem);
		const saveWishlist = await AddWishlistItem.save();
		res.json({ success: true, saveWishlist });
	}catch(error){
		console.error(error);
	}
})

router.param("productId", async (req, res, next, productId) => {
	try{

		const product = await Wishlist.findById(productId);

		if(!product){
			return res.status(400).json({success: false, message: "error in getting product"})
		}

		req.product = product;
		next();
	}catch{
		res.status(400).json({success: false, message: "product not found!"})
	}
	
})


router.route('/:productId')
.get(async (req, res) => {
	try{
		const { product } = req;
		res.json({success: true, product});
	}catch(error){
		console.error(error);
	}
})

.delete( async (req, res) => {
	try{
		const { product } = req;
		await product.remove();
		res.json({success: true, product})
	}catch(error){
		console.error(error);
	}
})

module.exports = router;
