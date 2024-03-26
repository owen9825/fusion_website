const canvas = document.getElementById("climate_canvas");
const ctx = canvas.getContext("2d");
//const glow_background = document.getElementById("canvas_glow");
/*w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;*/
const period = 70_000;
const population = 120;
let canvasWidth;
// Width of streaks (dots)
const minWidth = 2;  // pixels
const maxWidth = 15;
let canvasHeight;
let minHeight;
let maxHeight;
var dots;
const maxSpeed = 35;
const minSpeed = 6;
const glow = 10; // Set to 0 for better performance
let amplitude;

function resetDimensions() {
  console.log('Resetting dimensions');
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight;
  // Use CSS to guide our sizing of the canvas. Here we assert that the canvas is drawn as a hero.
  const root = document.documentElement;
  const heroWidthString = getComputedStyle(root).getPropertyValue('--hero-width');
  canvasWidth = parseFloat(heroWidthString) / 100 * window.innerWidth; // Convert to pixels
  const heroHeightString = getComputedStyle(root).getPropertyValue('--hero-height');
  canvasHeight = parseFloat(heroHeightString) / 100 * window.innerHeight; // Convert to pixels
  maxHeight = canvasHeight * 0.9;
  minHeight = canvasHeight * 0.5;
  dots = [{}];
  ctx.globalCompositeOperation = "lighter";
  amplitude = w * 0.05;  // Oscillation amplitude (along x axis)
}

window.onresize = function() {
  resetDimensions();
  pushDots(dots, population);
};

function getHSVFromX(x, width) {
  // Notice this assumes that the canvas starts at x=0
  const xNormalized = x / width; // Normalize x-coordinate to [0, 1] range

  // Define color points in HSV space
  const colorPoints = [
    { x: 1, h: 0, s: 87, v: 30 }, // crimson (100% to the right)
    { x: 0.7, h: 16.5, s: 47.7, v: 86.4 }, // peach
    { x: 0.68, h: 220, s: 42.3, v: 88.4 }, // pastel blue
    { x: 0.62, h: 316.4, s: 17.4, v: 87.9 }, // pastel pink
    { x: 0.6, h: 16.5, s: 4.7, v: 81.8 }, // white (60% to the right)
    {x: 0.5, h: 220, s: 65.4, v: 80.8},
    { x: 0.3, h: 220, s: 71.1, v: 57.6 }, // blue (30% to the right)
    { x: 0, h: 220, s: 83.2, v: 37.4 } // navy blue (0% to the right)
  ];

  // Find the two closest color points
  let closestLeft = null;
  let closestRight = null;
  for (const point of colorPoints) {
    if (point.x <= xNormalized && (closestLeft === null || point.x > closestLeft.x)) {
      closestLeft = point;
    }
    if (point.x >= xNormalized && (closestRight === null || point.x < closestRight.x)) {
      closestRight = point;
    }
  }

  // Interpolate between the two closest color points
  const t = (xNormalized - closestLeft.x) / (closestRight.x - closestLeft.x);
  const h = closestLeft.h + t * (closestRight.h - closestLeft.h);
  const s = closestLeft.s + t * (closestRight.s - closestLeft.s);
  const v = closestLeft.v + t * (closestRight.v - closestLeft.v);

  return { h, s, v };
}

function getDot() {
  let centerX = Math.random() * w;
  const { h, s, v } = getHSVFromX(centerX, canvasWidth);
  return {
    x: centerX,
    y: Math.random() * h / 2,
    h: Math.random() * (maxHeight - minHeight) + minHeight,
    w: Math.random() * (maxWidth - minWidth) + minWidth,
    c: { h, s, v },
    m: Math.random() * (maxSpeed - minSpeed) + minSpeed,
    x0: centerX,
    y0: Math.random() * h / 2,
    t0: new Date().getTime() - Math.random() * period
  };
}

function pushDots(dots, population) {
  for (i = 1; i < population; i++) {
    dots.push(getDot());
  }
}

function render() {
  ctx.clearRect(0, 0, w, h);
  for (i = 1; i < dots.length; i++) {
    ctx.beginPath();
    const { h, s, v } = dots[i].c;
    grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x + dots[i].w, dots[i].y + dots[i].h);
    grd.addColorStop(0.0, `hsla(${h}, ${s}%, ${v}%, 0)`);
    grd.addColorStop(0.2, `hsla(${h + 1}, ${s}%, ${v}%, 0.5)`);
    grd.addColorStop(0.5, `hsla(${h + 2}, ${s + 20}%, ${v + 10}%, 0.8)`);
    grd.addColorStop(0.8, `hsla(${h + 4}, ${s}%, ${v}%, 0.5)`);
    grd.addColorStop(1.0, `hsla(${h + 5}, ${s}%, ${v}%, 0)`);
    ctx.shadowBlur = glow;
    ctx.shadowColor = `hsla(${h}, ${s}%, ${v}%, 1)`;
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

/*glow_background.style.background = "radial-gradient(ellipse at center, hsla(200, 50%, 50%, 0.8) 0%, rgba(0, 0, 0, 0) 100%)";*/
resetDimensions();
pushDots(dots, population);
render();
