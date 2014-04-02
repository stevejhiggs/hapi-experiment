var _ = require('lodash-node');
var q = require('q');
var mongopool = require('./mongopool');

var productCollection = mongopool.db.collection('products');

module.exports = [
    { method: 'GET', path: '/products', handler: getAllProducts },
    { method: 'GET', path: '/products/{id}', handler: getProduct },
    { method: 'POST', path: '/products/add', handler: addProduct }
];

function getAllProducts (request, reply) {
	productCollection.find().toArray().then(function(items) {
        reply(items);
	});
}

function getProduct (request, reply) {
	var id = request.params.id;
	console.log('Retrieving product: ' + id);

	productCollection.findOne({'_id': mongopool.ObjectId(id)}).then(function(item) {
        reply(item);
	});
}

function addProduct (request, reply) {
	var product = {
		name: request.payload.name
	};

	console.log(product.name);

	productCollection.insert(product, {safe:true}).then(function(result) {
        if (result) {
        	console.log('Success: ' + JSON.stringify(result[0]));
            reply(result[0]);
        } else {
            reply({'error':'An error has occurred'});
        }
	});
}