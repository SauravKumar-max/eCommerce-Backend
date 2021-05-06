const express = require("express");
const router = express.Router();
const { Cart } = require("../models/carts.model");
const { extend } = require("lodash");


router.route("/")
.get(async (req, res) => {
	try{
		let cart = await Cart.find().populate("_id");
		cart = cart.map(item => {
			const { _id, ..._doc } = item._id._doc;
			 return { _id, ..._doc, quantity: item.quantity};
			});
		res.json({success: true, cart});
	}catch(error){
		console.log(error);
	}
})

.post(async (req, res) => {
	try{
		const newCartItem = req.body;
		const AddCartItem = new Cart(newCartItem)
		const saveCart = await AddCartItem.save();
		res.json({success: true, saveCart});
	}catch(error){
		console.error(error);
	}
})

router.param("productId", async (req, res, next, productId) => {
	try{

		const product = await Cart.findById(productId);

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
.get( async (req, res) => {
	try{
		const { product } = req;
		res.json({ success: true, product });
	}catch(error){
		console.error(error);
	}
})

.post(async (req, res) => {
	try{
		const { productId } = req.params;
		const { quantity } = req.body;
		await Cart.findByIdAndUpdate(productId, {quantity});
		res.json({success: true, quantity });
	}catch(error){
		console.error(error);
	}
})

.delete(async (req, res) => {
	try{
		const { product } = req;
		await product.remove();
		res.json({ success: true, product});
	}catch(error){
		console.log(error);
	}
})

module.exports = router;