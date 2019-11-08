var version = "0.2";
var usutext = "";
var sactexte = "0";
var enemylifetext = "";
var DRUGSTYPE = ["normal", "normal", "normal", "normal", "normal", "normal"];
var DRUGSNAME = ["Weed", "Ecstasy", "Cocaine", "Heroine", "Hashish", "Keta"];
var DRUGPRICE = [0, 0, 0, 0, 0, 0];
var MAXDAYSTEXT = "30 days";
var player = {
	emprunt: 2500,
	argent: 1000,
	banque: 0,
	inv: 0,
	maxinv: 100,
	day: 0,
	maxdays: 31,
	dtext: "30 days",
	location: "New York",
	inventory: [0, 0, 0, 0, 0, 0],
	curEnemy: "Evan",
	curEnemyLife: 100,
	curEnemyMaxLife: 100,
	attack: 5,
	enemyAttack: 2,
	CurLife: 100,
	copskilled: 0
};

var EVENTTEXTS = {
	good: ["weed good event text",
		"ecstasy good event text",
		"cocaine good event text",
		"heroine good event text",
		"hashish good event text",
		"keta good event text"],
	bad: ["weed bad event text",
		"ecstasy bad event text",
		"cocaine bad event text",
		"heroine bad event text",
		"hashish bad event text",
		"keta bad event text"],
};

(function () {
	if (location.href.match(/(goldenlys.github.io).*/)) window.oncontextmenu = (e) => { e.preventDefault(); };
	if (localStorage.getItem("DopeDealer") != null) { load(); }
	document.title = "Dope Dealer";
	console.log("Have fun on Dope Dealer !   - Purple");
	newprices();
	usurierscheck();
	SetMaxDays(player.maxdays);
	player.day++;
	save();
	updateprogression();
})();

function updateprogression() {
	player.inv = 0;
	for (var item in player.inventory) { player.inv += player.inventory[item]; }
	$("#version").html("v" + version);
	$("#BTN3").html("<i class='jaune map marker alternate icon DPI'></i>" + player.location);
	$("#sactext").html(sactexte);
	$("#CASH").html("<i class='fas fa-sack-dollar DPI vert2'></i>" + fix(player.argent, 3));
	$("#BANK").html("<i class='far fa-credit-card-front DPI bleu'></i>" + fix(player.banque, 3));
	$("#DEBT").html("<i class='far fa-money-check-edit-alt DPI rouge'></i>" + fix(player.emprunt, 3) + "");
	var DAYTEXT = player.day > 1 ? " days" : " day";
	var MAXDAYS = player.maxdays != -1 ? "/" + (player.maxdays) : "";
	$("#DAYS").html("<i class='far fa-calendar-alt DPI jaune'></i>" + player.day + MAXDAYS + DAYTEXT);
	var LIFECOLOR = player.CurLife <= 50 ? "rouge" : "vert";
	lifetext = "<span class='" + LIFECOLOR + "'>" + player.CurLife + "</span>";
	$("#LIFE").html("<i class='far fa-heartbeat DPI " + LIFECOLOR + "'></i>" + player.CurLife + "%");
	$("#maxactuel").html("Bank Account: <span class='bleu'>" + fix(player.banque, 3) + "</span>");
	$("#usuactuel").html("Debt Value: <span class='rouge'>" + fix(player.emprunt, 3) + "</span>");
	$("#INVENTORY").html("<i class='fas fa-sack DPI'></i>" + (player.maxinv - player.inv) + " slots");
	$("#valeurclic").html(eventtext + "<br>" + usutext);
	$("#MAXDAYS").html("Actual maximum playtime: " + MAXDAYSTEXT);
	for (var D in DRUGSTYPE) {
		$("#DT" + D).html(DRUGSNAME[D] + " (" + player.inventory[D] + ")");
		$("#DP" + D).html("<span class='" + DRUGSTYPE[D] + "'>" + fix(DRUGPRICE[D], 3));
	}
	$("#PoliceName").html("<span class='bleu'>The officer " + player.curEnemy + "</span> wants to do a control.<br>He currently have " + enemylifetext + "/" + player.curEnemyMaxLife + "HP.");
	$("#fightresult").html("You currently have " + lifetext + " HP.");
	save();
	checkbuttons();
	if (player.CurLife <= 0) endgame();
	if (player.day >= player.maxdays && player.maxdays != -1) endgame();
	if (player.argent <= 4 && player.banque <= 100 && player.inv == 0) endgame();
}

