const v3 = require('node-hue-api').v3,
	GroupLightState = v3.lightStates.GroupLightState;
const config = require('../../config/default.json');
const USERNAME = config['hueUser'];

module.exports.setRoomState = async id => {
	const searchresults = await v3.discovery.nupnpSearch();
	const host = searchresults[0].ipaddress;
	const api = await v3.api.createLocal(host).connect(USERNAME);
	const state = await api.groups.getGroup(id);
	const groupState = state.action.on
		? new GroupLightState().off()
		: new GroupLightState().on();
	await api.groups.setGroupState(id, groupState);
	console.log(state);
	return state;
};
