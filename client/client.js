const host = `${window.location.protocol}//${window.location.hostname}`;
const { port } = window.location;
const base = port ? `${host}:${port}` : host;

export function getRooms() {
	return fetch(`http://localhost:8080`)
		.then(res => res.json())
		.catch(err => console.error(err));
}

export function setRoomState(id, callback) {
	return fetch(`http://localhost:8080/rooms?q=${id}`)
		.then(res => res.json())
		.catch(err => console.error(err));
}
