const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorInput = document.getElementById("color-input");
const radiusInput = document.getElementById("radius-input");
const thicknessInput = document.getElementById("thickness-input");

let color = colorInput.value;
let radius = radiusInput.value;
let thickness = thicknessInput.value;

const clearButton = document.getElementById("clear");

colorInput.addEventListener("input", () => { 
    color = colorInput.value;
});

radiusInput.addEventListener("input", () => { 

    radius = radiusInput.value;
});

thicknessInput.addEventListener("input", () => { 
    thickness = thicknessInput.value;
});

const strokeCircle = (ctx, x, y) => {
    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
};

const draw = (x, y) => {
    if (canvas.getContext) {
        ctx.strokeStyle = color;
        ctx.strokeStyle = color;

        strokeCircle(ctx, x, y)
    }
};

canvas.addEventListener("click", (e, x, y) => {
    x = e.clientX - canvas.getBoundingClientRect().left;
    y = e.clientY - canvas.getBoundingClientRect().top;

    if (thickness > 500) {
        thicknessInput.value = 500;
        thickness = 500;
    } else if (thickness < 1) {
        thicknessInput.value = 1;
        thickness = 1;
    }

    if (radius > 500) {
        radiusInput.value = 500;
        radius = 500;
    } else if (radius < 1) {
        radiusInput.value = 1;
        radius = 1;
    } 

    console.log(x, y)
    draw(x, y)
});

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});