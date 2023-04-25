const canvas = new fabric.Canvas("canvas", {
	backgroundColor: "#fff",
	imageSmoothing: false,
});

fabric.Image.prototype.set({
	top: 640 / 2,
	left: 1024 / 2,
	originX: "center",
	originY: "center",
	hoverCursor: "default",
	imageSmoothing: false,
});

let x, y;

const playerEl = document.getElementById("player");
const player = new fabric.Image(playerEl, {
	top: 608 - 64,
	left: 1024 / 2,
	originX: "center",
	originY: "center",
	hoverCursor: "default",
});

canvas.add(player);

for (let l = 32; l < 1024; l += 64) {
	fabric.Image.fromURL("./assets/grass_block.png", (img) => {
		img.set({
			top: 640 - 32,
			left: l,
			originX: "center",
			originY: "center",
			hoverCursor: "default",
		});
		canvas.add(img);
	});
}

canvas.on("mouse:move", function (e) {
	getMouseCoords(e);
});

const getMouseCoords = (e) => {
	const pointer = canvas.getPointer(e.e);
	x = pointer.x;
	y = pointer.y;
}

const drawBlock = (img) => {
	fabric.Image.fromURL(img, (img) => {
		img.set({
			top: y,
			left: x
		});
		canvas.add(img);
	});
}

window.addEventListener("keypress", (e) => {
	switch (e.key) {
		case "g" || "G":
			drawBlock("./assets/grass_block.png");
			break;
		case "t" || "T":
			drawBlock("./assets/oak_log.png");
			break;
		case "o" || "O":
			drawBlock("./assets/oak_planks.png");
			break;
		case "b" || "B":
			drawBlock("./assets/stone_bricks.png");
			break;
		case "c" || "C":
			drawBlock("./assets/cobblestone.png");
			break;
		default:
			break;
	}
});
