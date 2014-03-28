var Hapi = require('hapi');
var hello = require('./hello');
var products = require('./products');

var dbOpts = {
    "url": "mongodb://localhost:27017/test",
    "options": {
        "db": {
            "native_parser": false
        }
    }
};

// Create a server with a host and port
var server = new Hapi.Server('0.0.0.0', 8000);

server.pack.require('hapi-mongodb', dbOpts, function(err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

// Add the route
server.route(hello);
server.route(products);
server.start();