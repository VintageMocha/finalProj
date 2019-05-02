//lovingly stolen from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
//...and modified heavily

// Create the canvas
// declares variable to hold the canvas object/API

//################ SETUP CANVAS ##################
//create the canvas element
var canvas = document.createElement("canvas");
//takes canvas gets its context and puts that value in the ctx variable
var ctx = canvas.getContext("2d");
// set canvas width height
canvas.width = 512;
canvas.height = 480;
//appends the canvas to the document object
document.body.appendChild(canvas);

//################ Global variables ##################
var monstersCaught = 0;
var now;
var delta;
var allMonsters = [];


//################ Setting up images ##################
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "_images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "_images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "_images/monster.png";

//################ Game Objects ##################
var hero = {
	name: "Zoltar",
	gravity: 9.8,
	speed: 256, // movement in pixels per second
	messages: ["Hello there!", "Hi", "Whassup!"],
	speak: function(){
		console.log(this.messages[randNum(3)]);
	},
	grounded: true,
	jump: function(){
		this.y-=65;
	}
};

function Monster() {
	this.gravity = 10;
	this.x = 250;
	this.y = 0;
	allMonsters.push(this);
}

var Grendel = new Monster(9.8, 10, 5);
var Barney = new Monster(4, 1000, 100000);
var Homework = new Monster(1000, 10000, 25);

Grendel.name = "Turdly";
console.log(Grendel.name);

//################ Setup Keyboard controls ##################

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.key];
}, false);

//################ Functions ##################
var reset = function () {
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;
	hero.x = canvas.width-64;
	hero.y = canvas.height-64;

	// Throw the monster somewhere on the screen randomly
	Monster.x = 32 + (Math.random() * (canvas.width - 64));
	Monster.y = 32 + (Math.random() * (canvas.height - 64));
};
// generate random number
var randNum = function(x) {
	return Math.floor(Math.random()*x);
};
//speedup hero
var speedUp = function(x) {
	hero.speed+=x;
};

//this function populates an array using a range of values
function range(start, end) {
	var arr = [];
	for (let i = start; i <= end; i++) {
		arr.push(i);
	}
	return arr;
}
//this function 
function monsterWave(max) {
	for (monster in range(1, max)) {
		monster = new Monster();
	}
}

// ###get user input###

var input = function(modifier) {
		// checks for user input
		if ("w" in keysDown && hero.grounded == true) { // Player holding up
			// hero.y -= hero.speed * modifier;\
			console.log("trying to jump...")
			hero.jump();
			hero.grounded = false;
		}
		if ("s" in keysDown) { // Player holding down
			hero.y += hero.speed * modifier;
		}
		if ("a" in keysDown) { // Player holding left
			hero.x -= hero.speed * modifier;
		}
		if ("d" in keysDown) { // Player holding right
			hero.x += hero.speed * modifier;
		}
		if (" " in keysDown) { // Player holding right
			hero.speak();
			speedUp(randNum(100));
			console.log(hero.speed);
		}
};

// ###Update###
var update = function (modifier) {

	// these are the updates!!!!
	// these are the jump conditions
	if (hero.y > canvas.height) {
		// console.log("he fell of the screen...")
		hero.y = 448;
		hero.gravity = 0;
		hero.grounded = true;
	}
	if (hero.y < canvas.height-32) {
		// console.log("he's in the air!...")
		hero.gravity = 9.8;
	}

	if (hero.x >= canvas.width - 32) {
		hero.x = canvas.width - 32;
		console.log("he's off the screen...");
		console.log(hero.x);
	}

	if (hero.x <= 0) {
		hero.x = 0;
		console.log("he's off the screen...");
		console.log(hero.x);
	}
	if (hero.y <= 0) {
		hero.y = 0;
		console.log("he's off the top of the screen...");
		console.log(hero.y);
	}
	// if (Monster.y > canvas.height) {
		
	// 	Monster.y = 0;
	// }

	// this is where the gravity is applied to the monster
	// Monster.y+=monster.gravity;
	// this is where the gravity is applied to the hero
	for (monster in allMonsters) {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(allMonsters[monster].x, allMonsters[monster].y, allMonsters[monster].hitpoints * 5, 50);
		if (allMonsters[monster].y <= canvas.height) {
			allMonsters[monster].y += allMonsters[monster].gravity * modifier;
		}
		if (allMonsters[monster].y > canvas.height) {
			allMonsters[monster].jump();
			allMonsters[monster].x = randNum(canvas.width);
		}
		console.log(allMonsters[monster].y);
	}

	// Collision detection
	// if (
	// 	hero.x <= (monster.x + 32)
	// 	&& monster.x <= (hero.x + 32)
	// 	&& hero.y <= (monster.y + 32)
	// 	&& monster.y <= (hero.y + 32)
	// ) {
	// 	++monstersCaught;
	// 	reset();
	// }

	for (monster in allMonsters) {
		if (
			hero.x <= (allMonsters[monster].x + 64) &&
			allMonsters[monster].x <= (hero.x + 64) &&
			hero.y <= (allMonsters[monster].y + 64) &&
			allMonsters[monster].y <= (hero.y +64)
		) {
			hero.hitpoints -= 15;
			allMonsters.splice(monster, 1);
			console.log("collision");
			console.log(allMonsters);
			console.log(allMonsters);
		}
	}

};


// ### Render ###
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	// if (monsterReady) {
	// 	ctx.drawImage(monsterImage, monster.x, monster.y);
	// }
	if (monsterReady) {
		for (monster in allMonsters) {
			ctx.drawImage(monsterImage, allMonsters[monster].x, allMonsters[monster].y);
		}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
	// frames
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Delta: " + delta/1000, 256, 32);
};

// ### Main loop function ###
var main = function () {
	now = Date.now();
	delta = now - then;

	input(delta /1000);
	update(delta / 1000);
	render();
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();