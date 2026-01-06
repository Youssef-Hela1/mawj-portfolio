// Fade-in animation for mission section
const missionSection = document.querySelector('.mission-section');
const servicesSection = document.querySelector('.services-section');


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% visible
});

if (missionSection) {
    observer.observe(missionSection);
}
if (servicesSection) {
    observer.observe(servicesSection);
}

function updateUI() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Hide/Show Scroll Indicator (Safe check)
    if (scrollIndicator) {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }

    // --- Wave Generation ---
    const width = window.innerWidth;
    const waveSvg = document.querySelector('.wave-svg');
    const visualPath = document.getElementById('visual-wave-path');

    const h = waveSvg ? (waveSvg.clientHeight || (width * 0.15)) : 150;
    const w = width;

    // --- Logic for "More Wavey" (Double Sine Wave) ---
    // We oscillate between 0 (top) and h (bottom), centered at h/2.
    // This creates distinct crests and troughs relative to the midline.

    // Y-Coordinates for Visual Path (Relative to SVG top-left 0,0)
    const yMid = h / 2;
    const yTop = 0;
    const yBot = h;

    // Control points X-ratios
    // Cycle 1: 0 -> w/4 (Up), w/4 -> w/2 (Down)
    // Cycle 2: w/2 -> 3w/4 (Up), 3w/4 -> w (Down)
    // Actually, let's do: Start(Mid) -> Up Peak -> Mid -> Down Peak -> Mid -> Up Peak -> Mid -> Down Peak -> Mid?
    // User said "more troughs and crests but not too many".
    // 2 Full cycles: Mid -> Up -> Mid -> Down -> Mid -> Up -> Mid -> Down -> Mid ? That's 4 humps.
    // Let's do 2 Simple Cycles: Mid -> Up -> Down -> Mid (One Cycle) x 2?
    // Cycle 1: 0 to w/2. Start Mid. Go Up to Top. Go Down to Bot. End Mid.
    // Cycle 2: w/2 to w. Same.

    // Bezier segments:
    // 1. 0 to w*0.25: Mid -> Top -> Mid? No, simple C is one arc.
    // Let's do:
    // C1: 0 to 0.25w (Mid to Top to Mid is hard with 1 C).
    // Let's do:
    // P0: 0, Mid.
    // C1: 0.1w, Top. 0.15w, Top. 0.25w, Mid.
    // S1: 0.4w, Bot. 0.5w, Mid.
    // S2: 0.65w, Top. 0.75w, Mid.
    // S3: 0.9w, Bot. 1.0w, Mid.

    // Visual Path Construction
    // Note: To fill the TOP with blue, we must close the loop: Start 0,0 -> 0,Mid -> Curve -> w,Mid -> w,0 -> Z.

    // Dynamic Curve String function
    const generateCurve = (yOffset) => {
        const YM = yMid + yOffset;
        const YT = yTop + yOffset;
        const YB = yBot + yOffset;

        return `C ${w * 0.1},${YT} ${w * 0.15},${YT} ${w * 0.25},${YM} ` +
            `S ${w * 0.4},${YB} ${w * 0.5},${YM} ` +
            `S ${w * 0.65},${YT} ${w * 0.75},${YM} ` +
            `S ${w * 0.9},${YB} ${w},${YM} `;
    };

    const visualCurve = generateCurve(0); // No offset for visual
    const visualD = `M 0, 0 L 0, ${yMid} ${visualCurve} L ${w}, 0 Z`;

    if (waveSvg && visualPath) {
        waveSvg.setAttribute('viewBox', `0 0 ${w} ${h} `);
        visualPath.setAttribute('d', visualD);
        visualPath.setAttribute('fill', '#0177BF');
    }

    // --- Scroll Locking Logic ---
    const brandOverlay = document.querySelector('.brand-overlay');
    // Lock point: 100% of viewport
    const lockLimit = window.innerHeight;

    if (brandOverlay) {
        if (window.scrollY > lockLimit) {
            brandOverlay.style.position = 'absolute';
            brandOverlay.style.top = lockLimit + 'px';
        } else {
            brandOverlay.style.position = 'fixed';
            brandOverlay.style.top = '0px';
        }
    }

    // --- Mask Update Logic ---
    const wrapper = document.querySelector('.logo-blue-wrapper-fullscreen');
    let relativeWaveY = 0;

    if (waveSvg && wrapper) {
        const waveRect = waveSvg.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        relativeWaveY = waveRect.top - wrapperRect.top;
    }

    // Mask must cover the WHITE (bottom) area.
    // Visual is Blue (Top).
    // So Mask is Everything BELOW the curve.
    // Start at 0,Mid+Offset -> Curve -> w,Mid+Offset -> w,Depth -> 0,Depth -> Z.

    const depth = window.innerHeight * 5;
    const maskCurve = generateCurve(relativeWaveY); // Offset by Y position

    const maskD = `M 0, ${yMid + relativeWaveY} ${maskCurve} L ${w},${depth + relativeWaveY} L 0, ${depth + relativeWaveY} Z`;

    const clipPath = document.getElementById('clip-wave-path');
    if (clipPath) {
        clipPath.setAttribute('d', maskD);
        clipPath.removeAttribute('transform');
    }

    // 3. Sync Logo Sizes
    const fixedLogoImg = document.querySelector('.logo-white');
    const bluePositioner = document.querySelector('.logo-blue-positioner');

    if (fixedLogoImg && bluePositioner) {
        const rect = fixedLogoImg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            bluePositioner.style.width = rect.width + 'px';
            bluePositioner.style.height = rect.height + 'px';
        }
    }
}

