const express = require("express");
const router = express.Router();
const ProPro = require("../models/products");
const mongoose = require("mongoose");
const multer = require("multer");
// initializes multer - specifies a folder in which all incoming files will be stored

// multer will execute these functions whenever a file is receieved
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
// creating filter for uploading images
const fileFilter = (req, file, cb) => {
	// if it is jpeg or png, accept it
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

// IF WANT TO REPLACE WITH ANOTHER OBJECT, LOOK FOR THE VAR "REPLACE".

// REPLACE

// get will handle incoming get requests
// this cannot be JUST /products, because that means it will be /products/products
// can split the different routes (E.g., /products/SUBURL IS ALL HERE )

// don't need to protect this route, because you want to let users see this part
router.get("/", (req, res, next) => {
	// if you don't pass anything in here, it will find all elements
	ProPro.find()
		// REPLACE; define what fields you want to select
		.select("name price _id productImage")
		.exec()
		.then(docs => {
			// REPLACE; what if you want to add more data? create an object
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return {
						// REPLACE; pass ANYTHING you want here
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,
						_id: doc._id,
						request: {
							type: "GET",
							url: "http://localhost:3000/products/" + doc._id
						}
					};
				})
			};
			console.log(response);
			if (docs.length >= 0) {
				res.status(200).json(response);
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
// upload.single() means getting one file only
router.post("/", upload.single("productImage"), (req, res, next) => {
	console.log(req.file);
	// REPLACE; new product as a constructor
	console.log(req.body.name);
	console.log(req.body.price);
	// REPLACE;
	const newProduct = new ProPro({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path,
		date: new Date()
	});
	// save is a method -> stores mongoose models / data into the database
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
		// REPLACE;
		.select("name price _id productImage")
		.exec()
		.then(doc => {
			console.log("From database: ", doc);
			if (doc) {
				// REPLACE;
				res.status(200).json({
					product: doc,
					description: "Get all Products",
					request: {
						type: "GET",
						url: "http://localhost:3000/products"
					}
				});
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

//You want to protect this route - that not every user can access this route
// when updating, input data like so: [{"propName": "name", "value": "something more useful" }]
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
		// REPLACE;
		.select("_id name price")
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				// REPLACE;
				message: "Product updated",
				request: {
					type: "get",
					url: "http://localhost:3000/products/" + id
				}
			});
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
			res.status(200).json({
				message: "product deleted",
				request: {
					type: "POST",
					// notifying others what you can do
					url: "http://localhost:3000/",
					// REPLACE;
					data: { name: "String", price: "Number" }
				}
			});
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
