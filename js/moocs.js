const platformData = {
  coursera: {
    name: 'Coursera',
    batch: 'CSE 3rd Year_JJ_2026 (VAC)',
    metrics: [
      { label: 'Programs', value: 106, color: '#ef3d76', icon: 'book' },
      { label: 'Courses', value: 15582, color: '#2d9cea', icon: 'cap' },
      { label: 'Enrolled Students', value: 154986, color: '#f3a300', icon: 'users' },
      { label: 'Completed Students', value: 99413, color: '#21ad8a', icon: 'check' }
    ],
    courses: [
      { title: 'Advanced Web Exploits, Python Scripting & Network Attacks', partner: '"Packt"', completedAt: '24-03-2026', progress: 90, certificate: true },
      { title: 'Design and Analyze Secure Networked Systems', partner: '"University of Colorado System"', completedAt: '-', progress: 0, certificate: false },
      { title: 'Ethical Hacking Foundations & Network Security', partner: '"Packt"', completedAt: '24-03-2026', progress: 91, certificate: true },
      { title: 'Exploit Development, Malware, & Defensive Strategies', partner: '"Packt"', completedAt: '24-03-2026', progress: 92, certificate: true },
      { title: 'Web Security, Social Engineering & External Attacks', partner: '"Packt"', completedAt: '24-03-2026', progress: 91, certificate: true }
    ]
  },
  linkedin: {
    name: 'LinkedIn',
    batch: 'LinkedIn Learning_JJ_2026 (VAC)',
    metrics: [
      { label: 'Programs', value: 82, color: '#ef3d76', icon: 'book' },
      { label: 'Courses', value: 8420, color: '#2d9cea', icon: 'cap' },
      { label: 'Enrolled Students', value: 78642, color: '#f3a300', icon: 'users' },
      { label: 'Completed Students', value: 52618, color: '#21ad8a', icon: 'check' }
    ],
    courses: [
      { title: 'Project Management Foundations', partner: '"LinkedIn Learning"', completedAt: '18-03-2026', progress: 100, certificate: true },
      { title: 'Artificial Intelligence Foundations', partner: '"LinkedIn Learning"', completedAt: '20-03-2026', progress: 88, certificate: true },
      { title: 'Leading with Emotional Intelligence', partner: '"LinkedIn Learning"', completedAt: '-', progress: 0, certificate: false },
      { title: 'Data Science Foundations: Fundamentals', partner: '"LinkedIn Learning"', completedAt: '22-03-2026', progress: 94, certificate: true },
      { title: 'Excel Essential Training (365)', partner: '"LinkedIn Learning"', completedAt: '25-03-2026', progress: 86, certificate: true }
    ]
  }
};

const iconPaths = {
  book: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H12v15H6.5A2.5 2.5 0 0 0 4 21.5z"></path><path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H12v15h5.5a2.5 2.5 0 0 1 2.5 2.5z"></path>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"></path><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"></path>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9.5" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  check: '<circle cx="12" cy="12" r="9"></circle><path d="m8 12 2.5 2.5L16 9"></path>'
};

const tabs = document.querySelectorAll('.moocs-tab');
const metricGrid = document.getElementById('metricGrid');
const overviewChart = document.getElementById('overviewChart');
const chartLegend = document.getElementById('chartLegend');
const tableBody = document.getElementById('moocsTableBody');

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

function renderMetrics(metrics) {
  metricGrid.innerHTML = metrics.map((metric) => `
    <article class="moocs-metric-card" style="--metric-color: ${metric.color}">
      <span class="moocs-metric-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[metric.icon]}</svg>
      </span>
      <span>${metric.label}</span>
      <strong>${formatNumber(metric.value)}</strong>
    </article>
  `).join('');
}

function renderChart(metrics) {
  const maxValue = 200000;
  overviewChart.innerHTML = `
    <div class="moocs-chart-y-axis">
      <span>200K</span>
      <span>160K</span>
      <span>120K</span>
      <span>80K</span>
      <span>40K</span>
      <span>0</span>
    </div>
    <div class="moocs-chart-plot">
      ${metrics.map((metric) => `
        <div class="moocs-chart-bar-group">
          <strong>${formatNumber(metric.value)}</strong>
          <span class="moocs-chart-bar" style="--bar-color: ${metric.color}; --bar-height: ${Math.max((metric.value / maxValue) * 100, 2)}%;"></span>
          <em>${metric.label}</em>
        </div>
      `).join('')}
    </div>
  `;

  chartLegend.innerHTML = metrics.map((metric) => `
    <span><i style="background: ${metric.color}"></i>${metric.label}</span>
  `).join('');
}

function renderTable(courses) {
  tableBody.innerHTML = courses.map((course) => `
    <tr>
      <td>
        <span class="moocs-course-name">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H12v15H6.5A2.5 2.5 0 0 0 4 21.5z"></path>
            <path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H12v15h5.5a2.5 2.5 0 0 1 2.5 2.5z"></path>
          </svg>
          ${course.title}
        </span>
      </td>
      <td>${course.partner}</td>
      <td>
        <span class="moocs-date">
          ${course.completedAt !== '-' ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="2"></rect><path d="M8 3v4"></path><path d="M16 3v4"></path></svg>' : ''}
          ${course.completedAt}
        </span>
      </td>
      <td>
        <span class="moocs-progress">
          <i><b style="width: ${course.progress}%"></b></i>
          ${course.progress}%
        </span>
      </td>
      <td>
        ${course.certificate ? '<a class="moocs-certificate-link" href="#">View Certificate <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"></path></svg></a>' : '-'}
      </td>
    </tr>
  `).join('');
}

function updateContent(platform) {
  const data = platformData[platform];

  document.getElementById('summary-title').textContent = `${data.name} Program Summary`;
  document.getElementById('summary-subtitle').textContent = `Overview of your ${data.name} learning journey`;
  document.getElementById('overview-title').textContent = `${data.name} Overview`;
  document.getElementById('course-batch-title').textContent = data.batch;

  renderMetrics(data.metrics);
  renderChart(data.metrics);
  renderTable(data.courses);
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const platform = tab.dataset.platform;
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateContent(platform);
  });
});

updateContent('coursera');

// Navbar Mobile Menu Logic
const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav-link");

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
