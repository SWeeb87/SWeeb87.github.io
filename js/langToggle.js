// langToggle.js
window.addEventListener("load", () => {
  const langToggle = document.getElementById("lang-toggle");

  const translations = {
    EN: {
      subtitle: "Unity VR Gameplay and Performance Developer",
      aboutTitle: "About Me",
      aboutText1: `Ciao! I'm Lorenzo Rossi, also known as "SWeeb". I'm a Unity VR Gameplay & Performance Developer and
also an electrician. I like expressing my creativity and finding new challenges to overcome with clever solutions.`,
      aboutText2: `I create games both for PC and VR, especially for the Meta Quest 2 and 3 where performance is the key.
In my spare time I also design and build tech projects, like a fully autonomous Desk 3D Scanner.`,
      projects: "PROJECTS",
      resume: "RESUME",
      about: "ABOUT ME",
      scrollHintText: "Scroll down"
    },
    IT: {
      subtitle: "Sviluppatore Unity VR per Gameplay e Performance",
      aboutTitle: "Chi Sono",
      aboutText1: `Ciao! Sono Lorenzo Rossi, anche noto come "SWeeb". Sono uno sviluppatore Unity VR specializzato in gameplay e ottimizzazione.
Mi piace esprimere la mia creatività e affrontare nuove sfide con soluzioni intelligenti.`,
      aboutText2: `Creo giochi sia per PC che per VR, soprattutto per Meta Quest 2 e 3 dove la performance è fondamentale.
Nel tempo libero progetto e costruisco anche progetti tecnologici, come uno Scanner 3D da Scrivania completamente autonomo.`,
      projects: "PROGETTI",
      resume: "CURRICULUM",
      about: "CHI SONO",
      scrollHintText: "Scendi giù"
    }
  };

  // ---- 1. Determina lingua iniziale ----
  let currentLang = "EN"; // fallback
  const savedLang = localStorage.getItem("siteLang");

  if (savedLang) {
    currentLang = savedLang;
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    currentLang = browserLang.toLowerCase().startsWith("it") ? "IT" : "EN";
  }

  // ---- 2. Funzione per aggiornare tutti i testi ----
  function updateTexts() {
    // subtitle
    const subtitle = document.querySelector("[data-lang='subtitle']");
    if (subtitle) subtitle.textContent = translations[currentLang].subtitle;

    // about card
    const aboutTitle = document.querySelector(".about-card h2");
    if (aboutTitle) aboutTitle.textContent = translations[currentLang].aboutTitle;

    const aboutParagraphs = document.querySelectorAll(".about-card p");
    if (aboutParagraphs.length >= 2) {
      aboutParagraphs[0].textContent = translations[currentLang].aboutText1;
      aboutParagraphs[1].textContent = translations[currentLang].aboutText2;
    }

    const scrollHintText = document.querySelector("[data-lang='scrollHintText']");
    if (scrollHintText) scrollHintText.textContent = translations[currentLang].scrollHintText;

    // pulsanti principali
    const projectsBtn = document.querySelector("#scroll-btn span");
    if (projectsBtn) projectsBtn.textContent = translations[currentLang].projects;

    const resumeBtn = document.querySelector("#resume-btn span");
    if (resumeBtn) resumeBtn.textContent = translations[currentLang].resume;

    const aboutBtn = document.querySelector("#About-btn span");
    if (aboutBtn) aboutBtn.textContent = translations[currentLang].about;

    // aggiorna pulsante lingua
    langToggle.textContent = currentLang;

    // salva scelta utente
    localStorage.setItem("siteLang", currentLang);
  }

  // ---- 3. Cambia lingua al click ----
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "IT" : "EN";
    updateTexts();
  });

  // ---- 4. Inizializza ----
  updateTexts();
});
