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

// all the product routes will go through here - folder
const productRoute = require("./api/routes/products");
//make sure you always put this up, when you add a new route
const orderRoute = require("./api/routes/orders");
// MIDDLEWARE: incoming request has to go through app.use and whatever we pass to it
// only requests that start with this path
const userRoutes = require("./api/routes/user");

const USER = process.env.USERNAME_MONGODB;
const PASSWORD = process.env.PASSWORD_MONGODB;
const db = `mongodb+srv://${USER}:${PASSWORD}@cluster-21dks.mongodb.net/asdf?retryWrites=true&w=majority`;
mongoose.connect(db, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// do it before the routes
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
// what bodies do you want to parse? url encoded bodies ()
// true means that you are passing a lot of data, false is less
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// THIS IS IMPORTANT. ADJUST RESPONSE SO HEADERS MATCH. Prevent CORS Errors.
const allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	next();
};

app.use(allowCrossDomain);

// MIDDLEWARE - forwards to products and orders
//make sure you always put this up, when you add a new route
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/user", userRoutes);

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
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	res.status(404);
	next(err);
});

module.exports = app;
