// Save and load functions
var canSave = 1;

// Sauvegarde le jeu au format JSON dans le localStorage
var save = function () {
	var date = new Date();
	if (canSave) {
		localStorage.setItem("DopeDealer", JSON.stringify(player));
	}

	var tmp = new Date().getTime();
};


// R�cup�re la sauvegarde depuis le localStorage
var load = function () {
	var savegame = JSON.parse(localStorage.getItem("DopeDealer"));

	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') player[property] = savegame[property];
	}

	var date = new Date();
	$("#cityname").val(player.name);
	newprices();
	updateprogression();
};

var exportSave = function () {
	var saveData = btoa(JSON.stringify(player));
	if (document.queryCommandSupported("copy")) {
		$("#copyToClipboard").css({ "visibility": "visible" });
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
	console.log(save);
	if (save) {
		restoreSave(save);
	}
};

var restoreSave = function (save) {
	try {
		var decoded = atob(save);
		JSON.parse(decoded);
		if (decoded) {
			localStorage.setItem("DopeDealer", decoded);
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
	localStorage.removeItem('DopeDealer');
};

var ending = function () {
	localStorage.clear();
	location.reload();
};