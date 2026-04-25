const params = new URLSearchParams(window.location.search);

const title = params.get("title") || "Course Overview";
const category = params.get("category") || "CU LMS Course";
const progress = params.get("progress") || "Open";
const lessons = params.get("lessons") || "Structured lessons";
const providedImage = params.get("image") || "";

const catalog = [
  {
    match: ["aptitude"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Strengthen problem solving, quantitative reasoning, verbal ability, and logical thinking for placement and academic readiness.",
    description:
      "Aptitude-IV is designed to build speed, accuracy, and confidence through guided practice. The course combines concept refreshers, timed quizzes, shortcut methods, and placement-oriented exercises.",
    outcomes: [
      "Solve quantitative aptitude questions with structured methods.",
      "Improve logical reasoning and pattern recognition.",
      "Practice verbal ability questions for campus placement rounds.",
      "Track weak areas through quizzes and assignment performance.",
    ],
    modules: [
      ["Number Systems and Arithmetic", "Core formulas, simplification, ratios, averages, and percentages."],
      ["Logical Reasoning", "Series, arrangements, coding-decoding, and analytical puzzles."],
      ["Verbal Ability", "Grammar, comprehension, vocabulary, and sentence correction."],
      ["Mock Assessment", "Timed practice tests with progress review and improvement plan."],
    ],
  },
  {
    match: ["data structures", "algorithms"],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Learn how to organize data, analyze algorithms, and solve programming problems using efficient computational thinking.",
    description:
      "This course introduces essential data structures and algorithm design ideas used in software development. Students practice implementation, complexity analysis, and problem-solving patterns.",
    outcomes: [
      "Understand arrays, linked lists, stacks, queues, trees, and graphs.",
      "Analyze time and space complexity using Big O notation.",
      "Apply searching, sorting, recursion, and traversal techniques.",
      "Build confidence for coding interviews and lab assessments.",
    ],
    modules: [
      ["Foundations", "Complexity analysis, recursion, arrays, and memory basics."],
      ["Linear Structures", "Linked lists, stacks, queues, and common operations."],
      ["Trees and Graphs", "Traversals, binary trees, graph representation, and shortest paths."],
      ["Algorithm Practice", "Sorting, searching, greedy approaches, and coding challenges."],
    ],
  },
  {
    match: ["communication"],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Develop professional speaking, writing, presentation, and interpersonal communication skills for academic and career growth.",
    description:
      "Communication Skills-II focuses on clarity, confidence, and workplace readiness. Students practice formal writing, presentations, group discussion, and interview communication.",
    outcomes: [
      "Write clearer academic and professional documents.",
      "Present ideas with structure and confidence.",
      "Participate effectively in group discussions.",
      "Prepare for interviews and workplace conversations.",
    ],
    modules: [
      ["Professional Writing", "Emails, reports, summaries, and formal communication."],
      ["Presentation Skills", "Audience awareness, structure, delivery, and visual support."],
      ["Group Discussion", "Listening, turn-taking, argument building, and collaboration."],
      ["Interview Readiness", "Self-introduction, common questions, and response framing."],
    ],
  },
  {
    match: ["mathematics"],
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Build mathematical foundations through guided concepts, examples, assignments, and assessment-focused practice.",
    description:
      "Mathematics-II helps students connect theory with application. The course emphasizes conceptual clarity, solved examples, and continuous practice for exams.",
    outcomes: [
      "Understand key mathematical concepts and their applications.",
      "Solve structured problems with step-by-step reasoning.",
      "Prepare for quizzes, assignments, and semester examinations.",
      "Use mathematical models to approach technical problems.",
    ],
    modules: [
      ["Core Concepts", "Important definitions, formulas, and theorem-based practice."],
      ["Worked Examples", "Guided problem solving with academic context."],
      ["Assignments", "Topic-wise exercises for accuracy and speed."],
      ["Exam Review", "Revision plans, common mistakes, and mock questions."],
    ],
  },
  {
    match: ["ui/ux", "design"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Explore user research, interface structure, visual design, and usability principles through practical design exercises.",
    description:
      "This course introduces the process behind useful digital products. Students move from user needs to wireframes, prototypes, and visual interfaces.",
    outcomes: [
      "Understand user-centered design and research basics.",
      "Create wireframes and interface flows.",
      "Apply layout, color, typography, and usability principles.",
      "Present design decisions with clarity.",
    ],
    modules: [
      ["Design Foundations", "User goals, problem framing, and product thinking."],
      ["Wireframes", "Layout structure, navigation, and content hierarchy."],
      ["Visual Design", "Typography, spacing, color, and reusable UI patterns."],
      ["Usability Review", "Feedback, iteration, and final design presentation."],
    ],
  },
  {
    match: ["music"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Study creative music workflows, rhythm, composition basics, and practical listening skills through guided lessons.",
    description:
      "This course supports learners in understanding music as both a creative and technical discipline. Lessons combine theory, listening, and practice.",
    outcomes: [
      "Understand basic rhythm, melody, and composition structure.",
      "Recognize creative workflows used in music production.",
      "Practice listening and critique with better vocabulary.",
      "Build a small creative project from concept to presentation.",
    ],
    modules: [
      ["Music Basics", "Rhythm, melody, structure, and notation essentials."],
      ["Creative Workflow", "Idea generation, arrangement, and practice routines."],
      ["Listening Lab", "Critical listening, genre awareness, and feedback."],
      ["Project Work", "Create and present a short guided music piece."],
    ],
  },
  {
    match: ["development"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Learn development workflows, coding fundamentals, debugging, and project building with practical hands-on tasks.",
    description:
      "This development course helps students connect concepts with implementation. It focuses on building, testing, and improving small practical projects.",
    outcomes: [
      "Understand development workflow and project structure.",
      "Write cleaner code using reusable patterns.",
      "Debug common implementation issues.",
      "Build and present a functional mini project.",
    ],
    modules: [
      ["Development Setup", "Tools, project files, and workflow basics."],
      ["Core Programming", "Logic, functions, data handling, and reusable code."],
      ["Debugging", "Testing, browser tools, and fixing common errors."],
      ["Mini Project", "Plan, build, polish, and submit a practical project."],
    ],
  },
  {
    match: ["photography"],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1100&q=80",
    summary:
      "Learn composition, camera settings, lighting, and editing basics through visual assignments and critique.",
    description:
      "Photography introduces students to image-making as a practical creative skill. Lessons cover planning, capturing, editing, and presenting visual work.",
    outcomes: [
      "Use composition and framing more intentionally.",
      "Understand exposure, focus, and basic camera controls.",
      "Work with natural and available light.",
      "Edit and present a small photography portfolio.",
    ],
    modules: [
      ["Camera Basics", "Exposure, focus, lens choices, and shooting settings."],
      ["Composition", "Framing, balance, depth, and storytelling."],
      ["Lighting", "Natural light, contrast, shadows, and mood."],
      ["Portfolio Review", "Select, edit, and present final images."],
    ],
  },
];

const buildDailyPlan = (modules) => {
  const dayTypes = ["Concept", "Practice", "Activity", "Review", "Assessment"];
  const timeSlots = ["45 min", "50 min", "40 min", "45 min", "60 min"];
  const taskTypes = [
    "Read the notes and mark two important concepts.",
    "Complete the practice questions before moving ahead.",
    "Submit the short activity in the LMS dashboard.",
    "Revise weak topics and update your study checklist.",
    "Attempt the final quiz and review your score.",
  ];
  const normalizedModules = [...modules];

  if (normalizedModules.length < 5) {
    normalizedModules.push([
      "Final Quiz and Reflection",
      "Complete the closing quiz, review feedback, and note what to revise next.",
    ]);
  }

  return normalizedModules.map(([moduleTitle, moduleText], index) => ({
    day: `Day ${index + 1}`,
    title: moduleTitle,
    text: moduleText,
    type: dayTypes[index] || "Learning",
    time: timeSlots[index] || "45 min",
    task: taskTypes[index] || "Complete the learning task and save your notes.",
  }));
};

const getProgressNumber = (value) => {
  const match = value.match(/\d+/);
  return match ? Math.min(Number(match[0]), 100) : 0;
};

const defaultCourse = {
  image: "Frame 414.png",
  summary:
    "Explore lessons, assessments, resources, and learning support for this CU LMS course.",
  description:
    "This course brings together guided lectures, assignments, quizzes, notes, and academic resources in one place. Students can learn at their own pace while staying aligned with course requirements.",
  outcomes: [
    "Access all course resources from one dashboard.",
    "Track progress across lessons, assignments, and assessments.",
    "Prepare for coursework with structured modules.",
    "Review feedback and improve performance over time.",
  ],
  modules: [
    ["Orientation", "Course structure, outcomes, and resource walkthrough."],
    ["Core Lessons", "Topic-wise lectures, notes, and practice material."],
    ["Assignments", "Submission tasks, rubrics, and feedback checkpoints."],
    ["Assessment Review", "Quiz practice, revision notes, and exam readiness."],
  ],
};

const normalizedTitle = title.toLowerCase();
const selectedCourse =
  catalog.find((course) => course.match.some((term) => normalizedTitle.includes(term))) ||
  defaultCourse;

document.title = `${title} | CU LMS Portal`;
document.getElementById("course-title").textContent = title;
document.getElementById("course-category").textContent = category;
document.getElementById("course-summary").textContent = selectedCourse.summary;
document.getElementById("course-description").textContent = selectedCourse.description;
document.getElementById("course-progress").textContent = progress;
document.getElementById("course-lessons").textContent = lessons.replace(/\s+/g, " ");

const progressNumber = getProgressNumber(progress);
document.getElementById("course-progress-percent").textContent = `${progressNumber}%`;
document.querySelector(".progress-ring").style.borderTopColor =
  progressNumber >= 70 ? "#22c55e" : "#ef2326";
document.getElementById("next-step").textContent =
  progressNumber > 0
    ? "Continue from the next unfinished day in your learning path."
    : "Open Day 1 and finish the first learning task.";

const courseImage = document.getElementById("course-image");
courseImage.src = providedImage || selectedCourse.image;
courseImage.alt = `${title} preview`;

const outcomesList = document.getElementById("course-outcomes");
selectedCourse.outcomes.forEach((outcome) => {
  const item = document.createElement("li");
  item.textContent = outcome;
  outcomesList.appendChild(item);
});

const moduleList = document.getElementById("course-modules");
const dailyPlan = buildDailyPlan(selectedCourse.modules);

dailyPlan.forEach((dayItem) => {
  const day = document.createElement("div");
  day.className = "module-day";
  day.innerHTML = `
    <span class="module-day__number">${dayItem.day}</span>
    <div class="module-day__body">
      <strong>${dayItem.title}</strong>
      <p>${dayItem.text}</p>
      <div class="module-day__meta">
        <span>${dayItem.type}</span>
        <span>${dayItem.time}</span>
      </div>
      <div class="module-day__task">
        <strong>Today&apos;s task</strong>
        <span>${dayItem.task}</span>
      </div>
    </div>
  `;
  moduleList.appendChild(day);
});