function hideMenus() {
	var IDS = ["us", "ba", "op", "sac", "sa", "combat", "endgame"];
	$("#Main").hide();
	for (var M in IDS) $("#menu-" + IDS[M]).hide();

	for (var i = 0; i < 6; i++) { $("#BTN" + i).attr("class", "item DPC"); }
}

function ShowMenu(id) {
	var IDS = ["us", "ba", "op", "sac", "sa", "combat", "endgame"];
	hideMenus();
	if (id < 5) $("#BTN" + (id)).attr("class", "active item DPC");
	$("#menu-" + IDS[id]).show();
}

function hideTabs() {
	hideMenus();
	$("#Main").show();
	$("#BTN3").attr("class", "active item DPC");
}

function endgame() {
	hideTabs();
	$("#menu").hide();
	ShowMenu(6);
	$("#endtext").html("You have finished this session in " + (player.day - 1) + " days with <span class='vert'>" + fix(player.argent + player.banque, 3) + "</span><br><br> You had a bag with " + player.maxinv + " slot which contained :<br><br>- " + player.inventory[0] + " Weed<br>" + "- " + player.inventory[1] + " Ecstasy<br>" + "- " + player.inventory[2] + " Cocaine<br>" + "- " + player.inventory[3] + " Heroine<br>" + "- " + player.inventory[4] + " Hashish<br>" + "- " + player.inventory[5] + " Keta");
	autodel();
}

function changelocation() {
	var LOCATIONS = ["New York", "Las Vegas", "Toronto", "Los Angeles", "Washington", "Chicago", "Miami", "Phoenix", "Albuquerque", "New Orleans", "Seattle"];
	if (player.day >= player.maxdays && player.maxdays != -1) endgame();
	player.day++;

	var multiplier = random(1, 10) / 100;
	player.emprunt += player.emprunt * multiplier;
	chance = random(0, 10);
	player.location = LOCATIONS[chance];
	usurierscheck();
	heal();
	saccheck();
	newprices();
	updateprogression();
}

function saccheck() {
	var sacchance = random(1, 50);
	if (sacchance < 10) {
		if (sacchance >= 1 && sacchance < 5) sacvalue = random(8, 15) + player.maxinv;
		if (sacchance >= 5 && sacchance <= 10) sacvalue = player.maxinv - random(8, 15);
		if (sacchance < 10) ShowMenu(3);
		var saccolor = sacvalue > player.maxinv ? "vert" : "rouge";
		sactexte = "This bag can contain <span class='" + saccolor + "'>" + sacvalue + "</span> items.<br> You actually have " + player.maxinv + " slots in your bag.";
		updateprogression();
		showsacmenu();
	}
	if (sacchance >= 10 && sacchance < 15) CombatMode();
	updateprogression();
}

function addinv() {
	player.maxinv = sacvalue;
	hideTabs();
	updateprogression();
}

function newprices() {
	DRUGPRICE[0] = random(5, 15);
	DRUGPRICE[1] = random(3000, 5000);
	DRUGPRICE[2] = random(18000, 40000);
	DRUGPRICE[3] = random(5000, 15000);
	DRUGPRICE[4] = random(500, 1000);
	DRUGPRICE[5] = random(30, 100);
	resettypes();
	eventtype = random(0, 1);
	if (eventtype == 0) {
		DRUG = random(0, 5);
		DRUGSTYPE[DRUG] = "rouge";
		DRUGPRICE[DRUG] = GetDrugPrice(DRUG, "bad");
		eventtext = EVENTTEXTS.bad[DRUG];
	}
	if (eventtype == 1) {
		DRUG = random(0, 5);
		DRUGSTYPE[DRUG] = "vert";
		DRUGPRICE[DRUG] = GetDrugPrice(DRUG, "good");
		eventtext = EVENTTEXTS.good[DRUG];
	}
	updateprogression();
}

