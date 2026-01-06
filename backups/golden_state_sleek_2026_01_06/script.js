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

const projects = [
    {
        title: "Fashion Photography: Capturing the Essence of Style",
        url: "#",
        caseStudy: {
            header: {
                category: "Fashion News",
                date: "January 2026",
                title: "Fashion Photography: Capturing the Essence of Style",
            },
            sections: [
                {
                    type: "text-image",
                    title: "About The Client",
                    text: "The client, a renowned luxury fashion house established in 1950, was looking to revitalize their brand image for the digital age while maintaining their heritage of elegance. They required a comprehensive visual strategy that would not only showcase their latest collection but also tell a compelling story about sustainability and modern craftsmanship. The goal was to create a series of editorial-style images that could be used across multiple platforms, including high-gloss magazines, social media campaigns, and their flagship website. This required meticulous planning, from scouting unique architectural locations that mirrored the collection's geometric lines to selecting a diverse cast of models that represented the brand's new inclusive direction.",
                    image: "C:/Users/youss/.gemini/antigravity/brain/4e513b14-ab24-4920-af6c-75aab50f2f47/fashion_client_planning_1767713813202.png"
                },
                {
                    type: "image-text",
                    title: "The Challenges",
                    text: "Fashion photography can be categorized into editorial and commercial. The main challenge was to balance the artistic expression required for editorial spreads with the commercial viability needed for the client's campaign.",
                    image: "C:/Users/youss/.gemini/antigravity/brain/4e513b14-ab24-4920-af6c-75aab50f2f47/fashion_photo_shoot_challenges_1767713829811.png"
                },
                {
                    type: "text-image",
                    title: "The Results",
                    text: "The campaign resulted in a 40% increase in brand engagement. The images were featured in major fashion publications, establishing a new visual standard for the brand.",
                    image: "C:/Users/youss/.gemini/antigravity/brain/4e513b14-ab24-4920-af6c-75aab50f2f47/fashion_campaign_results_1767713851747.png"
                }
            ]
        }
    },
    {
        title: "Project Beta: Digital Art Gallery",
        url: "#",
        caseStudy: {
            header: {
                category: "Art Review",
                date: "February 2026",
                title: "Digital Art Gallery",
                subtitle: "Where Technology Meets Creativity"
            },
            sections: [
                {
                    type: "text-image",
                    title: "About The Client",
                    text: "A visionary artist seeking a digital gallery that reflects their unique style without overshadowing the artwork itself.",
                    image: "c:/Users/youss/OneDrive/Desktop/Mawj Project/uploaded_image_1767594234273.png"
                },
                {
                    type: "image-text",
                    title: "The Challenges",
                    text: "Balancing high-resolution imagery with performance on mobile devices was critical.",
                    image: "c:/Users/youss/OneDrive/Desktop/Mawj Project/uploaded_image_1767593598873.png"
                },
                {
                    type: "text-image",
                    title: "The Results",
                    text: "The new platform won three design awards and saw a 200% increase in inquiry forms.",
                    image: "c:/Users/youss/OneDrive/Desktop/Mawj Project/uploaded_image_1767592175326.png"
                }
            ]
        }
    }
];

const projectsContainer = document.getElementById('projects-container');

function renderProjects() {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // 1. Main Project Box (Link)
        const mainBox = document.createElement('div');
        mainBox.className = 'project-main';
        mainBox.innerHTML = `<h3 class="project-title">${project.title}</h3>`;
        mainBox.addEventListener('click', () => {
            window.open(project.url, '_blank');
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
        projectsContainer.appendChild(card); // Correctly append to container
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

renderProjects();

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

/* Legal Modals Logic */
const legalContent = {
    privacy: {
        title: "Privacy Policy",
        text: `
            <p style="margin-bottom: 1rem;"><strong>Last Updated: January 2026</strong></p>
            <p style="margin-bottom: 1rem;">At MAWJ, we value your privacy. This policy outlines how we collect, use, and protect your information when you use our website and services.</p>
            <p style="margin-bottom: 1rem;"><strong>1. Information Collection</strong><br>We collect information you provide directly to us, such as when you contact us via email or sign up for our newsletter.</p>
            <p style="margin-bottom: 1rem;"><strong>2. Use of Information</strong><br>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
            <p style="margin-bottom: 1rem;"><strong>3. Data Protection</strong><br>We implement security measures designed to protect your information from unauthorized access.</p>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
        `
    },
    terms: {
        title: "Terms of Service",
        text: `
            <p style="margin-bottom: 1rem;"><strong>Effective Date: January 2026</strong></p>
            <p style="margin-bottom: 1rem;">Welcome to MAWJ. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
            <p style="margin-bottom: 1rem;"><strong>1. Acceptance of Terms</strong><br>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            
            <p style="margin-bottom: 1rem;"><strong>2. Use License</strong><br>Permission is granted to temporarily download one copy of the materials (information or software) on MAWJ's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul style="margin-bottom: 1rem; padding-left: 20px; list-style-type: disc;">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on MAWJ's website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <p style="margin-bottom: 1rem;"><strong>3. Disclaimer</strong><br>The materials on MAWJ's website are provided "as is". MAWJ makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <p style="margin-bottom: 1rem;"><strong>4. Limitations</strong><br>In no event shall MAWJ or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MAWJ's website.</p>

            <p style="margin-bottom: 1rem;"><strong>5. Revisions and Errata</strong><br>The materials appearing on MAWJ's website could include technical, typographical, or photographic errors. MAWJ does not warrant that any of the materials on its website are accurate, complete, or current.</p>

            <p style="margin-bottom: 1rem;"><strong>6. Site Terms of Use Modifications</strong><br>MAWJ may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>

            <p style="margin-bottom: 1rem;"><strong>7. Governing Law</strong><br>Any claim relating to MAWJ's website shall be governed by the laws of the State of without regard to its conflict of law provisions.</p>
            
            <p style="margin-bottom: 1rem;"><strong>SCROLL TEST SECTION</strong><br>To demonstrate the scrolling functionality requested, we are including additional filler text below.</p>
            ${Array(10).fill('<p style="margin-bottom: 1rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>').join('')}
        `
    }
};

const privacyBtn = document.getElementById('privacy-link');
const termsBtn = document.getElementById('terms-link');

console.log('Legal Buttons:', { privacyBtn, termsBtn }); // Debug check

function openLegalModal(type) {
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
