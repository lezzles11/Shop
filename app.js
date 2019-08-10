// make express application
// handle requests for us

const express = require("express");

// can use express' application and methods
const app = express();

// logging functions (see everything in console)
const morgan = require("morgan");

// all the prpoduct routes will go through here
// this is the folder
const productRoutes = require("./routes/products");
//make sure you always put this up, when you add a new route
const orderRoutes = require("./routes/orders");
// MIDDLEWARE: incoming request has to go through app.use and whatever we pass to it
// only requests that start with this path
// anything that will

// do it before the routes
app.use(morgan("dev"));

// MIDDLEWARE - forwards to products and orders
//make sure you always put this up, when you add a new route
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// needs to come after your routes
// handle every request that reaches this line (because products and orders did not handle this request)
app.use((req, res, next) => {
	// error available by default
	const error = new Error("not found");
	// 404 means you didn't find a route
	error.status(404);
	//forward error request
	next(error);
});

// handle almost all errors. This receives the error from the previous middleware
app.use((error, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
