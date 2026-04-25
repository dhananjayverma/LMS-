const navLinks = document.querySelectorAll(".nav-link");
const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-btn");

const closeMenu = () => {
  if (!siteHeader || !menuButton) {
    return;
  }

  siteHeader.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
};

if (menuButton && siteHeader) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});
