const slidesContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

// Sincronizza altezza con la about-card
function syncAboutHeight() {
  const aboutCard = document.querySelector(".about-card");
  const slideshow = document.querySelector(".about-slideshow");
  if (aboutCard && slideshow) {
    slideshow.style.height = `${aboutCard.clientHeight}px`;
  }
}

// Imposta inizialmente tutte le slide invisibili
slides.forEach((slide) => {
  slide.style.position = "absolute";
  slide.style.top = 0;
  slide.style.left = 0;
  slide.style.width = "100%";
  slide.style.height = "100%";
  slide.style.opacity = "0";
  slide.style.transition = "opacity 1s ease-in-out";
});

// Funzione per scegliere una slide casuale diversa dall'attuale
function getRandomIndex(excludeIndex) {
  let index;
  do {
    index = Math.floor(Math.random() * slides.length);
  } while (index === excludeIndex && slides.length > 1);
  return index;
}

// Inizializza slideshow con slide casuale
currentIndex = getRandomIndex(-1);
slides[currentIndex].style.opacity = "1";

// Funzione per mostrare la slide successiva con crossfade
function nextSlide() {
  const prevIndex = currentIndex;
  currentIndex = getRandomIndex(prevIndex);

  slides[prevIndex].style.opacity = "0";
  slides[currentIndex].style.opacity = "1";
}

// Avvia slideshow al caricamento
window.addEventListener("load", () => {
  const aboutSection = document.querySelector(".about-section");

  function updateAboutMargin() {
    const offset = window.innerHeight * 0.2;
    aboutSection.style.marginTop = `${offset}px`;
  }

  updateAboutMargin();
  window.addEventListener("resize", updateAboutMargin);

  syncAboutHeight();

  // Cambia slide ogni 3 secondi con crossfade
  setInterval(nextSlide, 3000);
});
