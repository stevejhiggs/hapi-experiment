var _ = require('lodash-node');
var mongopool = require('./mongopool');

module.exports = [
    { method: 'GET', path: '/products', handler: getAllProducts },
    { method: 'GET', path: '/products/{id}', handler: getProduct },
    { method: 'POST', path: '/products/add', handler: addProduct }
];

function getAllProducts (request, reply) {
	mongopool.db.collection('products', function(err, collection) {
       collection.find().toArray(function(err, items) {
            reply(items);
        });
    });
}

function getProduct (request, reply) {
	var id = request.params.id;
    console.log('Retrieving product: ' + id);
    mongopool.db.collection('products', function(err, collection) {
        collection.findOne({'_id': new mongopool.ObjectID(id)}, function(err, item) {
            reply(item);
        });
    });
}

function addProduct (request, reply) {
	var product = {
		name: request.payload.name
	};

	mongopool.collection('products', function(err, collection) {
        collection.insert(product, {safe:true}, function(err, result) {
            if (err) {
                reply({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                reply(result[0]);
            }
        });
    });
}