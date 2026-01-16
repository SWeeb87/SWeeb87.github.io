// -----------------------
// ELEMENTI
// -----------------------
const toggleBtn = document.getElementById("theme-toggle");
const toggleImg = document.getElementById("theme-toggle-img");
const overlay = document.getElementById("theme-fade-overlay");

// -----------------------
// IMPOSTAZIONI IMMAGINI
// -----------------------
const toggleImages = {
  light: "./Assets/Light Toggle.png",
  dark: "./Assets/Dark Toggle.png"
};

// -----------------------
// FUNZIONE SET THEME
// -----------------------
function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme-preference", theme);

  // Cambia immagine toggle
  toggleImg.src = theme === "dark" ? toggleImages.dark : toggleImages.light;

  // Aggiorna colore canvas
  updateCanvasColor();
}

// -----------------------
// FUNZIONE TOGGLE
// -----------------------
function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";

  // Mostra overlay opaco per sincronizzare il fade
  overlay.style.transition = "none"; // resetto eventuali transizioni precedenti
  overlay.style.opacity = 1;

  // Cambia il tema subito
  setTheme(next);

  // Forzo il reflow per assicurare la transizione
  overlay.offsetHeight; 

  // Fade out overlay
  overlay.style.transition = "opacity 0.5s ease";
  overlay.style.opacity = 0;
}

// -----------------------
// FUNZIONE AGGIORNA CANVAS
// -----------------------
function updateCanvasColor() {
  // Legge il tema corrente e aggiorna il canvas globalmente
  const theme = document.body.getAttribute("data-theme") || "light";
  const canvasTextColor = theme === "dark" ? "#ffffff" : "#000000";
  if (window.backgroundCanvasCtx) {
    window.backgroundCanvasCtx.fillStyle = canvasTextColor;
  }
}

// -----------------------
// INIZIALIZZAZIONE PAGINA
// -----------------------
(function initTheme() {
  const savedTheme = localStorage.getItem("theme-preference");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Usa preferenza di sistema
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(systemPrefersDark ? "dark" : "light");
  }
})();

// -----------------------
// EVENTO CLICK PULSANTE
// -----------------------
toggleBtn.addEventListener("click", toggleTheme);

function updateCardBlur() {
  const aboutCard = document.querySelector('.about-card');
  if (!aboutCard) return;

  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const blurValue = isDark ? 3 : 2;

  // Applica il blur dinamicamente
  aboutCard.style.backdropFilter = `blur(${blurValue}px)`;
  aboutCard.style.webkitBackdropFilter = `blur(${blurValue}px)`;
}

// Aggiorna al caricamento
window.addEventListener('load', updateCardBlur);

// Aggiorna al cambio tema (se hai un toggle JS)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    // piccolo delay se il tema cambia con animazione
    setTimeout(updateCardBlur, 100);
  });
}
