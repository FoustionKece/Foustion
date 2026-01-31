export async function initNavbar() {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  try {
    // Mengambil isi HTML dari file navbar.html
    const response = await fetch("/src/components/navbar.html");
    if (!response.ok) throw new Error("File navbar tidak ditemukan");

    const html = await response.text();
    placeholder.innerHTML = html;

    // Inisialisasi efek scroll setelah HTML masuk ke DOM
    setupNavScroll();
  } catch (err) {
    console.error("Navbar error:", err);
  }
}

function setupNavScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}
