// =======================
// ELEMENTI
// =======================
const toggleBtn = document.getElementById("theme-toggle");
const toggleImg = document.getElementById("theme-toggle-img");
const overlay   = document.getElementById("theme-fade-overlay");

// =======================
// CONFIG
// =======================
const toggleImages = {
  light: "./Assets/Light Toggle.png",
  dark: "./Assets/Dark Toggle.png"
};

const BLUR_LIGHT = 2;
const BLUR_DARK  = 4;

// =======================
// UTILITY
// =======================
function setBlur(selector, amount) {
  document.querySelectorAll(selector).forEach(el => {
    el.style.backdropFilter = `blur(${amount}px)`;
    el.style.webkitBackdropFilter = `blur(${amount}px)`;
  });
}

// =======================
// CANVAS
// =======================
function updateCanvasColor(theme) {
  if (!window.backgroundCanvasCtx) return;
  window.backgroundCanvasCtx.fillStyle =
    theme === "dark" ? "#ffffff" : "#000000";
}

// =======================
// BLUR PER TEMA
// =======================
function updateBlurByTheme(theme) {
  setBlur(".frosted", theme === "dark" ? BLUR_DARK : BLUR_LIGHT);
}

// =======================
// SET THEME (PUNTO UNICO)
// =======================
function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme-preference", theme);

  toggleImg.src =
    theme === "dark" ? toggleImages.dark : toggleImages.light;

  updateCanvasColor(theme);
  updateBlurByTheme(theme);
}

// =======================
// TOGGLE THEME
// =======================
function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";

  // overlay per fade sincronizzato
  overlay.style.transition = "none";
  overlay.style.opacity = "1";

  // forza repaint
  overlay.offsetHeight;

  setTheme(next);

  overlay.style.transition = "opacity 0.5s ease";
  overlay.style.opacity = "0";
}

// =======================
// INIT
// =======================
(function initTheme() {
  const saved = localStorage.getItem("theme-preference");

  if (saved) {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
})();

// =======================
// EVENTI
// =======================
if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleTheme);
}
