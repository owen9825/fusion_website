var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgg = document.getElementById("bg_glow");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;
let period = 70_000;
const population = 70;

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
  maxHeight = h * 0.9;
  minHeight = h * 0.5;
  dots = [];
  pushDots(population);
  ctx.globalCompositeOperation = "lighter";
};

dots = [{}];
maxWidth = 15;
minWidth = 2;
maxHeight = h * 0.9;
minHeight = h * 0.5;
maxSpeed = 35;
minSpeed = 6;
glow = 10; // Set to 0 for better performance
ctx.globalCompositeOperation = "lighter";

function getDot() {
  let centerX = Math.random() * w;
  let hue = mapRange(centerX, 0, w, 220, 0); // Map x-coordinate to hue range (220 for navy blue to 0 for crimson)
  return {
    x: centerX,
    y: Math.random() * h / 2,
    h: Math.random() * (maxHeight - minHeight) + minHeight,
    w: Math.random() * (maxWidth - minWidth) + minWidth,
    c: hue,
    m: Math.random() * (maxSpeed - minSpeed) + minSpeed,
    x0: centerX,
    y0: Math.random() * h / 2,
    t0: new Date().getTime() - Math.random() * period
  };
}

function pushDots(population) {
  for (i = 1; i < population; i++) {
    dots.push(getDot());
  }
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

pushDots(population);

let amplitude = w * 0.05;

function render() {
  ctx.clearRect(0, 0, w, h);
  console.log(`There are ${dots.length} dots`);
  for (i = 1; i < dots.length; i++) {
    ctx.beginPath();
    grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x + dots[i].w, dots[i].y + dots[i].h);
    grd.addColorStop(0.0, `hsl(${dots[i].c}, 50%, 50%, 0)`);
    grd.addColorStop(0.2, `hsl(${dots[i].c + 20}, 50%, 50%, 0.5)`);
    grd.addColorStop(0.5, `hsl(${dots[i].c + 50}, 70%, 60%, 0.8)`);
    grd.addColorStop(0.8, `hsl(${dots[i].c + 80}, 50%, 50%, 0.5)`);
    grd.addColorStop(1.0, `hsl(${dots[i].c + 100}, 50%, 50%, 0)`);
    ctx.shadowBlur = glow;
    ctx.shadowColor = `hsl(${dots[i].c}, 50%, 50%, 1)`;
    ctx.fillStyle = grd;
    ctx.fillRect(dots[i].x, dots[i].y, dots[i].w, dots[i].h);
    ctx.closePath();

    let executionTime = new Date().getTime();
    dots[i].x = dots[i].x0 + amplitude * Math.sin(2 * Math.PI * (executionTime - dots[i].t0) / period);
    if (dots[i].x > w || dots[i].x < 0) {
      dots[i].t0 = executionTime;
      dots[i].x0 = dots[i].x;
    }

    if (dots[i].x > w + maxWidth) {
      dots.splice(i, 1);
      dots.push(getDot());
    }
  }
  window.requestAnimationFrame(render);
}

bgg.style.background = "radial-gradient(ellipse at center, hsla(200, 50%, 50%, 0.8) 0%, rgba(0, 0, 0, 0) 100%)";
render();
