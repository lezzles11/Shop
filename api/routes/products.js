const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ProPro = require("../models/products");
// get will handle incoming get requests
// this cannot be JUST /products, because that means it will be /products/products
// can split the different routes (E.g., /products/SUBURL IS ALL HERE )
router.get("/", (req, res, next) => {
	// if you don't pass anything in here, it will find all elements
	ProPro.find()
		.exec()
		.then(docs => {
			console.log(docs);
			if (docs.length >= 0) {
				res.status(200).json(docs);
			} else {
				res.status(200).json({
					message: "No entries found"
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

// works (after creating config/db.js)
// this will now handle post requests
router.post("/", (req, res, next) => {
	// new product as a constructor
	console.log(req.body.name);
	console.log(req.body.price);
	const newProduct = new ProPro({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		date: new Date()
	});
	// save is a method -> stores mongoose models / data into the database
	// then
	newProduct
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "handling get request to /products",
				// returns name and price
				createdProduct: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});
// WORKS
// product is already at /products
// colon, and any name of your choice
router.get("/:productId", (req, res, next) => {
	// extract product id
	const id = req.params.productId;
	// static methods on the const you already declared
	ProPro.findById(id)
		.exec()
		.then(doc => {
			console.log("From database: ", doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message: "no valid entry found for id"
				});
			}
		})
		// dont want to send res.send after catch
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.patch("/:productId", (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	// turn reqbody into an array
	for (const ops of req.body) {
		// ops.propName will be name or price
		updateOps[ops.propName] = ops.value;
	}
	// $set describes key value pairs and how to update them
	// use set because you might not get both new name and price
	ProPro.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});
// delete product came up - does it actually delete the product?
router.delete("/:productId", (req, res, next) => {
	const id = req.params.productId;
	ProPro.remove({
		_id: id
	})
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

// so ALl the routes above can be exported
module.exports = router;
