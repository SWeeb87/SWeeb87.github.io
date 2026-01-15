const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

const settings = {
  cellSize: 13,
  waveSpeed: 0.00001,
  waveAmplitude: 2.5,
  invisibleThreshold: 0.19,
  baseScaleMin: 0.2,
  baseScaleMax: 1.0,
  noiseGridSize: 64,
  noiseScale: 0.15,
  noiseSteps: 5,
  stepBias: 7
};

let cells = [];
let noise = new Float32Array(settings.noiseGridSize * settings.noiseGridSize);

// ------------------- FUNZIONI -------------------
function quantize(value, steps) {
  return Math.floor(value * steps) / steps;
}

function bias(value, b) {
  return Math.pow(value, b);
}

function sampleNoise(u, v) {
  u = (u % 1 + 1) % 1;
  v = (v % 1 + 1) % 1;

  const N = settings.noiseGridSize;
  const x = u * N;
  const y = v * N;
  const x0 = Math.floor(x) % N;
  const y0 = Math.floor(y) % N;
  const x1 = (x0 + 1) % N;
  const y1 = (y0 + 1) % N;

  const tx = x - x0;
  const ty = y - y0;

  const a = noise[y0 * N + x0];
  const b = noise[y0 * N + x1];
  const c = noise[y1 * N + x0];
  const d = noise[y1 * N + x1];

  const ab = a + (b - a) * tx;
  const cd = c + (d - c) * tx;

  return ab + (cd - ab) * ty;
}

function getTextColor() {
  const theme = document.body.getAttribute("data-theme") || "light";
  return theme === "dark" ? "#ffffff" : "#000000";
}

// ------------------- CANVAS -------------------
function resizeCanvas() {
  canvas.width = document.body.scrollWidth;
  canvas.height = document.body.scrollHeight;

  // Ricrea le celle ad ogni resize
  const cols = Math.floor(canvas.width / settings.cellSize);
  const rows = Math.floor(canvas.height / settings.cellSize);
  cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push({
        x,
        y,
        char: Math.random() > 0.5 ? "0" : "1",
        baseScale: Math.random() * (settings.baseScaleMax - settings.baseScaleMin) + settings.baseScaleMin
      });
    }
  }

  // Inizializza noise tileabile
  const N = settings.noiseGridSize;
  noise = new Float32Array(N * N);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      noise[y * N + x] = Math.random();
    }
  }
}

window.addEventListener("resize", resizeCanvas);

const mouse = { x: -1000, y: -1000 }; // fuori dallo schermo inizialmente
const FADE_RADIUS = 100; // raggio in pixel per il fade
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX + window.scrollX;
  mouse.y = e.clientY + window.scrollY;
});

// ------------------- DRAW -------------------
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = `${settings.cellSize}px monospace`;

const ALPHA_BUCKETS = 12;

function draw(time) {
  ctx.fillStyle = getTextColor(); // aggiorna colore ogni frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const t = time * settings.waveSpeed;
  let lastAlpha = -1;

  for (let i = 0; i < cells.length; i++) {
    const c = cells[i];

    const u = c.x * settings.noiseScale + t;
    const v = c.y * settings.noiseScale + t * 0.7;

    let n = sampleNoise(u, v);
    n = Math.sin(n * Math.PI);
    n = quantize(n, settings.noiseSteps);
    n = bias(n, settings.stepBias);

    let alpha = c.baseScale * n * settings.waveAmplitude;
    if (alpha < settings.invisibleThreshold) continue;

    // Calcola distanza dal mouse
    const cellX = c.x * settings.cellSize + settings.cellSize / 2;
    const cellY = c.y * settings.cellSize + settings.cellSize / 2;
    const dx = cellX - mouse.x;
    const dy = cellY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Gradiente soffice attorno al mouse
    if (dist < FADE_RADIUS) {
      let fadeFactor = dist / FADE_RADIUS; // 0 al centro, 1 ai bordi
      // smoothstep: graduale dall'1 al 0
      fadeFactor = fadeFactor * fadeFactor * (3 - 2 * fadeFactor); 
      alpha *= fadeFactor;
    }

    alpha = Math.min(alpha, 1);
    const bucket = Math.floor(alpha * ALPHA_BUCKETS) / ALPHA_BUCKETS;

    if (bucket !== lastAlpha) {
      ctx.globalAlpha = bucket;
      lastAlpha = bucket;
    }

    ctx.fillText(c.char, cellX, cellY);
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

// ------------------- START -------------------
window.addEventListener("load", () => {
  resizeCanvas();       // ridimensiona correttamente dopo il load
  requestAnimationFrame(draw); // parte il draw loop
});
