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
      scrollHintText: "Scroll down",
      projectsIntroduction: "PERSONAL PROJECTS",
      game1A: "My first ever game, developed in 1 year and published for Meta Quest 2, later 3, in 2021. And later updated and polished over the course of 3 years.",
      game1B: "Born from the desire to play a VR game from a series i like. Gathered 85.000+ downloads and created a community of dedicated fans.",
      game2A: "My second VR project, aiming at creating a true horror experience utilizing everything VR has to offer. And creating a spiritual successor to the Silent Hill series, taking inspiration from SH2 and SH3.",
      game2B: "This project helped me create new optimization tools thanks to the demanding graphics standards i set myself. Unfortunately the project's development is on hold.",
      game3A: "A simple puzzle game made for the 2024 GMTK Game Jam, landing 1564th place in 7539 entries.",
      game3B: "CURBIT focuses on the Rubik's cube puzzle formula, and adds an \"electric\" spin, with live circuitsthat update as the faces of the cube move.",
      game4A: "This is my second electronics project, after the LED Matrix Clock. I wanted to experiment with photogrammetry and i also needed a custom grip for my bow.",
      game4B: "Other than just designing the electronics, this time, i also had to create the whole structure of the machine, think about the weight distrubution and lense setup."
    },
    IT: {
      subtitle: "Sviluppatore Unity VR per Gameplay e Performance",
      aboutTitle: "Chi Sono",
      aboutText1: `Ciao! Sono Lorenzo Rossi, anche noto come "SWeeb". Sono uno sviluppatore Unity VR specializzato in gameplay e ottimizzazione.
Mi piace esprimere la mia creatività e affrontare nuove sfide con soluzioni intelligenti.`,
      aboutText2: `Creo giochi sia per PC che per VR, soprattutto per Meta Quest 2 e 3 dove la performance è fondamentale.
Nel tempo libero progetto e costruisco anche progetti tecnologici, come uno Scanner 3D da scrivania completamente autonomo.`,
      projects: "PROGETTI",
      resume: "CURRICULUM",
      about: "CHI SONO",
      scrollHintText: "Scendi giù",
      projectsIntroduction: "PROGETTI PERSONALI",
      game1A: "Il mio primo gioco in assoluto, sviluppato in 1 anno e pubblicato nel 2021 per Meta Quest 2 e successivamente Quest 3. In seguito aggiornato e rifinito nel corso di 3 anni.",
      game1B: "Nato dal desiderio di giocare a un titolo VR appartenente a una serie che amo. Ha superato gli 85.000 download e dato vita a una community di fan dedicati.",
      game2A: "Il mio secondo progetto VR, con l\’obiettivo di creare una vera esperienza horror sfruttando tutto ciò che la VR ha da offrire, e di realizzare un successore spirituale della serie Silent Hill, ispirandosi a SH2 e SH3.",
      game2B: "Questo progetto mi ha permesso di sviluppare nuovi strumenti di ottimizzazione grazie agli elevati standard grafici che mi ero imposto.",
      game3A: "Un semplice puzzle game realizzato per la GMTK Game Jam 2024, che si è classificato al 1564º posto su 7539 partecipanti.",
      game3B: "CURBIT riprende la formula dei puzzle basati sul Cubo di Rubik e aggiunge una svolta \"elettrica\", con circuiti attivi che si aggiornano in tempo reale mentre le facce del cubo si muovono.",
      game4A: "Questo è il mio secondo progetto di elettronica, dopo L’Orologio a Matrice LED. Volevo sperimentare con la fotogrammetria e avevo anche bisogno di un’impugnatura personalizzata per il mio arco.",
      game4B: "Oltre alla progettazione dell’elettronica, questa volta ho dovuto realizzare l’intera struttura della macchina, studiando la distribuzione del peso e la configurazione delle lenti."
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

    const projectsIntroduction = document.querySelector(".projects-introduction p");
    if (projectsIntroduction) projectsIntroduction.textContent = translations[currentLang].projectsIntroduction;

    const game1Paragraphs = document.querySelectorAll("#game-1 p");
    if (game1Paragraphs.length >= 2) {
      game1Paragraphs[0].textContent = translations[currentLang].game1A;
      game1Paragraphs[1].textContent = translations[currentLang].game1B;
    }

    const game2Paragraphs = document.querySelectorAll("#game-2 p");
    if (game2Paragraphs.length >= 2) {
      game2Paragraphs[0].textContent = translations[currentLang].game2A;
      game2Paragraphs[1].textContent = translations[currentLang].game2B;
    }

    const game3Paragraphs = document.querySelectorAll("#game-3 p");
    if (game3Paragraphs.length >= 2) {
      game3Paragraphs[0].textContent = translations[currentLang].game3A;
      game3Paragraphs[1].textContent = translations[currentLang].game3B;
    }

    const game4Paragraphs = document.querySelectorAll("#game-4 p");
    if (game4Paragraphs.length >= 2) {
      game4Paragraphs[0].textContent = translations[currentLang].game4A;
      game4Paragraphs[1].textContent = translations[currentLang].game4B;
    }
    
    const scrollHintText = document.querySelector("[data-lang='scrollHintText']");
    if (scrollHintText) scrollHintText.textContent = translations[currentLang].scrollHintText;

    // pulsanti principali
    const projectsBtn = document.querySelector("#projects-btn span");
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
