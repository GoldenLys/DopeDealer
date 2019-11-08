
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