// make express application
// handle requests for us
const express = require("express");
// can use express' application and methods
const app = express();

// logging functions (see everything in console)
const morgan = require("morgan");
// stringify stuff
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// THIS IS IMPORTANT. ADJUST RESPONSE SO HEADERS MATCH. Prevent CORS Errors.
/*
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control-Allow-Methods",
			// All the words you want to support with your API
			"PUT, POST, PATCH, DELETE, GET"
		);
		return res.status(200).json({});
	}
});
*/

var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PATCH,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");

	next();
};

app.use(allowCrossDomain);

// all the product routes will go through here - folder
const productRoute = require("./api/routes/products");
//make sure you always put this up, when you add a new route
const orderRoute = require("./api/routes/orders");
// MIDDLEWARE: incoming request has to go through app.use and whatever we pass to it
// only requests that start with this path

// do it before the routes
app.use(morgan("dev"));

// what bodies do you want to parse? url encoded bodies ()
// true means that you are passing a lot of data, false is less
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MIDDLEWARE - forwards to products and orders
//make sure you always put this up, when you add a new route
app.use("/products", productRoute);
app.use("/orders", orderRoute);

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
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
