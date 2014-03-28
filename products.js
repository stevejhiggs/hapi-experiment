var _ = require('lodash-node');




module.exports = [
    { method: 'GET', path: '/products', handler: getAllProducts },
    { method: 'GET', path: '/products/{id}', handler: getProduct },
    { method: 'POST', path: '/products/add', handler: addProduct }
];

function getAllProducts (request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

	db.collection('products', function(err, collection) {
       collection.find().toArray(function(err, items) {
            reply(items);
        });
    });
}

function getProduct (request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

	var id = request.params.id;
    console.log('Retrieving product: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'_id':new new ObjectID(request.params.id)}, function(err, item) {
            reply(item);
        });
    });
}

function addProduct (request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

	var product = {
		name: request.payload.name
	};

	db.collection('products', function(err, collection) {
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