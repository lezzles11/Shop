const http = require("http");
const express = require("express");
const connectDB = require("./config/db");
// the app.js file we just set up
const app = require("./app");
const port = 3000;
connectDB();
// create server need to pass a listener!
// express qualfies as a request handler
const server = http.createServer(app);

server.listen(port);
