import { getRooms, setRoomState } from './client.js';
import xyBriToHex from './xybToHex.js';

window.addEventListener('DOMContentLoaded', async _ => {
	loadHel();
	const rooms = await getRooms();
	rooms.forEach(room => {
		const rd = room._data;
		makeRoom(rd);
	});
});

async function getBgColor(action) {
	return (await !action.on)
		? xyBriToHex(action.xy[0], action.xy[1], action.bri)
		: '#888888';
}

async function check(checkbox) {
	const id = checkbox.id.substring(6);
	const label = checkbox.nextElementSibling;
	const room = await setRoomState(id);
	const rd = room._data;
	const hex = await getBgColor(rd.action);
	label.style.backgroundColor = hex;
	console.log(hex);
}

const makeRoom = rd => {
	const roomsDiv = document.querySelector('.rooms');
	const isChecked = rd.action.on ? 'checked' : '';
	const hex = isChecked
		? xyBriToHex(rd.action.xy[0], rd.action.xy[1], rd.action.bri)
		: '#888888';
	const oneRoom = document.createElement('div');
	oneRoom.classList.add('room');
	oneRoom.innerHTML = `
	<div class="room-stripe" style="background-color:${hex}"></div>
	<div class="room-text"><span class="text-span">${rd.name}</span></div>
	<div class="room-switch"><input type="checkbox" id="input_${rd.id}" ${isChecked} onclick="check(this)"/>
	<label style="background-color:${hex}" for="input_${rd.id}">Toggle</label></div>`;
	roomsDiv.innerHTML += oneRoom.outerHTML;
};

const updateRoom = (id, hex) => {
	const checkbox = document.querySelector(`#input_${id}`);
	checkbox.checked = !checkbox.checked;
	const label = checkbox.nextElementSibling;
	label.style.backgroundColor = hex;
};

const loadHel = () => {
	const helDiv = document.querySelector('.hel');
	const helImg = document.createElement('div');

	helImg.innerHTML =
		'<img src="images/HAL9000.svg.png" width="50" height="50" />';
	helDiv.appendChild(helImg);

	helImg.addEventListener('click', () => {
		onHalPressed();
	});
};

const onHalPressed = () => {
	try {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.continuous = false;

		recognition.start();

		recognition.onresult = e => {
			onRecognitionResult(e);
		};
	} catch (e) {
		console.error(e);
	}
};

const onRecognitionResult = event => {
	const helTextArea = document.querySelector('#note-textarea');
	const current = event.resultIndex;

	const transcript = event.results[current][0].transcript;
	helTextArea.value = transcript;
	useTransscript(transcript);
};

const useTransscript = async transcript => {
	// prettier-ignore
	if (transcript.match(/(turn on|put on|activate|switch on|turn off|put out|deactivate|de-activate|switch off)/g)) {
		const rooms = await getRooms();
		rooms.forEach(async (room) => {
			const rd = room._data;
			if (transcript.includes(rd.name.toLowerCase())) {
				await setRoomState(rd.id)
				const hex = !rd.action.on ? xyBriToHex(rd.action.xy[0], rd.action.xy[1], rd.action.bri): '#888888';
				updateRoom(rd.id, hex)
			}
		});
	}
};

window.check = check;
