const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

/* ================= SETTINGS ================= */

const settings = {
  cellSize: 13,
  noiseScale: 0.025,
  timeScale: 0.00025,
  opacityMin: 0.04,
  opacityMax: 1,
  contrast: 5,
  fps: 14
};

/* ================= PERLIN ================= */

const PERM = new Uint8Array(512);
const P = new Uint8Array(256);

for (let i = 0; i < 256; i++) P[i] = i;
for (let i = 255; i > 0; i--) {
  const j = (Math.random() * (i + 1)) | 0;
  [P[i], P[j]] = [P[j], P[i]];
}
for (let i = 0; i < 512; i++) PERM[i] = P[i & 255];

const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a, b, t) => a + t * (b - a);
const grad = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);

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

let cols = 0;
let rows = 0;
let cells;
let baseNoise;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cols = Math.ceil(canvas.width / settings.cellSize);
  rows = Math.ceil(canvas.height / settings.cellSize);

  cells = new Uint8Array(cols * rows);
  baseNoise = new Float32Array(cols * rows);

  for (let i = 0; i < cells.length; i++) {
    cells[i] = Math.random() > 0.5 ? 49 : 48; // ASCII 1 / 0
    baseNoise[i] = Math.random() * 10;
  }

  ctx.font = `${settings.cellSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

window.addEventListener("resize", resize);
resize();

/* ================= DRAW ================= */

const frameTime = 1000 / settings.fps;
let last = 0;

function getColor() {
  return document.body.getAttribute("data-theme") === "dark"
    ? "#ffffff"
    : "#000000";
}

function draw(time) {
  if (time - last < frameTime) {
    requestAnimationFrame(draw);
    return;
  }
  last = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getColor();

  const t = time * settings.timeScale;
  let lastAlpha = -1;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;

      // DOMAIN WARPING LEGGERO (addio onde)
      const warp =
        perlin(
          x * settings.noiseScale + baseNoise[i],
          y * settings.noiseScale + baseNoise[i]
        ) * 0.5;

      let n = perlin(
        x * settings.noiseScale + warp + t,
        y * settings.noiseScale + warp - t
      );

      n = n * 0.5 + 0.5;
      n = Math.pow(n, settings.contrast);

      const alpha =
        settings.opacityMin +
        n * (settings.opacityMax - settings.opacityMin);

      if (alpha < 0.04) continue;

      if (alpha !== lastAlpha) {
        ctx.globalAlpha = alpha;
        lastAlpha = alpha;
      }

      ctx.fillText(
        String.fromCharCode(cells[i]),
        x * settings.cellSize + settings.cellSize * 0.5,
        y * settings.cellSize + settings.cellSize * 0.5
      );
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
