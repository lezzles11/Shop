require("dotenv").config({ path: __dirname + "/.env" });
const http = require("http");
const connectDB = require("./db");
const mongoose = require("mongoose");
const express = require("express");
connectDB();
// the app.js file we just set up
const app = require("./app");
const port = 3000 || process.env.port;

// create server need to pass a listener!
// express qualfies as a request handler
const server = http.createServer(app);

server.listen(port);
