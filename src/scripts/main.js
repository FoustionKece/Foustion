import "../styles/style.css";
import { initNavbar } from "./navbar.js";
import "./home.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Fitur Dasar
  initNavbar();
  handleScrollReveal();

  // 2. Definisi Fungsi Reveal (Pindahkan ke luar atau biarkan di dalam)
  function handleScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll('[class*="reveal-"]')
      .forEach((el) => observer.observe(el));
  }

  // 3. Logika Opening Overlay
  const overlay = document.getElementById("opening-overlay");
  const bar = document.querySelector(".loader-bar");

  if (bar && overlay) {
    bar.addEventListener("animationend", () => {
      overlay.classList.add("is-loaded");

      // Beri waktu user melihat animasi brand
      setTimeout(() => {
        overlay.style.transition = "opacity 1s ease";
        overlay.style.opacity = "0";

        setTimeout(() => {
          overlay.remove(); // Hapus overlay dari DOM
          window.location.href = "/src/pages/home.html"; // Aktifkan jika ingin pindah halaman
        }, 1000);
      }, 2000);
    });
  }
}); // Penutup DOMContentLoaded yang benar
