const platformData = {
  coursera: {
    name: 'Coursera',
    metrics: [
      { label: 'Programs', value: 106, color: '#ef3d76', icon: 'book' },
      { label: 'Courses', value: 15582, color: '#2d9cea', icon: 'cap' },
      { label: 'Enrolled Students', value: 154986, color: '#f3a300', icon: 'users' },
      { label: 'Completed Students', value: 99413, color: '#21ad8a', icon: 'check' }
    ],
    batches: [
      {
        batch: 'CSE 3rd Year_JJ_2026 (VAC)',
        courses: [
          { title: 'Advanced Web Exploits, Python Scripting & Network Attacks', partner: '"Packt"', completedAt: '24-03-2026', progress: 90, certificate: true },
          { title: 'Design and Analyze Secure Networked Systems', partner: '"University of Colorado System"', completedAt: '-', progress: 0, certificate: false },
          { title: 'Ethical Hacking Foundations & Network Security', partner: '"Packt"', completedAt: '24-03-2026', progress: 91, certificate: true },
          { title: 'Exploit Development, Malware, & Defensive Strategies', partner: '"Packt"', completedAt: '24-03-2026', progress: 92, certificate: true },
          { title: 'Web Security, Social Engineering & External Attacks', partner: '"Packt"', completedAt: '24-03-2026', progress: 91, certificate: true }
        ]
      },
      {
        batch: 'CSE 3rd Year_JJ_2026 (VAC)',
        courses: [
          { title: 'Programming for Everybody: Python Basics', partner: '"University of Michigan"', completedAt: '10-03-2026', progress: 86, certificate: true },
          { title: 'Object Oriented Programming in Java', partner: '"University of California San Diego"', completedAt: '-', progress: 42, certificate: false },
          { title: 'Data Structures and Performance', partner: '"University of California San Diego"', completedAt: '14-03-2026', progress: 94, certificate: true },
          { title: 'Algorithmic Toolbox', partner: '"University of California San Diego"', completedAt: '-', progress: 58, certificate: false }
        ]
      },
      {
        batch: 'CSE 3rd Year_JJ_2026 (VAC)',
        courses: [
          { title: 'Machine Learning Foundations for Product Managers', partner: '"Duke University"', completedAt: '21-03-2026', progress: 88, certificate: true },
          { title: 'Introduction to Databases', partner: '"Meta"', completedAt: '23-03-2026', progress: 96, certificate: true },
          { title: 'Cloud Computing Basics', partner: '"LearnQuest"', completedAt: '-', progress: 35, certificate: false },
          { title: 'Software Engineering: Modeling Software Systems', partner: '"The Hong Kong University of Science and Technology"', completedAt: '26-03-2026', progress: 90, certificate: true }
        ]
      }
    ]
  },
  linkedin: {
    name: 'LinkedIn',
    metrics: [
      { label: 'Programs', value: 82, color: '#ef3d76', icon: 'book' },
      { label: 'Courses', value: 8420, color: '#2d9cea', icon: 'cap' },
      { label: 'Enrolled Students', value: 78642, color: '#f3a300', icon: 'users' },
      { label: 'Completed Students', value: 52618, color: '#21ad8a', icon: 'check' }
    ],
    batches: [
      {
        batch: 'LinkedIn Learning_JJ_2026 (VAC)',
        courses: [
          { title: 'Project Management Foundations', partner: '"LinkedIn Learning"', completedAt: '18-03-2026', progress: 100, certificate: true },
          { title: 'Artificial Intelligence Foundations', partner: '"LinkedIn Learning"', completedAt: '20-03-2026', progress: 88, certificate: true },
          { title: 'Leading with Emotional Intelligence', partner: '"LinkedIn Learning"', completedAt: '-', progress: 0, certificate: false },
          { title: 'Data Science Foundations: Fundamentals', partner: '"LinkedIn Learning"', completedAt: '22-03-2026', progress: 94, certificate: true },
          { title: 'Excel Essential Training (365)', partner: '"LinkedIn Learning"', completedAt: '25-03-2026', progress: 86, certificate: true }
        ]
      }
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
const batchList = document.getElementById('moocsBatchList');
let courseProgressChart = null;

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);
const chartColors = ['#ec4899', '#14b8a6', '#f59e0b', '#6366f1', '#22c55e', '#06b6d4'];

function getLegendLabel(title) {
  return title.length > 24 ? `${title.slice(0, 21)}...` : title;
}

function getChartLabel(title) {
  if (title.length <= 24) {
    return title;
  }

  return [
    `${title.slice(0, 20)}...`,
    title.length > 44 ? `${title.slice(20, 40)}...` : title.slice(20)
  ];
}

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

function renderChart(batches) {
  const canvas = document.getElementById('courseProgressChart');
  const labels = batches.map((batch) => batch.batch);
  const chartEntries = batches.flatMap((batch, batchIndex) => {
    const totalProgress = batch.courses.reduce((total, course) => total + course.progress, 0);

    return batch.courses.map((course, courseIndex) => ({
      batchIndex,
      batchName: batch.batch,
      course,
      courseIndex,
      segmentValue: totalProgress ? (course.progress / totalProgress) * 100 : 0
    }));
  });

  if (!window.Chart || !canvas) {
    overviewChart.innerHTML = '<p class="moocs-chart-fallback">Chart is loading. Please refresh if it does not appear.</p>';
    return;
  }

  if (courseProgressChart) {
    courseProgressChart.destroy();
  }

  overviewChart.setAttribute('aria-label', 'Course progress summary chart');
  courseProgressChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: chartEntries.map((entry, index) => ({
        label: getLegendLabel(entry.course.title),
        data: labels.map((_, labelIndex) => labelIndex === entry.batchIndex ? entry.segmentValue : 0),
        backgroundColor: chartColors[index % chartColors.length],
        borderWidth: 0,
        borderRadius: (context) => {
          if (context.dataIndex !== entry.batchIndex) {
            return 0;
          }

          const isFirstSegment = entry.courseIndex === 0;
          const isLastSegment = entry.courseIndex === batches[entry.batchIndex].courses.length - 1;

          return {
            topLeft: isLastSegment ? 10 : 0,
            topRight: isLastSegment ? 10 : 0,
            bottomLeft: isFirstSegment ? 10 : 0,
            bottomRight: isFirstSegment ? 10 : 0
          };
        },
        borderSkipped: false,
        barPercentage: 0.5,
        categoryPercentage: 0.64,
        maxBarThickness: 120,
        batchName: entry.batchName,
        courseTitle: entry.course.title,
        courseProgress: entry.course.progress
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 8,
          right: 12,
          bottom: 4,
          left: 4
        }
      },
      scales: {
        x: {
          stacked: true,
          border: { display: false },
          grid: { display: false },
          ticks: {
            color: '#667085',
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false,
            padding: 10,
            font: { size: 12, weight: '700' },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.includes(' (')
                ? label.replace(' (', '\n(').split('\n')
                : label;
            }
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#667085',
            font: { size: 12, weight: '600' },
            callback: (value) => `${value}%`
          },
          border: { display: false },
          grid: { color: 'rgba(139, 148, 163, 0.2)', drawTicks: false }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          displayColors: true,
          backgroundColor: '#111827',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          borderWidth: 1,
          boxPadding: 5,
          caretPadding: 8,
          cornerRadius: 8,
          padding: 10,
          titleColor: '#fff',
          bodyColor: '#e5e7eb',
          titleFont: { size: 12, weight: '800' },
          bodyFont: { size: 12, weight: '600' },
          callbacks: {
            title: (items) => items[0].dataset.batchName,
            label: (context) => `${context.dataset.courseTitle}: ${context.dataset.courseProgress}%`
          }
        }
      }
    }
  });
}

