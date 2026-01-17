// Hint scroll: scompare quando scrolli
const scrollHintContainer = document.getElementById("scroll-hint-container");
const scrollHintText = document.getElementById("scroll-hint-text");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollHintContainer.style.opacity = "0";
  } else {
    scrollHintContainer.style.opacity = "1";
  }
});

const backToTop = document.getElementById("back-to-top");

// Mostra/nascondi bottone quando scrolli
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) { // compare dopo aver scrollato 100px
    backToTop.style.opacity = 1;
    backToTop.style.pointerEvents = "auto";
  } else {
    backToTop.style.opacity = 0;
    backToTop.style.pointerEvents = "none";
  }
});

// Click per tornare in cima con smooth scroll
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const aboutBtn = document.getElementById("About-btn");
const aboutSection = document.getElementById("about-me");

aboutBtn.addEventListener("click", () => {
  const offset = window.innerHeight * 0.35; // leggermente sotto
  window.scrollTo({
    top: aboutSection.offsetTop - offset,
    behavior: "smooth"
  });
});

const projectsBtn = document.getElementById("projects-btn");
const projectsSection = document.getElementById("game-1");

projectsBtn.addEventListener("click", () => {
  const offset = window.innerHeight * 0.35; // leggermente sotto
  window.scrollTo({
    top: projectsSection.offsetTop - offset,
    behavior: "smooth"
  });
});