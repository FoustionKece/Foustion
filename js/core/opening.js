document.addEventListener("DOMContentLoaded", () => {
  const OPENING_KEY = "fstn_last_visit";
  const OPENING_DELAY = 15 * 60 * 1000; // 15 menit

  const loader = document.getElementById("opening-loader");
  const mainContent = document.getElementById("main-content");
  const logoObject = document.getElementById("fstn-logo");

  const now = Date.now();
  const lastVisit = localStorage.getItem(OPENING_KEY);

  // ===== CHECK 15 MENIT =====
  if (lastVisit && now - lastVisit < OPENING_DELAY) {
    skipOpening();
    return;
  }

  // ===== SIMPAN VISIT =====
  localStorage.setItem(OPENING_KEY, now);

  // ===== LOAD SVG INLINE =====
  logoObject.addEventListener("load", () => {
    const svgDoc = logoObject.contentDocument;
    const svg = svgDoc.querySelector("svg");

    // Masukkan SVG inline ke DOM
    const wrapper = document.querySelector(".logo-wrapper");
    wrapper.innerHTML = "";
    wrapper.appendChild(svg);

    // Ambil semua fragment
    const fragments = svg.querySelectorAll("path, polygon, rect, circle");

    fragments.forEach((fragment) => {
      fragment.classList.add("logo-fragment");

      // RANDOM POSISI + ROTASI (MAGNET EFFECT)
      const x = Math.random() * 600 - 300; // -300px s/d 300px
      const y = Math.random() * 600 - 300;
      const r = Math.random() * 180 - 90;

      fragment.style.setProperty("--x", `${x}px`);
      fragment.style.setProperty("--y", `${y}px`);
      fragment.style.setProperty("--r", `${r}deg`);
    });

    // TRIGGER ANIMATION
    setTimeout(() => {
      loader.classList.add("active");
    }, 200);

    // SELESAI OPENING
    setTimeout(finishOpening, 4200);
  });

  // ===== FUNCTIONS =====

  function finishOpening() {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.remove();
      mainContent.classList.remove("hidden");
    }, 600);
  }

  function skipOpening() {
    loader.remove();
    mainContent.classList.remove("hidden");
  }
});
