# CU LMS Portal

A premium, modern, and highly interactive **Learning Management System (LMS) Portal** designed for Chandigarh University. Built using semantic HTML5, vanilla CSS, and clean JavaScript, this application delivers a responsive and high-fidelity learning experience across all devices.

---

## 🌟 Key Features

*   **Universal Dark Mode**: Seamlessly toggle between dark and light themes using the sun/moon toggle in the navigation bar. The theme preferences are persisted across pages using `localStorage`.
*   **Interactive Analytics Dashboards**: Rich data representations including custom CSS-built charts (stacked & grouped progress bars, donut chart layout) and dynamic Chart.js configurations.
*   **Dynamic Course Detail Rendering**: A single, reusable detail page (`course-detail.html`) that parses URL parameters to display personalized information, progress bars, outline maps, and resources for any selected course.
*   **Responsive Collapsible Batches**: Hierarchical view of course cohorts with toggle headers, progress meters, and dynamic platform switching (e.g., Coursera vs. LinkedIn Learning).
*   **Modern Interactive Components**: Owl Carousel integration for course sliders, animated active navigation markers, clean dropdown animations, filter toolbars, and responsive side drawers.

---

## 📂 Page Directory & Functionality

### 1. Home Page (`index.html`)
The main entry point highlighting the LMS portal features.
*   **Hero Visuals**: Floating status cards showing active course counts, pending assignments, and an alert panel for important notices.
*   **Top Course Slider**: Responsive card carousel showcasing key academic courses (Aptitude, Data Structures, AI, etc.) with individual progress indicators.
*   **Course Discovery**: An area where students can search, categorize, and sort courses by topics (e.g., Web Design, Development, Music, Photography).

### 2. Main Dashboard (`dashboard.html`)
The central hub for student analytics and schedules.
*   **Welcome Hero**: Dynamic greeting card with quick action buttons.
*   **Key Metrics Row**: Side statistics and grid-cards tracking active courses, streak count, and submitted assignments.
*   **Learning Analytics Section**:
    *   *Course Progress*: Custom styled column chart representing progression percentages.
    *   *Content Distribution*: Stacked bar chart breaking down learning assets (videos, quizzes, presentation slides, pages, PDFs) with interactive mouse-hover tooltips.
    *   *Time Allocation*: Custom donut chart layout detailing hours spent on individual subjects, paired with key recommendation insights and a weekly study progress goal bar.
*   **Task Lists & Widget Calendar**: Lists showing pending/completed assignments and an interactive monthly calendar widget indicating dates with academic events.

### 3. Enrolled Courses (`mycourses.html`)
A dedicated dashboard showing all the courses the user is currently studying.
*   **Workspace Metrics**: Quick calculations of Active, Completed, Pending Tasks, and Average Progress.
*   **Interactive Search & Filter Bar**: Filter courses on the fly by status tabs (*All*, *In Progress*, *Completed*, *New*) or live search inputs.
*   **Course Progress Cards**: Displays clean visual metrics, dynamic progress rings, and quick links to continue studies.

### 4. MOOCs Courses (`moocs.html`)
Tracks and consolidates learning statistics from external platforms like Coursera and LinkedIn Learning.
*   **Platform Selector Tabs**: Fast tab switching between Coursera and LinkedIn Learning data.
*   **Overview Panel**: Stacked bar chart rendered via **Chart.js** displaying batch-wise progress. The chart elements, grid-lines, and tooltips automatically restyle themselves to fit light and dark modes.
*   **Batch Dropdowns**: Collapsible batch accordion panels displaying structured tabular course tables complete with completion dates, progress indicators, and "View Certificate" actions.

### 5. Course Details (`course-detail.html`)
A template detail view loaded dynamically based on user selections from the dashboard or course lists.
*   **URL Query Processing**: Decodes course title, categories, progress indicators, lesson counts, and images on load.
*   **Interactive Study Kit**: Contains links to lecture notes, practice sets, recorded sessions, and academic doubt forms.
*   **Day-by-Day Learning Path**: Step-by-step modular timeline highlighting daily tasks and topics to keep students on track.

---

## 🛠️ Tech Stack & Structure

*   **HTML5**: Styled with standard semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) with descriptive unique element IDs for performance and accessibility testing.
*   **CSS3**: High-performance animations and custom property-based theme tokens. 
    *   `css/index.css`: Holds the central CSS utility tokens, core layouts, components (cards, headers, footers), and global dark mode themes.
    *   `css/moocs.css`: Dedicated rules for platforms, tables, metrics, and dark mode overrides for MOOC grids.
    *   `css/course-detail.css`: Styles for modules, timelines, ring progress bars, and detail hero components.
*   **JavaScript (ES6+)**:
    *   `js/index.js`: Manages standard interactions: menu drawers, dropdown active states, carousel handlers, URL detail page redirection, and the global dark mode toggle.
    *   `js/moocs.js`: Holds raw platform data structures, renders metrics, generates tabular layouts, registers accordion toggles, and initializes/updates the Chart.js configuration.
    *   `js/course-detail.js`: Captures URL context, computes dynamic progress visual metrics, and fills module outlines based on the active course metadata.
*   **Libraries**:
    *   [Chart.js](https://www.chartjs.org/) (for MOOCs progress visualization)
    *   [Owl Carousel 2](https://owlcarousel2.github.io/OwlCarousel2/) & jQuery (for home page sliders)
    *   Google Fonts (Plus Jakarta Sans)