function GetDrugPrice(id, type) {
	var price = 0;

	if (type == "good") {
		if (id == 0) price = random(4, 6);
		if (id == 1) price = random(1000, 3000);
		if (id == 2) price = random(14000, 18000);
		if (id == 3) price = random(1000, 5000);
		if (id == 4) price = random(100, 500);
		if (id == 5) price = random(15, 30);
	}
	if (type == "bad") {
		if (id == 0) price = random(15, 100);
		if (id == 1) price = random(5000, 10000);
		if (id == 2) price = random(40000, 100000);
		if (id == 3) price = random(12000, 25000);
		if (id == 4) price = random(1000, 3000);
		if (id == 5) price = random(100, 350);
	}
	if (type == "normal") {
		if (id == 0) price = random(5, 15);
		if (id == 1) price = random(3000, 5000);
		if (id == 2) price = random(18000, 40000);
		if (id == 3) price = random(5000, 15000);
		if (id == 4) price = random(500, 1000);
		if (id == 5) price = random(30, 100);
	}
	return price;
}

function resettypes() {
	for (var T in DRUGSTYPE) { DRUGSTYPE[T] = "normal"; }
	DRUGPRICE[1] = random(2000, 5500);
	DRUGPRICE[2] = random(15000, 35000);
	DRUGPRICE[3] = random(5000, 15000);
	DRUGPRICE[4] = random(500, 1000);
	DRUGPRICE[5] = random(30, 100);
	if (DRUGPRICE[0] <= 10) DRUGSTYPE[0] = "blanc";
	if (DRUGPRICE[1] <= 3000) DRUGSTYPE[1] = "blanc";
	if (DRUGPRICE[2] <= 20000) DRUGSTYPE[2] = "blanc";
	if (DRUGPRICE[3] <= 7000) DRUGSTYPE[3] = "blanc";
	if (DRUGPRICE[4] <= 750) DRUGSTYPE[4] = "blanc";
	if (DRUGPRICE[5] <= 50) DRUGSTYPE[5] = "blanc";
}

function usurierscheck() {
	usuchance = random(1, 10);
	usutext = "<span class='vert'>The mafia left you alone for today.</span>";

	if (player.emprunt > 0) {
		if (player.argent > 100 && usuchance == 1 && player.day > 3) {
			usuprice = random(100, player.argent);
			player.argent = player.argent - usuprice;
			usutext = "<span class='rouge'>The mafia came today, they took " + fix(usuprice, 3) + " !</span>";
		}
	} else {
		usutext = "<br>";
	}
	updateprogression();
}

function buyweed() {
	if (player.argent >= DRUGPRICE[0]) {
		if (player.inv != player.maxinv) {
			player.weed++;
			player.argent = player.argent - DRUGPRICE[0];
		}
	}
	updateprogression();
}

function Buy(id, qty) {
	if (player.argent >= (DRUGPRICE[id] * qty) && (player.inv + qty) < player.maxinv) {
		player.inventory[id] += qty;
		player.argent -= DRUGPRICE[id] * qty;
	}
	updateprogression();
}

function Sell(id, qty) {
	if (player.inventory[id] > 0 && player.inventory[id] >= qty) {
		player.inventory[id] -= qty;
		player.argent += DRUGPRICE[id] * qty;
	}
	updateprogression();
}

function SetMaxDays(count) {
	if (player.day < count || count == -1) player.maxdays = count;
	if (count > 0) { MAXDAYSTEXT = (count - 1) + " days"; } else { MAXDAYSTEXT = "Unlimited days"; }
	updateprogression();
}

function Deposit(cash) {
	if (cash == "all") cash = player.argent;
	if (player.argent >= cash) {
		player.argent -= cash;
		player.banque += cash;
		updateprogression();
	}
}

