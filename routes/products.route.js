const express = require("express");
const router = express.Router();
const productData = require("../db/data");
const { Product } = require("../models/products.model");


router.route('/')
	.get(async (req, res) => {
		try {
			const products = await Product.find();
			res.json({ sucess: true, products });
		} catch (err) {
			res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
		}
	})

router.route("/:id")
	.get(async (req, res) => {
		try {
			const { id } = req.params;
			const product = await Product.findById(id);
			res.json({ success: true, product });

		} catch (err) {
			res.status(500).json({ success: false, message: "unable to get your product", errorMessage: err.message })
		}
	})

module.exports = router;