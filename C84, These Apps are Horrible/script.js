const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const mars = new Image();
const rover = new Image();

let x = canvas.width / 2;
let y = canvas.height / 2;

const roverWidth = 100;
const roverHeight = 90;

mars.src = "mars.jpg";
rover.src = "rover.png";

window.onload = () => {
	ctx.drawImage(mars, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(rover, x, y, roverWidth, roverHeight);
};

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
window.addEventListener("keydown", move);

function start(e) {
	canvas.addEventListener("mousemove", drag);
	getMousePos(e);
}

function getMousePos(e) {
	x = e.clientX - canvas.getBoundingClientRect().left - roverWidth / 2;
	y = e.clientY - canvas.getBoundingClientRect().top - roverHeight / 2;
}

function stop() {
	canvas.removeEventListener("mousemove", drag);
}

function drag(e) {
	getMousePos(e);
	draw(x, y);
}

function getKeyPressed(e) {
	let direction;
	switch (e.keyCode) {
		case 38:
			direction = "up";
			break;
		case 40:
			direction = "down";
			break;
		case 37:
			direction = "left";
			break;
		case 39:
			direction = "right";
			break;
		default:
			break;
	}
	return direction;
}

function move(e) {
	switch (getKeyPressed(e)) {
		case "up":
			if (y >= 0) {
				y = y - 10;
				draw(x, y - 10);
			}
			break;
		case "down":
			if (y <= 483) {
				y = y + 10;
				draw(x, y + 10);
			}
			break;
		case "left":
			if (x >= 0) {
				x = x - 10;
				draw(x - 10, y);
			}
			break;
		case "right":
			if (x <= 900) {
				x = x + 10;
				draw(x + 10, y);
			}
			break;
		default:
			break;
	}
}

function draw(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(mars, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(rover, x, y, roverWidth, roverHeight);
}