
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
	if (type == 3) return numeral(x).format("$0,0[.]00");
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

function toHHMMSS(id) {
	var sec_num = parseInt(id, 10);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;
	var secondstext = 0;
	var minutestext = 0;
	var hourstext = 0;
	if (hours > 0) {
		hourstext = hours + " hours ";
	} else {
		hourstext = "";
	}
	if (minutes > 0) {
		minutestext = minutes + " minutes ";
	} else {
		minutestext = "";
	}
	if (seconds > 0) {
		secondstext = seconds + " seconds ";
	} else {
		if (minutes > 0) {
			secondstext = "";
		} else {
			secondstext = "0 seconds";
		}
	}
	if (hours == 1) {
		hourstext = hours + " hour ";
	}
	if (minutes == 1) {
		minutestext = minutes + " minute ";
	}
	if (seconds == 1) {
		secondstext = seconds + " second ";
	}
	var time = hourstext + minutestext + secondstext;
	return time;
}

// Save and load functions
var canSave = 1;

// Sauvegarde le jeu au format JSON dans le localStorage
var save = function () {
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
	newprices();
	UPDATE();
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