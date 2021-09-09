const express = require("express");
const router = express.Router();
const { Cart } = require("../models/carts.model");
const { extend } = require("lodash");


router.route("/")
.get(async (req, res) => {
	try{
		const { userId } = req.user;
		let userCart = await Cart.findById({_id: userId}).populate("cart._id");

		if(userCart !== null){
			userCart = userCart.cart.map(item => {
				const { _id, quantity } = item
				return Object.assign( _id, { quantity });
			});
		} else{
				userCart = [];
		} 
		res.json({success: true, userCart});
	}catch(error){
		console.log(error);
}
})


.post(async (req, res) => {
	try{
		const { userId } = req.user;
	  const userRequest = req.body;
		const findUser = await Cart.findById({ _id: userId });
	
		if(findUser){
			findUser.cart.push(userRequest);
			const updatedCart = findUser.cart;
			await Cart.findByIdAndUpdate({_id: userId}, { cart: updatedCart });
			res.json({ success: true, updatedCart });
		}else{
			const newCartItem = { _id: userId, cart: [userRequest] };
			const newUserCart = new Cart(newCartItem);
			const saveCart = await newUserCart.save();
			res.json({ success: true, saveCart });
		}
	}catch(error){
		console.error(error);
	}
})


router.param("productId", async (req, res, next, productId) => {
	try{
		const { userId } = req.user;
		const userCart = await Cart.findById(userId);
		const product = userCart.cart.find(product => product._id == productId);
		
		if(!product){
			return res.status(400).json({success: false, message: "error in getting product"})
		}
		req.product = { userId, userCart, product };
		next();

	}catch{
		res.status(400).json({success: false, message: "product not found!"})
	}
	
})


router.route('/:productId')
.get( async (req, res) => {
	try{
		const { product } = req.product;
		res.json({ success: true, product });
	}catch(error){
		console.error(error);
	}
})

.post(async (req, res) => {
	try{
		const { userId, userCart, product } = req.product;
		const { quantity } = req.body;

		const updatedCart = userCart.cart.map(item => 
			item._id == product._id ? Object.assign(item, {quantity}) : item 
		);

		await Cart.findByIdAndUpdate({_id: userId}, {cart: updatedCart});

		res.json({success: true, quantity });
	}catch(error){
		console.error(error);
	}
})

.delete(async (req, res) => {
	try{
		const { userId, userCart, product } = req.product;
		const { cart } = userCart;
		if(cart.length === 1){
			await userCart.remove();
			res.json({ success: true, product});
		}else{
			const filteredCart = userCart.cart.filter(item => item._id != product._id);
			await Cart.findByIdAndUpdate({_id: userId}, {cart: filteredCart});
			res.json({ success: true, product});
		}
		
	}catch(error){
		console.log(error);
	}
})


module.exports = router;