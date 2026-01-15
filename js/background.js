const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

/* ================= SETTINGS ================= */

const settings = {
  cellSize: 14,
  noiseScale: 0.03,
  timeScale: 0.0005,
  opacityMin: 0.01,
  opacityMax: 1.5,
  contrast: 5
};

/* ================= PERLIN ================= */

const PERM = new Uint8Array(512);
const P = new Uint8Array(256);

for (let i = 0; i < 256; i++) P[i] = i;
for (let i = 255; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [P[i], P[j]] = [P[j], P[i]];
}
for (let i = 0; i < 512; i++) PERM[i] = P[i & 255];

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return a + t * (b - a);
}
function grad(h, x, y) {
  const u = (h & 1) ? -x : x;
  const v = (h & 2) ? -y : y;
  return u + v;
}
function perlin(x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);

  const u = fade(x);
  const v = fade(y);

  const aa = PERM[X + PERM[Y]];
  const ab = PERM[X + PERM[Y + 1]];
  const ba = PERM[X + 1 + PERM[Y]];
  const bb = PERM[X + 1 + PERM[Y + 1]];

  return lerp(
    lerp(grad(aa, x, y), grad(ba, x - 1, y), u),
    lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u),
    v
  );
}

/* ================= GRID ================= */

let cells = [];
let cols = 0;
let rows = 0;

function rebuildGrid() {
  canvas.width = document.documentElement.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;

  cols = Math.ceil(canvas.width / settings.cellSize);
  rows = Math.ceil(canvas.height / settings.cellSize);

  cells = new Array(cols * rows);

  for (let i = 0; i < cells.length; i++) {
    cells[i] = Math.random() > 0.5 ? "1" : "0";
  }

  ctx.font = `${settings.cellSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

window.addEventListener("resize", rebuildGrid);
// window.addEventListener("scroll", rebuildGrid);
window.addEventListener("load", rebuildGrid);

/* ================= DRAW ================= */

function getTextColor() {
  return (document.body.getAttribute("data-theme") === "dark")
    ? "#ffffff"
    : "#000000";
}

function draw(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getTextColor();

  const t = time * settings.timeScale;
  let lastAlpha = -1;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;

      let n = perlin(
        x * settings.noiseScale + t,
        y * settings.noiseScale + t * 0.7
      );

      n = n * 0.5 + 0.5;
      n = Math.pow(n, settings.contrast);

      let alpha =
        settings.opacityMin +
        n * (settings.opacityMax - settings.opacityMin);

      if (alpha < 0.01) continue;

      if (alpha !== lastAlpha) {
        ctx.globalAlpha = alpha;
        lastAlpha = alpha;
      }

      ctx.fillText(
        cells[i],
        x * settings.cellSize + settings.cellSize * 0.5,
        y * settings.cellSize + settings.cellSize * 0.5
      );
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