function fixMask() {
    const blueLogo = document.querySelector('.logo-blue');
    if (blueLogo && !blueLogo.dataset.reflowed) {
        blueLogo.style.display = 'none';
        void blueLogo.offsetHeight;
        blueLogo.style.display = 'block';
        blueLogo.dataset.reflowed = 'true';
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateUI();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('resize', updateUI);
window.addEventListener('DOMContentLoaded', () => {
    fixMask();
    updateUI();
});

// Service Modal Logic
const serviceDetails = {
    "Business Dashboards": [
        "Requirement Analysis & KPI Definition",
        "Data Source Integration",
        "Interactive Visualization Design",
        "Dashboard Development",
        "Testing & Deployment"
    ],
    "Landing Pages": [
        "Goal Setting & Audience Research",
        "High-Convert Copywriting",
        "Impactful UI/UX Design",
        "Responsive Development",
        "Performance Optimization"
    ],
    "Portfolios": [
        "Personal Branding Strategy",
        "Project Curation & Showcase",
        "Visual Identity Design",
        "Custom Development",
        "Launch & Social Integration"
    ],
    "Personal Websites": [
        "Identity & Voice Discovery",
        "Content Strategy",
        "Custom Design & Layout",
        "Blog/Feature Integration",
        "SEO Basic Setup"
    ],
    "Business Websites": [
        "Market Research & Competitor Analysis",
        "UX Strategy & Information Architecture",
        "Corporate Design System",
        "Full-Stack Development",
        "Maintenance & Support"
    ]
};

const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalSteps = document.getElementById('modal-steps');
const closeModal = document.querySelector('.close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const serviceCards = document.querySelectorAll('.service-card');

// Refactored to accept title and steps directly
function openModal(title, steps) {
    if (!steps) return;

    modalTitle.textContent = title;
    modalSteps.innerHTML = '';

    steps.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';

        const stepNum = document.createElement('div');
        stepNum.className = 'step-number';
        stepNum.textContent = index + 1;

        const stepText = document.createElement('span');
        stepText.textContent = step;

        stepItem.appendChild(stepNum);
        stepItem.appendChild(stepText);
        modalSteps.appendChild(stepItem);
    });

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Update existing listeners to use new signature
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const steps = serviceDetails[title]; // Look up from object
        openModal(title, steps);
    });
});

// --- Featured Projects Logic ---

const projects = [
    {
        title: "Project Alpha: A Comprehensive E-Commerce Solution for Modern Businesses",
        url: "https://example.com/alpha",
        caseStudy: {
            title: "Project Alpha Case Study",
            steps: [
                "Client Brief & Objective Analysis",
                "Custom UI/UX Design System",
                "React & Node.js Integration",
                "Performance Tuning",
                "Launch Success"
            ]
        }
    },
    {
        title: "Project Beta",
        url: "https://example.com/beta",
        caseStudy: {
            title: "Project Beta Case Study",
            steps: [
                "Market Research",
                "Wireframing & Prototyping",
                "E-commerce Integration",
                "SEO Optimization Strategy",
                "Handover & Training"
            ]
        }
    }
    // Add more projects here (Max 4 recommended)
];

const projectsContainer = document.getElementById('projects-container');

function renderProjects() {
    if (!projectsContainer) return;

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // 1. Main Project Box (Link)
        const mainBox = document.createElement('div');
        mainBox.className = 'project-main';
        mainBox.innerHTML = `<h3 class="project-title">${project.title}</h3>`;
        mainBox.addEventListener('click', () => {
            window.open(project.url, '_blank');
        });

        // 2. Case Study Box (Modal)
        const caseStudyBox = document.createElement('button');
        caseStudyBox.className = 'project-case-study';
        caseStudyBox.textContent = 'View Case Study';
        caseStudyBox.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering main box if nested (they aren't, but safety)
            openModal(project.caseStudy.title, project.caseStudy.steps);
        });

        card.appendChild(mainBox);
        card.appendChild(caseStudyBox);
        projectsContainer.appendChild(card);
    });
}

// Initial Render
renderProjects();

// Observe Featured Projects for Fade In
const featuredSection = document.querySelector('.featured-projects');
if (featuredSection) {
    observer.observe(featuredSection);
}

closeModal.addEventListener('click', closeModalHandler);
modalOverlay.addEventListener('click', closeModalHandler);

/* Contact Phone Toggle */
const phoneBtn = document.getElementById('phone-btn');

if (phoneBtn) {
    phoneBtn.addEventListener('click', (e) => {
        // Prevent bubbling if needed, though mostly not for this
        phoneBtn.classList.toggle('expanded');
    });
}
