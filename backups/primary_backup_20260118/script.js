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
        if (window.scrollY > 5) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }

    // Toggle navbar & logo position/shadow
    const scrolledElements = document.querySelectorAll('.nav-container, .fixed-logo-container');
    scrolledElements.forEach(el => {
        if (window.scrollY > 50) {
            el.classList.add('scrolled');
        } else {
            el.classList.remove('scrolled');
        }
    });

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

    // --- Settle Animation Logic ---
    // Make logo/text rise slightly as we scroll (0 to 300px)
    const settleProgress = Math.min(window.scrollY / 300, 1);
    const settleOffset = 50 * (1 - settleProgress); // Starts at 50px, ends at 0px

    // Apply settle transform to elements
    const logoContainer = document.querySelector('.fixed-logo-container');
    const mawjText = document.querySelector('.mawj-text');
    const subtitles = document.querySelectorAll('.subtitle-base, .subtitle-indigo');
    const bluePositioner = document.querySelector('.logo-blue-positioner');

    if (logoContainer) logoContainer.style.transform = `translate(-50%, calc(-50% + ${settleOffset}px))`;
    if (mawjText) mawjText.style.transform = `translate(-50%, ${settleOffset}px)`;
    if (bluePositioner) bluePositioner.style.transform = `translate(-50%, calc(-50% + ${settleOffset}px))`;
    subtitles.forEach(s => s.style.transform = `translate(-50.5%, ${settleOffset}px)`);

    // 3. Sync Logo Sizes (Already handles bluePositioner size)
    const fixedLogoImg = document.querySelector('.logo-white');

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
window.addEventListener('resize', updateUI);
window.addEventListener('DOMContentLoaded', () => {
    fixMask();
    updateUI();
    initNavbar();
    // Load Dynamic Content
    loadContent();
});

function initNavbar() {
    const toggles = document.querySelectorAll('.nav-toggle');
    const navContainers = document.querySelectorAll('.nav-container');

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            navContainers.forEach(nav => nav.classList.toggle('nav-open'));
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = link.getAttribute('href');
            const targetEl = document.querySelector(targetSelector);

            if (targetEl) {
                // Determine header offset if any
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close nav on click
                navContainers.forEach(nav => nav.classList.remove('nav-open'));
            }
        });
    });

    // Close nav on scroll or click outside
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navContainers.forEach(nav => nav.classList.remove('nav-open'));
        }
    }, { passive: true });
}

// Service Modal Logic
const serviceDetails = {
    "Dashboards": [
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
    modal.classList.remove('wide-modal'); // Reset width
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

// --- Fetched Projects Logic ---
let projects = []; // Populated via Firestore

const projectsContainer = document.getElementById('projects-container');

async function loadContent() {
    // If on Admin site, let disable-navigation.js handle data/content
    if (window.IS_ADMIN) return;

    if (!window.db) {
        console.warn("Firebase DB not linked. Dynamic content unavailable.");
        return;
    }

    try {
        // 1. Fetch Settings (Text content)
        const settingsDoc = await db.collection('settings').doc('general').get();
        if (settingsDoc.exists) {
            const data = settingsDoc.data();
            applySiteSettings(data);
        }

        // 2. Fetch Projects
        const snapshot = await db.collection('projects').get();
        if (!snapshot.empty) {
            projects = snapshot.docs.map(doc => doc.data());
            renderProjects();
        }

        // 3. Populate Legal Content (Lazy or Eager)
        // We'll keep the object structure but fill it if needed
    } catch (e) {
        console.error("Error loading content:", e);
    }
}

function applySiteSettings(data) {
    // Similar to disable-navigation logic but for read-only
    if (data.contact_email) {
        const btn = document.querySelector('.btn-contact');
        if (btn) btn.setAttribute('href', `mailto:${data.contact_email}`);
    }
    if (data.contact_phone) {
        const span = document.getElementById('phone-number');
        if (span) span.textContent = data.contact_phone;
    }

    // Socials
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach(icon => {
        const rawKey = icon.getAttribute('aria-label');
        if (rawKey) {
            const key = rawKey.trim();
            if (data[key]) icon.setAttribute('href', data[key]);
        }
    });

    // Text Content
    const map = [
        { selector: '.contact-title', key: 'contact_title_text' },
        { selector: '.mission-title', key: 'section_mission_title' },
        { selector: '.mission-text', key: 'section_mission_text' },
        { selector: '.services-section .services-title', key: 'section_services_title' },
        { selector: '.featured-projects .services-title', key: 'section_projects_title' }
    ];
    map.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el && data[item.key]) el.innerText = data[item.key];
    });
}

