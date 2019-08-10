const http = require("http");

// the app.js file we just set up
const app = require("./app");
const port = process.env.PORT || 3000;

// create server need to pass a listener!
// express qualfies as a request handler
const server = http.createServer(app);

server.listen(port);
