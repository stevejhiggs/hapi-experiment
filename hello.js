module.exports = [
    { method: 'GET', path: '/hello/{name?}', handler: hello }
];


function hello (request, reply) {
	reply('hello ' + request.params.name);
}