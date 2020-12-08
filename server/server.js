const http = require('http');
const hue = require('./hue-api');
const router = require('./router');

const resource = router.create(hue);

const port = 8080;

const server = http
	.createServer((req, res) => resource.route(req, res))
	.listen(port);

server.on('listening', () =>
	console.log('Server is listening on port', server.address().port)
);
