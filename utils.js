//MISC FUNCTIONS

function fix(x, type) {
	if (type == 0) {
		if (x < 1000) return numeral(x).format("0a");
		else
			return numeral(x).format("0.0a");
	}
	if (type == 1) {
		if (x <= 1000) return numeral(x).format("0a");
		if (x > 1000) return numeral(x).format("0.0a");
		if (x > 10000) return numeral(x).format("0.00a");
	}
	if (type == 2) return numeral(x).format("0.0a");
	if (type == 3) return numeral(x).format("$0,00");
}

function getDate() {
	var today = new Date();
	var date = today.toLocaleDateString();
	var time = today.toLocaleTimeString();
	CurrentDate = date + " at " + time;
	return CurrentDate;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const toHHMMSS = function (seconds) {
	seconds = parseInt(seconds, 10);
	let CONFIG = {
		texts: [" hour", " minute", " second"],
		time: [Math.floor(seconds / 3600), Math.floor((seconds - (Math.floor(seconds / 3600) * 3600)) / 60), seconds - (Math.floor(seconds / 3600) * 3600) - (Math.floor((seconds - (Math.floor(seconds / 3600) * 3600)) / 60) * 60)]
	};
	for (let TYPE in CONFIG.time) {
		CONFIG.texts[TYPE] = CONFIG.time[TYPE] === 1 ? CONFIG.time[TYPE] + CONFIG.texts[TYPE] : CONFIG.time[TYPE] + CONFIG.texts[TYPE] + "s";
		if (CONFIG.time[TYPE] === 0 && TYPE != 2) CONFIG.texts[TYPE] = ``;
	}
	return `${CONFIG.texts[0]} ${CONFIG.texts[1]} ${CONFIG.texts[2]}`;
};

var canSave = 1;
var save = function () {
	if (canSave) {
		localStorage.setItem("DopeWars", JSON.stringify(player));
	}

	var tmp = new Date().getTime();
};

var load = function () {
	var savegame = JSON.parse(localStorage.getItem("DopeWars"));

	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') player[property] = savegame[property];
	}
	newprices();
	UPDATE();
};

var exportSave = function () {
	var saveData = btoa(JSON.stringify(player));
	if (document.queryCommandSupported("copy")) {
		$("#copyToClipboard").css({
			"visibility": "visible"
		});
	}
	$("#exportBody").html("<br><div class='ui form'><div class='ui field'><input type='text' id='saveCode' style='width:100%;'></div></div><button id='copyToClipboard' class='fluid ui red button' onclick='saveDataToClipboard()'>Copy all text</button>");
	$("#saveCode").val(saveData);
};

var saveDataToClipboard = function () {
	var textField = document.getElementById("saveCode");
	textField.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
};

var importSave = function () {
	var save = prompt("Paste a valid save code here");
	if (save) {
		restoreSave(save);
	}
};

var restoreSave = function (save) {
	try {
		var decoded = atob(save);
		JSON.parse(decoded);
		if (decoded) {
			localStorage.setItem("DopeWars", decoded);
			canSave = 0;
			location.reload();
		} else {
			$("#debugtext").html("ERROR: Invalid data");
		}
	} catch (err) {
		$("#debugtext").html("ERROR: Invalid data");
	}
};

var confirmReset = function () {
	var input = prompt("To confirm erasing your current save, write 6", "");
	if (input == 6) {
		canSave = 0;
		localStorage.clear();
		location.reload();
	}
};

var autodel = function () {
	localStorage.removeItem('DopeWars');
};

var ending = function () {
	localStorage.clear();
	location.reload();
};