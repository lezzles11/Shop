const express = require("express");
const router = express.Router();

// get will handle incoming get requests
// this cannot be JUST /products, because that means it will be /products/products
// can split the different routes (E.g., /products/SUBURL IS ALL HERE )
router.get("/", (req, res, next) => {
	res.status(200).json({
		message: "handling get request to /products"
	});
});

// this will now handle post requests
router.post("/", (req, res, next) => {
	const product = {
		// name is name property - we should set up documentation which data need to work correctly
		name: req.body.name,
		price: req.body.price
	};
	res.status(200).json({
		message: "handling get request to /products",
		// returns name and price
		createdProduct: product
	});
});

// product is already at /products
// colon, and any name of your choice
router.get("/:id", (req, res, next) => {
	// extract product id
	const id = req.params.productId;
	if (id === "special") {
		res.status(200).json({
			message: "you discovered the special id!",
			id: id
		});
	} else {
		res.status(200).json({
			message: "You passed an ID"
		});
	}
});

router.patch("/:id", (req, res, next) => {
	res.status(200).json({
		message: "updated product"
	});
});

router.delete("/:id", (req, res, next) => {
	res.status(200).json({
		message: "delete product"
	});
});

// so ALl the routes above can be exported
module.exports = router;
