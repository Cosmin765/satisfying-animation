window.onload = main;

let canvas, ctx;
const [ width, height ] = [ window.innerWidth, window.innerHeight ];
const $ = name => document.querySelector(name);
let line;
const points = [];
const keys = {};

const random = (min, max) => Math.random() * (max - min) + min;
const map = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c;

const sounds = {
    knock: null
};

const loadAudio = filename => new Promise(resolve => {
    const audio = new Audio(`./assets/${filename}`);
    audio.addEventListener("canplaythrough", () => resolve(audio));
});

async function preload() {
    sounds.knock = await loadAudio("bell.mp3");
}

async function main() {
    canvas = $("#c");
    ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    await preload();

    points.push(new Point(width / 2, height / 2));
    for(let i = 0; i < 20; ++i) {
        points.push(new Point(random(0, width), random(0, height)));
    }

    line = new Line(1, points[0].pos.copy());

    setupEvents();

    requestAnimationFrame(render);
}

function update() {
    line.update();

    if(keys["ArrowRight"]) line.rotate(0.01);
    if(keys["ArrowLeft"]) line.rotate(-0.01);
}

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    update();

    line.render();

    for(const point of points) {
        point.render();
    }

    requestAnimationFrame(render);
}

function getRot(a)
{
    return [
        [ Math.cos(a), -Math.sin(a) ],
        [ Math.sin(a),  Math.cos(a) ]
    ];
}

function setupEvents()
{
    addEventListener("keydown", e => keys[e.code] = true);
    addEventListener("keyup", e => keys[e.code] = false);
    // addEventListener("click", () => sounds.knock.play());
}