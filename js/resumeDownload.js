window.addEventListener("load", () => {
  const resumeBtn = document.getElementById("resume-btn");

  // Assumendo che currentLang sia globale o esportato da langToggle.js
  // Se no, ridichiara qui la stessa logica
  let currentLang = localStorage.getItem("siteLang") || "EN";

  // Listener sul click del pulsante resume
  resumeBtn.addEventListener("click", () => {
    // Scegli il file corretto in base alla lingua
    const file = currentLang === "IT" 
      ? "./Assets/Lorenzo Rossi IT CV.pdf"
      : "./Assets/Lorenzo Rossi EN CV.pdf";

    // Forza il download
    const a = document.createElement("a");
    a.href = file;
    a.download = file.split("/").pop(); // nome file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Se vuoi aggiornare currentLang quando l'utente cambia lingua
  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "IT" : "EN";
  });
});