function renderCourseRows(courses) {
  return courses.map((course) => `
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

function renderBatchList(batches) {
  batchList.innerHTML = batches.map((batch, index) => {
    const panelId = `moocs-batch-panel-${index}`;
    const isOpen = index === 0;

    return `
      <article class="moocs-batch ${isOpen ? 'is-open' : ''}">
        <div class="moocs-course-panel__header">
          <button class="moocs-batch-toggle" type="button" data-batch-index="${index}" aria-expanded="${isOpen}" aria-controls="${panelId}">
            <span>${batch.batch}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          <button class="moocs-certificate-btn" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 3v4"></path>
              <path d="M16 3v4"></path>
              <rect x="4" y="5" width="16" height="16" rx="2"></rect>
              <path d="M8 11h8"></path>
              <path d="M8 15h5"></path>
            </svg>
            My Certificate
          </button>
        </div>

        <div class="moocs-batch-content" id="${panelId}" ${isOpen ? '' : 'hidden'}>
          <div class="moocs-table-wrap">
            <table class="moocs-course-table">
              <thead>
                <tr>
                  <th>
                    <span class="table-head-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                        <path d="M8 3v4"></path>
                        <path d="M16 3v4"></path>
                      </svg>
                      Course
                    </span>
                  </th>
                  <th>Partner</th>
                  <th>Completed At</th>
                  <th>Progress</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>${renderCourseRows(batch.courses)}</tbody>
            </table>
          </div>
        </div>
      </article>
    `;
  }).join('');

  batchList.querySelectorAll('.moocs-batch-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const batch = button.closest('.moocs-batch');
      const content = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      batchList.querySelectorAll('.moocs-batch-toggle').forEach((toggle) => {
        if (toggle === button) {
          return;
        }

        const otherBatch = toggle.closest('.moocs-batch');
        const otherContent = document.getElementById(toggle.getAttribute('aria-controls'));

        toggle.setAttribute('aria-expanded', 'false');
        otherBatch.classList.remove('is-open');
        otherContent.hidden = true;
      });

      button.setAttribute('aria-expanded', String(!isOpen));
      batch.classList.toggle('is-open', !isOpen);
      content.hidden = isOpen;

      if (!isOpen) {
        renderChart(batches);
      }
    });
  });
}

function updateContent(platform) {
  const data = platformData[platform];

  document.getElementById('summary-title').textContent = `${data.name} Program Summary`;
  document.getElementById('summary-subtitle').textContent = `Overview of your ${data.name} learning journey`;
  document.getElementById('overview-title').textContent = `${data.name} Course Progress`;

  renderMetrics(data.metrics);
  renderBatchList(data.batches);
  renderChart(data.batches);
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
