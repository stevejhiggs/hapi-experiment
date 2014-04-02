var Hapi = require('hapi');
var hello = require('./hello');
var products = require('./products');

// Create a server with a host and port
var server = new Hapi.Server('0.0.0.0', 10000);

// Add the route
server.route(hello);
server.route(products);
server.start();