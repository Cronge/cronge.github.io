const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x, y;

const brushSizeSlider = document.getElementById("brush-size-slider");
const opacitySlider = document.getElementById("opacity-slider");

const displayBrushSize = document.getElementById("brush-size-value");
const displayOpacity = document.getElementById("opacity-value");

let brushSize = brushSizeSlider.value;
let opacity = opacitySlider.value;

const clearButton = document.getElementById("clear");

displayBrushSize.innerHTML = brushSize;
displayOpacity.innerHTML = opacity;

let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
let isTabletOrLaptop = window.matchMedia(
	"only screen and (max-width: 992px)"
).matches;

if (isMobile) {
	canvas.width = 1280 / 2;
	canvas.height = 720;
	canvas.addEventListener("touchstart", touchStart);
	canvas.addEventListener("touchend", touchEnd);
} else if (isTabletOrLaptop) {
	canvas.addEventListener("touchstart", touchStart);
	canvas.addEventListener("touchend", touchEnd);
} else {
	canvas.addEventListener("mousedown", start);
	canvas.addEventListener("mouseup", stop);
	canvas.addEventListener("click", tap);
}

clearButton.addEventListener("click", clearCanvas);

brushSizeSlider.addEventListener("input", () => {
	brushSize = brushSizeSlider.value;
	displayBrushSize.innerHTML = brushSizeSlider.value;
});

opacitySlider.addEventListener("input", () => {
	opacity = opacitySlider.value;
	displayOpacity.innerHTML = opacitySlider.value;
});

function start(e) {
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("click", tap);
	getMousePos(e);
}

function stop() {
	canvas.removeEventListener("mousemove", draw);
}

function getMousePos(e) {
	x = e.clientX - canvas.getBoundingClientRect().left;
	y = e.clientY - canvas.getBoundingClientRect().top;
}

function draw(e) {
	canvas.removeEventListener("click", tap);
	if (canvas.getContext) {
		ctx.beginPath();

		ctx.globalAlpha =
			opacity.toString().length >= 2 ? opacity / 100 : opacity / 10;
		ctx.lineWidth = brushSize;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.strokeStyle = "#000000";

		ctx.moveTo(x, y);
		getMousePos(e);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function tap(e) {
	ctx.fillStyle = "#000000";
	ctx.globalAlpha =
		opacity.toString().length >= 2 ? opacity / 100 : opacity / 10;

	ctx.beginPath();
	getMousePos(e);
	ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
	ctx.fill();
}

function touchStart(e) {
	e.preventDefault();
	e.stopPropagation();
	canvas.addEventListener("touchmove", drawMobile);
	getTouchPos(e);
}

function touchEnd() {
	canvas.removeEventListener("touchmove", drawMobile);
}

function getTouchPos(e) {
	let touch = e.touches[0];
	x = touch.clientX - canvas.getBoundingClientRect().left;
	y = touch.clientY - canvas.getBoundingClientRect().top;
}

function drawMobile(e) {
	if (canvas.getContext) {
		ctx.beginPath();

		ctx.globalAlpha =
			opacity.toString().length >= 2 ? opacity / 100 : opacity / 10;
		ctx.lineWidth = brushSize;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.strokeStyle = "#000000";

		ctx.moveTo(x, y);
		getTouchPos(e);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
