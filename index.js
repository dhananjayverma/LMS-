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

const courseCards = document.querySelectorAll(".course-card, .discover-card");

const getCourseValue = (card, selector, fallback = "") => {
  return card.querySelector(selector)?.textContent.trim() || fallback;
};

const openCourseDetail = (card) => {
  const title = getCourseValue(card, "h3", "Course Overview");
  const category = getCourseValue(card, ".discover-card__meta span:first-child", "CU LMS Course");
  const progress =
    getCourseValue(card, ".progress strong") ||
    getCourseValue(card, ".discover-card__badge") ||
    "Open";
  const lessons = getCourseValue(card, ".discover-card__stats span:first-child", "Structured lessons");
  const image = card.querySelector(".discover-card__image")?.getAttribute("src") || "";

  const params = new URLSearchParams({
    title,
    category,
    progress,
    lessons,
  });

  if (image) {
    params.set("image", image);
  }

  window.location.href = `course-detail.html?${params.toString()}`;
};

courseCards.forEach((card) => {
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `Open ${getCourseValue(card, "h3", "course")} details`);

  card.addEventListener("click", () => openCourseDetail(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCourseDetail(card);
    }
  });
});
