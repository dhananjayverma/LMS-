const navLinks = document.querySelectorAll(".nav-link");
const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-btn");
//darkmode  code inspired by 

let themeToggle = document.getElementById("themeToggle");

const createThemeToggle = () => {
  const actions = document.querySelector(".navbar__actions, .course-header__actions");

  if (!actions) {
    return null;
  }

  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.id = "themeToggle";
  button.type = "button";
  button.setAttribute("aria-label", "Switch to dark mode");
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = `
    <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    </span>
    <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5z"></path>
      </svg>
    </span>
  `;
  actions.insertBefore(button, actions.firstElementChild);
  return button;
};

themeToggle = themeToggle || createThemeToggle();

// Ensure themeToggle is properly selected even if it exists in HTML
if (!themeToggle) {
  themeToggle = document.querySelector(".theme-toggle");
}

const setTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
};

const savedTheme = localStorage.getItem("lms-theme");
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

// Attach theme toggle listener with fallback
const attachThemeToggleListener = () => {
  const toggle = document.getElementById("themeToggle") || document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("lms-theme", nextTheme);
      setTheme(nextTheme);
    });
  }
};

attachThemeToggleListener();

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

const courseGrid = document.querySelector(".course-grid");
const previousCoursesButton = document.querySelector('[aria-label="Previous courses"]');
const nextCoursesButton = document.querySelector('[aria-label="Next courses"]');
const courseCarousel = window.jQuery ? window.jQuery(".course-grid") : null;

if (courseGrid && previousCoursesButton && nextCoursesButton) {
  if (courseCarousel?.length && typeof courseCarousel.owlCarousel === "function") {
    courseCarousel.owlCarousel({
      loop: true,
      margin: 16,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 2,
          margin: 10,
        },
        640: {
          items: 2,
          margin: 12,
        },
        1024: {
          items: 3,
        },
        1280: {
          items: 4,
        },
        1536: {
          items: 5,
        },
      },
    });

    previousCoursesButton.addEventListener("click", () => {
      courseCarousel.trigger("prev.owl.carousel");
    });

    nextCoursesButton.addEventListener("click", () => {
      courseCarousel.trigger("next.owl.carousel");
    });
  } else {
    previousCoursesButton.addEventListener("click", () => {
      courseGrid.scrollBy({ left: -300, behavior: "smooth" });
    });

    nextCoursesButton.addEventListener("click", () => {
      courseGrid.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
}

const courseCards = document.querySelectorAll(".course-card, .discover-card, .mycourse-card");

const getCourseValue = (card, selector, fallback = "") => {
  return card.querySelector(selector)?.textContent.trim() || fallback;
};

const openCourseDetail = (card) => {
  const title = getCourseValue(card, "h3", "Course Overview");
  const category =
    getCourseValue(card, ".discover-card__meta span:first-child") ||
    getCourseValue(card, ".mycourse-card__category", "CU LMS Course");
  const progress =
    getCourseValue(card, ".progress strong") ||
    getCourseValue(card, ".discover-card__badge") ||
    getCourseValue(card, ".mycourse-card__progress-value") ||
    "Open";
  const lessons =
    getCourseValue(card, ".discover-card__stats span:first-child") ||
    getCourseValue(card, ".mycourse-card__footer span", "Structured lessons");
  const image =
    card.querySelector(".discover-card__image")?.getAttribute("src") ||
    card.querySelector(".mycourse-card__image")?.getAttribute("src") ||
    "";

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

// Profile Dropdown Logic
const profileDropdown = document.getElementById("profileDropdown");
if (profileDropdown) {
  const profileBtn = profileDropdown.querySelector(".profile-btn");
  const chevronBtn = profileDropdown.querySelector(".chevron-btn");

  const toggleDropdown = (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("is-active");
  };

  profileBtn.addEventListener("click", toggleDropdown);
  chevronBtn.addEventListener("click", toggleDropdown);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove("is-active");
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      profileDropdown.classList.remove("is-active");
    }
  });
}

// Recent Activity Tabs Logic
const activityTabs = document.querySelectorAll('.activity-tabs .tab-btn');
const activityLists = document.querySelectorAll('.activity-list');

if (activityTabs.length > 0 && activityLists.length > 0) {
  activityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      activityTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      // Hide all lists
      activityLists.forEach(list => {
        list.style.display = 'none';
      });

      // Show the target list
      const targetId = tab.getAttribute('data-target');
      const targetList = document.getElementById(targetId);
      if (targetList) {
        targetList.style.display = 'flex';
      }
    });
  });
}
