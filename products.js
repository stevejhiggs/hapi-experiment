var _ = require('lodash-node');

module.exports = [
    { method: 'GET', path: '/products', handler: getAllProducts },
    { method: 'GET', path: '/products/{id}', handler: getProduct },
    { method: 'POST', path: '/products/add', handler: addProduct }
];


var products = [
	{
		id: 1,
		name: 'fish'
	},
	{
		id:2,
		name: 'chips'
	}
]

function getAllProducts (request, reply) {
	reply(products);
}

function getProduct (request, reply) {
	reply(_.where(products, {'id': _.parseInt(request.params.id)}));
}

function addProduct (request, reply) {
	var product = {
		id: products[products.length -1].id + 1,
		name: request.payload.name
	};

	products.push(product);
	reply(product);
}