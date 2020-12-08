const v3 = require('node-hue-api').v3;
const config = require('../../config/default.json');
const USERNAME = config['hueUser'];

module.exports.getAllRooms = callback => {
	v3.discovery
		.nupnpSearch()
		.then(searchResults => {
			const host = searchResults[0].ipaddress;
			return v3.api.createLocal(host).connect(USERNAME);
		})
		.then(api => {
			return api.groups.getRooms();
		})
		.then(allRooms => {
			callback(allRooms);
		})
		.catch(err => {
			console.error(err);
		});
};
