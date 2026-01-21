window.addEventListener("load", () => {
  const banner = document.getElementById("construction-banner");
  if (!banner) return;

  // Trigger animazione
  banner.style.animation = "drop-banner 5s ease forwards";
});
