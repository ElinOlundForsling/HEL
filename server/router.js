const url = require('url');
const qs = require('querystring');

function ok(res, result) {
	res.statusCode = 200;
	res.end(JSON.stringify(result));
}

function methodNotAllowed(res) {
	res.statusCode = 405;
	res.setHeader('Allow', 'GET');
	res.end();
}

function serverError(res) {
	res.statusCode = 500;
	res.end('Server Error');
}

function badRequest(res, msg) {
	res.statusCode = 400;
	let error = { error: msg };
	error = JSON.stringify(error);
	res.end(error);
}

function create(hue) {
	return {
		route: (req, res) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			if (req.method === 'GET') {
				const parsed = url.parse(req.url);
				const query = qs.parse(parsed.query);
				if (query.q) {
					hue.setRoomState(query.q).then(room => ok(res, room));
				} else {
					hue.getAllRooms(rooms => ok(res, rooms));
				}
			} else {
				methodNotAllowed(res);
			}
		},
	};
}

module.exports.create = create;
