const express = require('express');
const router = express.Router();
const { Wishlist } = require('../models/wishlists.model');


router.route('/')
.get( async (req, res) => {
	try{
		const { userId } = req.user;
		let userWishlist = await Wishlist.findById({_id: userId}).populate('wishlist');
		if(userWishlist !== null){
			userWishlist = userWishlist.wishlist;
		}else{
			userWishlist = [];
		}
		res.json({ success: true, userWishlist });
	}catch(error){
		console.error(error);
	}
})

.post(async (req, res) => { 
	try{
		const { userId } = req.user;
	  const userRequest = req.body;
		const findUser = await Wishlist.findById({ _id: userId });
	
		if(findUser){
			findUser.wishlist.push(userRequest);
			const updatedWishlist = findUser.wishlist;
			await Wishlist.findByIdAndUpdate({_id: userId}, { wishlist: updatedWishlist });
			res.json({ success: true, updatedWishlist: findUser });
		}else{
			const newWishlistItem = { _id: userId, wishlist: [userRequest] };
			const newUserWishlist = new Wishlist(newWishlistItem);
			const saveWishlist = await newUserWishlist.save();
			res.json({ success: true, saveWishlist });
		}

	} catch(error){
		console.error(error);
	}
})



router.param("productId", async (req, res, next, productId) => {
	const { userId } = req.user;
	try{
		const userWishlist = await Wishlist.findById(userId);
		const product = userWishlist.wishlist.find(product => product == productId );

		if(!product){
			return res.status(400).json({success: false, message: "error in getting product"});
		}

		req.product =  {userWishlist, product};
		next();
	}catch{
		res.status(400).json({ success: false, message: "product not found!" });
	}
})

router.route('/:productId')
.get( async (req, res) => {
	try{
		const { product } = req.product;
		res.json({success: true, product});
	}catch(error){
		console.error(error);
	}
})

.delete( async (req, res) => {
	try{
			const { userWishlist, product } = req.product;
			const { _id, wishlist } = userWishlist;
			if(wishlist.length === 1){
				await userWishlist.remove();
				res.json({ success: true, product })
			}else{
				const filteredWishlist = wishlist.filter(id => id != product);
				await Wishlist.findByIdAndUpdate({_id }, { wishlist: filteredWishlist });
				res.json({ success: true, product })
			}
			
	} catch(error){
			console.error(error);
	}
})

module.exports = router;

	