function renderProjects() {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // 1. Main Project Box (Link)
        const mainBox = document.createElement('div');
        mainBox.className = 'project-main';

        // Matches disable-navigation.js logic
        const thumbUrl = project.thumbnail;
        const titleHeader = `
            <div style="
                width: 100%;
                background-color: #0177BF;
                padding: 10px 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: auto;
                position: relative;
                z-index: 2;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            ">
                <h3 class="project-title" style="margin:0; color:white; font-size: 1.4rem; line-height: 1.2; background: transparent;">${project.title}</h3>
            </div>
        `;

        let content = titleHeader;

        if (thumbUrl && (thumbUrl.startsWith('http') || thumbUrl.startsWith('data:'))) {
            mainBox.style.backgroundImage = `url('${thumbUrl}')`;
            mainBox.style.backgroundSize = 'cover';
            mainBox.style.backgroundRepeat = 'no-repeat';
            mainBox.style.backgroundPosition = 'center';
            // Overlay for readability (Reduced to 0.2)
            content = `<div style="position:absolute; inset:0; background:rgba(0,0,0,0.2); z-index:1; border-radius:inherit;"></div>` + content;
            mainBox.style.color = 'white';
        }

        mainBox.style.display = 'flex';
        mainBox.style.flexDirection = 'column';
        mainBox.style.justifyContent = 'flex-start';
        mainBox.style.alignItems = 'stretch';

        mainBox.innerHTML = content;

        mainBox.addEventListener('click', () => {
            // If URL is set, open it? 
            // Admin doesn't seem to set 'url' field in form? 
            // Default form has 'url', let's check if it exists.
            if (project.url && project.url !== '#') window.open(project.url, '_blank');
        });

        // 2. Case Study Box (Button)
        const caseStudyBox = document.createElement('button');
        caseStudyBox.className = 'project-case-study';
        caseStudyBox.textContent = 'READ CASE STUDY';
        caseStudyBox.addEventListener('click', (e) => {
            e.stopPropagation();
            openCaseStudy(index);
        });

        card.appendChild(mainBox);
        card.appendChild(caseStudyBox);
        projectsContainer.appendChild(card);
    });
}


function openCaseStudy(index) {
    const project = projects[index];
    const cs = project.caseStudy;

    // Clear Content
    modalSteps.innerHTML = '';
    modalTitle.style.display = 'none';

    // Container
    const container = document.createElement('div');
    container.className = 'sleek-modal';

    // --- Header Section ---
    const header = document.createElement('div');
    header.className = 'sleek-header';
    header.innerHTML = `
        <h1 class="sleek-title">${cs.header.title}</h1>
    `;
    container.appendChild(header);

    // --- Sections Loop ---
    cs.sections.forEach(section => {
        const sectionEl = document.createElement('div');
        sectionEl.className = `sleek-section ${section.type}`; // 'text-image' or 'image-text'

        // Define content blocks
        const textBlock = `
            <div class="sleek-content-col">
                <h3 class="sleek-section-title">${section.title}</h3>
                <div class="sleek-text-wrapper">
                    <p class="sleek-text">${section.text}</p>
                </div>
            </div>
        `;

        const imageBlock = `
            <div class="sleek-image-col">
                <img src="${section.image}" alt="${section.title}">
            </div>
        `;

        // Render based on type
        if (section.type === 'text-image') {
            sectionEl.innerHTML = textBlock + imageBlock;
        } else {
            sectionEl.innerHTML = imageBlock + textBlock;
        }

        container.appendChild(sectionEl);
    });

    // --- Footer Removed as per request ---
    // const footer = document.createElement('div'); ... 

    modalSteps.appendChild(container); // Inject into modal body
    modal.classList.add('wide-modal'); // Enable wider layout
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Initial Render removed to allow loadContent to handle it safely
// renderProjects();

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



const privacyBtn = document.getElementById('privacy-link');
const termsBtn = document.getElementById('terms-link');

console.log('Legal Buttons:', { privacyBtn, termsBtn }); // Debug check

let legalContent = {};

async function fetchLegal(type) {
    if (legalContent[type]) return; // Already loaded

    if (!window.db) {
        console.warn("Firestore not available");
        return;
    }

    try {
        const docId = type === 'privacy' ? 'legal_privacy' : 'legal_terms';
        const doc = await db.collection('settings').doc(docId).get();
        if (doc.exists) {
            legalContent[type] = doc.data();
        } else {
            console.warn(`No legal document found for ${type}`);
            legalContent[type] = { title: "Not Found", text: "Content not available." };
        }
    } catch (e) {
        console.error("Error fetching legal:", e);
        legalContent[type] = { title: "Error", text: "Failed to load content." };
    }
}

async function openLegalModal(type) {
    await fetchLegal(type); // Ensure freshest content
    const data = legalContent[type];
    if (!data) return;

    modalTitle.textContent = data.title;

    // Clear existing steps/content
    modalSteps.innerHTML = '';

    // Inject HTML content directly
    modalSteps.innerHTML = `<div style="font-family: 'Segoe UI', sans-serif; color: #475569; line-height: 1.6;">${data.text}</div>`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

if (privacyBtn) {
    privacyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal('privacy');
    });
}

if (termsBtn) {
    termsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal('terms');
    });
}