function Withdraw(cash) {
	if (cash == "all") cash = player.banque;
	if (player.banque >= cash) {
		player.banque -= cash;
		player.argent += cash;
		if (player.banque < 0) player.banque = 0;
		updateprogression();
	}
}

function Repay(cash) {
	if (cash == "all") cash = player.emprunt;
	if (player.argent >= cash) {
		player.argent -= cash;
		player.emprunt -= cash;
		if (player.emprunt < 0) player.emprunt = 0;
		updateprogression();
	}
}

function checkbuttons() {
	for (var D in DRUGSTYPE) {
		var BUYBTN = player.argent >= DRUGPRICE[D] ? "" : " disabled";
		var BUYBTN2 = player.argent >= DRUGPRICE[D] * 10 ? "" : " disabled";
		$("#buy-" + D).attr("class", "ui inverted green button" + BUYBTN);
		$("#buy10-" + D).attr("class", "ui inverted green button" + BUYBTN2);
		var SELLBTN = player.inventory[D] > 0 ? "" : " disabled";
		var SELLBTN2 = player.inventory[D] >= 10 ? "" : " disabled";
		$("#sell-" + D).attr("class", "ui inverted red button" + SELLBTN);
		$("#sell10-" + D).attr("class", "ui inverted red button" + SELLBTN2);
	}
}

function CombatMode() {
	ShowMenu(5);
	if (player.curEnemyLife <= 50) {
		enemylifetext = "<span class='rouge'>" + player.curEnemyLife + "</span>";
	} else {
		enemylifetext = "<span class='vert'>" + player.curEnemyLife + "</span>";
	}
	updateprogression();
}

function closeCombat() {
	var luck = random(1, 100);
	if (luck <= 25) PoliceCheck(); else hideTabs();
}

function PoliceCheck() {
	if (player.inv > 0) {
		player.inventory = [0, 0, 0, 0, 0, 0];
		if (player.money > 10000) {
			player.money -= 10000;
		} else {
			player.emprunt += 10000;
		}
	}
	hideTabs();
}

function fight() {
	if (player.curEnemyLife > 0) {
		player.curEnemyLife = player.curEnemyLife - player.attack;
		player.CurLife = player.CurLife - player.enemyAttack;
	} else {
		chooseNewEnemy();
		hideTabs();
	}
	if (player.curEnemyLife <= 0) {
		chooseNewEnemy();
		hideTabs();
	}
	if (player.CurLife <= 0) endgame();
	if (player.CurLife <= 50) {
		lifetext = "<span class='rouge bold'>" + player.CurLife + "</span>HP";
	} else {
		lifetext = "<span class='vert bold'>" + player.CurLife + "</span>HP";
	}
	if (player.curEnemyLife <= 50) {
		enemylifetext = "<span class='rouge bold'>" + player.curEnemyLife + "</span>";
	} else {
		enemylifetext = "<span class='vert bold'>" + player.curEnemyLife + "</span>";
	}

    $("#fightresult").html("You now have " + lifetext + ".");
	updateprogression();
}

function chooseNewEnemy() {
	player.copskilled++;
	player.curEnemyMaxLife = player.curEnemyMaxLife + 10;
	player.curEnemyLife = player.curEnemyMaxLife;
	player.enemyAttack = player.enemyAttack + player.copskilled * 1.5;
	if (player.copskilled > 0) player.curEnemy = "Michel";
	if (player.copskilled > 1) player.curEnemy = "Pablo";
	if (player.copskilled > 2) player.curEnemy = "Lucas";
	if (player.copskilled > 3) player.curEnemy = "Yanis";
	if (player.copskilled > 4) player.curEnemy = "Bernard";
	if (player.copskilled > 6) player.curEnemy = "Alexandre";
	if (player.copskilled > 7) player.curEnemy = "Diego";
	if (player.copskilled > 8) player.curEnemy = "Simon";
	if (player.copskilled > 9) player.curEnemy = "Armand";
}

function heal() {
	if (player.CurLife < 100) {
		player.CurLife += 5;
	}
	if (player.CurLife > 100) {
		player.CurLife = 100;
	}
	if (player.curEnemyLife < 100) player.curEnemyLife++;
}