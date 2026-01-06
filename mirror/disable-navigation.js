// Default Legal Content
const defaultLegalContent = {
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

// Default Projects Data
const defaultProjects = [
    {
        title: "Fashion Photography: Capturing the Essence of Style",
        url: "#",
        thumbnail: "C:/Users/youss/.gemini/antigravity/brain/4e513b14-ab24-4920-af6c-75aab50f2f47/fashion_client_planning_1767713813202.png",
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
        thumbnail: "c:/Users/youss/OneDrive/Desktop/Mawj Project/uploaded_image_1767594234273.png",
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


document.addEventListener('click', function (e) {
    // 1. Social Icons Editing
    const socialIcon = e.target.closest('.social-icon');
    if (socialIcon) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const currentUrl = socialIcon.getAttribute('href').startsWith('http') ? socialIcon.getAttribute('href') : '';
        const platform = socialIcon.getAttribute('aria-label') || 'Social Media';
        openLinkEditor(platform, currentUrl, (newUrl) => {
            socialIcon.setAttribute('href', newUrl);
            saveToStorage(platform, newUrl);
            flashElement(socialIcon);
        }, 'url');
        return;
    }

    // 2. Email Editing
    const contactBtn = e.target.closest('.btn-contact');
    if (contactBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const currentHref = contactBtn.getAttribute('href');
        const currentEmail = currentHref.replace('mailto:', '');
        openLinkEditor('Email Address', currentEmail, (newEmail) => {
            contactBtn.setAttribute('href', `mailto:${newEmail}`);
            saveToStorage('contact_email', newEmail);
            flashElement(contactBtn);
        }, 'email');
        return;
    }

    // 3. Phone Number Editing
    const phoneBtn = e.target.closest('#phone-btn');
    if (phoneBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const phoneSpan = document.getElementById('phone-number');
        const currentPhone = phoneSpan ? phoneSpan.textContent.trim() : '';
        openLinkEditor('Phone Number', currentPhone, (newPhone) => {
            if (phoneSpan) {
                phoneSpan.textContent = newPhone;
            }
            saveToStorage('contact_phone', newPhone);
            flashElement(phoneBtn);
        }, 'phone');
        return;
    }

    // 4. Privacy and Terms Editing
    const privacyLink = e.target.closest('#privacy-link');
    const termsLink = e.target.closest('#terms-link');
    if (privacyLink) {
        e.preventDefault();
        e.stopImmediatePropagation();
        openLegalEditor('privacy');
        return;
    }
    if (termsLink) {
        e.preventDefault();
        e.stopImmediatePropagation();
        openLegalEditor('terms');
        return;
    }

    // 6. Add Project Button
    const addProjBtn = e.target.closest('#add-project-btn');
    if (addProjBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        openProjectEditor();
        return;
    }

    // 7. Edit/Delete Project Buttons (Delegated)
    const editBtn = e.target.closest('.edit-project-btn');
    if (editBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const index = editBtn.dataset.index;
        console.log("Edit button clicked. Index:", index);
        try {
            openProjectEditor(index);
        } catch (err) {
            console.error("Error opening project editor:", err);
            alert("Failed to open editor. See console.");
        }
        return;
    }

    const deleteBtn = e.target.closest('.delete-project-btn');
    if (deleteBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const index = deleteBtn.dataset.index;
        if (confirm('Are you sure you want to delete this project?')) {
            const projects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');
            projects.splice(index, 1);
            localStorage.setItem('mawj_mirror_projects', JSON.stringify(projects));
            renderEnhancedProjects();
        }
        return;
    }

    // 5. Disable other navigation
    const anchor = e.target.closest('a');
    const projectMain = e.target.closest('.project-main');

    if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }
    }
}, true);

// --- Inline Editing Logic ---
function setupInlineEditing() {
    const editableElements = [
        { selector: '.contact-title', key: 'contact_title_text' },
        { selector: '.mission-title', key: 'section_mission_title' },
        { selector: '.mission-text', key: 'section_mission_text' },
        { selector: '.services-section .services-title', key: 'section_services_title' },
        { selector: '.featured-projects .services-title', key: 'section_projects_title' }
    ];

    editableElements.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.setAttribute('contenteditable', 'true');
            el.style.cursor = 'text';
            el.style.outline = 'none';
            el.title = "Click to edit text";

            el.addEventListener('blur', () => {
                const newText = el.innerText;
                saveToStorage(item.key, newText);
                flashElement(el);
            });

            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    el.blur();
                }
            });
        }
    });
}

// --- Firebase / Storage Logic ---
let localDataCache = {};

// Migrate/Load Data
async function initFirestoreData() {
    if (!window.db) return;
    try {
        const doc = await db.collection('settings').doc('general').get();
        if (doc.exists) {
            localDataCache = doc.data();
            console.log("Firestore Data Loaded:", localDataCache);
        } else {
            // First run? Seed from localStorage or defaults?
            // For now, let's just use what's in localStorage as a partial seed if DB is empty
            const lsData = JSON.parse(localStorage.getItem('mawj_mirror_data') || '{}');
            if (Object.keys(lsData).length > 0) {
                await db.collection('settings').doc('general').set(lsData);
                localDataCache = lsData;
            }
        }
        // Refresh UI with loaded data
        applySavedData();
    } catch (e) {
        console.error("Error loading Firestore data:", e);
    }
}

function saveToStorage(key, value) {
    // 1. Update cache
    localDataCache[key] = value;
    // 2. Update LocalStorage (Backup/Offline)
    localStorage.setItem('mawj_mirror_data', JSON.stringify(localDataCache));

    // 3. Update Firestore
    if (window.db) {
        db.collection('settings').doc('general').set({ [key]: value }, { merge: true })
            .catch(e => console.error("Firestore save error:", e));
    }
}

function getFromStorage(key) {
    // Prefer cache, fallback to LS
    if (localDataCache[key] !== undefined) return localDataCache[key];
    const savedData = JSON.parse(localStorage.getItem('mawj_mirror_data') || '{}');
    return savedData[key];
}

function flashElement(el) {
    el.style.transition = 'all 0.3s';
    if (el.style.textShadow) el.style.textShadow = '0 0 10px #4ade80';
    else el.style.filter = 'brightness(1.5) sepia(1) hue-rotate(90deg) saturate(5)';
    setTimeout(() => { el.style.textShadow = ''; el.style.filter = ''; }, 500);
}

function applySavedData() {
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach(icon => {
        const platform = icon.getAttribute('aria-label');
        if (localDataCache[platform]) icon.setAttribute('href', localDataCache[platform]);
    });
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn && localDataCache['contact_email']) contactBtn.setAttribute('href', `mailto:${localDataCache['contact_email']}`);
    const phoneSpan = document.getElementById('phone-number');
    if (phoneSpan && localDataCache['contact_phone']) phoneSpan.textContent = localDataCache['contact_phone'];

    // Text Map
    const textMap = [
        { selector: '.contact-title', key: 'contact_title_text' },
        { selector: '.mission-title', key: 'section_mission_title' },
        { selector: '.mission-text', key: 'section_mission_text' },
        { selector: '.services-section .services-title', key: 'section_services_title' },
        { selector: '.featured-projects .services-title', key: 'section_projects_title' }
    ];
    textMap.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el && localDataCache[item.key]) el.innerText = localDataCache[item.key];
    });
}

// --- NEW Dedicated Legal Editor Logic ---
const legalModal = document.getElementById('legal-editor-modal');
const legalTitleFn = document.getElementById('legal-doc-title');
const legalContentInput = document.getElementById('legal-content-input');
const legalForm = document.getElementById('legal-editor-form');
const legalCancelBtn = document.getElementById('legal-cancel-btn');
let currentLegalCallback = null;

function openLegalEditor(type) {
    const defaults = defaultLegalContent[type];
    const savedKey = `legal_${type}_content`;

    const currentContent = getFromStorage(savedKey) || defaults.text;

    legalTitleFn.textContent = defaults.title;
    legalContentInput.innerHTML = currentContent;
    currentLegalCallback = (newContent) => {
        saveToStorage(savedKey, newContent);
        alert(`${defaults.title} saved successfully!`);
    };

    legalModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    legalContentInput.focus();
}

function closeLegalEditor() {
    legalModal.classList.add('hidden');
    document.body.style.overflow = '';
    currentLegalCallback = null;
}

if (legalForm) {
    legalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentLegalCallback) {
            currentLegalCallback(legalContentInput.innerHTML);
        }
        closeLegalEditor();
    });
}

if (legalCancelBtn) legalCancelBtn.addEventListener('click', closeLegalEditor);
if (legalModal) legalModal.querySelector('.modal-overlay').addEventListener('click', closeLegalEditor);

// --- Project Editor Logic (Updated for Edit + Files) ---
// const projModal = document.getElementById('project-editor-modal'); // Moved inside function
// const projForm = document.getElementById('project-editor-form'); // Moved inside function
// const projCancel = document.getElementById('proj-cancel-btn'); // Moved inside function
let editingProjectIndex = -1;

function openProjectEditor(index = -1) {
    const projModal = document.getElementById('project-editor-modal');
    const projForm = document.getElementById('project-editor-form');

    if (!projModal || !projForm) {
        console.error("Project Editor Modal or Form not found!");
        return;
    }

    editingProjectIndex = parseInt(index);
    const modalTitle = projModal.querySelector('h1');
    const submitBtn = projModal.querySelector('button[type="submit"]');

    console.log("Opening Project Editor, Index:", index);

    if (editingProjectIndex >= 0) {
        modalTitle.textContent = 'Edit Project';
        submitBtn.textContent = 'Save Changes';

        const projects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');
        const project = projects[editingProjectIndex];

        if (project) {
            console.log("Populating project data:", project);
            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val;
                else console.warn(`Element not found: ${id}`);
            };

            setVal('proj-title', project.title || '');
            setVal('proj-url', project.url || '');
            setVal('proj-thumb-url', project.thumbnail || '');
            setVal('proj-thumb-file', '');

            // Metadata
            const header = project.caseStudy?.header || {};
            setVal('proj-category', header.category || '');
            setVal('proj-date', header.date || '');

            // Sections
            const sections = project.caseStudy?.sections || [];

            // 1. Client
            const clientSec = sections.find(s => s.title === 'About The Client') || {};
            setVal('proj-client-text', clientSec.text || '');
            setVal('proj-client-url', clientSec.image || '');
            setVal('proj-client-file', '');

            // 2. Challenges
            const chalSec = sections.find(s => s.title === 'The Challenges') || {};
            setVal('proj-chal-text', chalSec.text || '');
            setVal('proj-chal-url', chalSec.image || '');
            setVal('proj-chal-file', '');

            // 3. Results
            const resSec = sections.find(s => s.title === 'The Results') || {};
            setVal('proj-res-text', resSec.text || '');
            setVal('proj-res-url', resSec.image || '');
            setVal('proj-res-file', '');
        }

    } else {
        console.log("Add Project Mode");
        modalTitle.textContent = 'Add New Project';
        submitBtn.textContent = 'Add Project';
        projForm.reset();
    }

    console.log("Showing Modal");
    projModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectEditor() {
    const projModal = document.getElementById('project-editor-modal');
    const projForm = document.getElementById('project-editor-form');
    if (projModal) projModal.classList.add('hidden');
    document.body.style.overflow = '';
    if (projForm) projForm.reset();
    editingProjectIndex = -1;
}

// Helper to resize and compress image
async function optimizeImage(file, maxWidth = 800, quality = 0.7) {
    if (!file) return null;
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

async function readFile(input) {
    if (input && input.files && input.files[0]) {
        return await optimizeImage(input.files[0]);
    }
    return null;
}

// Setup Project Editor Listeners
document.addEventListener('DOMContentLoaded', () => {
    const projForm = document.getElementById('project-editor-form');
    const projCancel = document.getElementById('proj-cancel-btn');
    const projModal = document.getElementById('project-editor-modal');

    console.log("DOM Loaded. projForm:", projForm, "projModal:", projModal);

    // Cancel Button
    if (projCancel) projCancel.addEventListener('click', closeProjectEditor);

    // Click Overlay to Close
    if (projModal) {
        const overlay = projModal.querySelector('.modal-overlay');
        if (overlay) overlay.addEventListener('click', closeProjectEditor);
    }

    if (projForm) {
        projForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Form submitted. Processing...");

            try {
                // Read Images (File preferred, fallback to URL input, fallback to empty)
                const thumbInput = document.getElementById('proj-thumb-file');
                const thumbFile = await readFile(thumbInput);
                const thumbUrl = document.getElementById('proj-thumb-url')?.value || '';
                const finalThumb = thumbFile || thumbUrl || "https://via.placeholder.com/600x400";

                const clientInput = document.getElementById('proj-client-file');
                const clientFile = await readFile(clientInput);
                const clientUrl = document.getElementById('proj-client-url')?.value || '';
                const finalClientImg = clientFile || clientUrl || "https://via.placeholder.com/600x400";

                const chalInput = document.getElementById('proj-chal-file');
                const chalFile = await readFile(chalInput);
                const chalUrl = document.getElementById('proj-chal-url')?.value || '';
                const finalChalImg = chalFile || chalUrl || "https://via.placeholder.com/600x400";

                const resInput = document.getElementById('proj-res-file');
                const resFile = await readFile(resInput);
                const resUrl = document.getElementById('proj-res-url')?.value || '';
                const finalResImg = resFile || resUrl || "https://via.placeholder.com/600x400";

                // Safe Value Helper
                const getVal = (id) => {
                    const el = document.getElementById(id);
                    if (!el) {
                        console.error(`Missing input element: ${id}`);
                        return '';
                    }
                    return el.value;
                };

                const newProject = {
                    title: getVal('proj-title'),
                    url: getVal('proj-url'),
                    thumbnail: finalThumb,
                    caseStudy: {
                        header: {
                            category: getVal('proj-category'),
                            date: getVal('proj-date'),
                            title: getVal('proj-title'),
                        },
                        sections: [
                            {
                                type: "text-image", // Default pattern
                                title: "About The Client",
                                text: getVal('proj-client-text'),
                                image: finalClientImg
                            },
                            {
                                type: "image-text",
                                title: "The Challenges",
                                text: getVal('proj-chal-text'),
                                image: finalChalImg
                            },
                            {
                                type: "text-image",
                            }
                        ]
                    }
                };

                // const existingProjects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');

                if (editingProjectIndex >= 0) {
                    const original = allProjects[editingProjectIndex];
                    if (!original || !original.id) {
                        throw new Error("Invalid project reference for editing");
                    }

                    // Update Firestore
                    await db.collection('projects').doc(original.id).set(newProject, { merge: true });

                    // Update local cache manually or refetch?
                    // Let's refetch to be safe/simple or update invalid
                    allProjects[editingProjectIndex] = { id: original.id, ...newProject };
                } else {
                    // Create New in Firestore
                    const docRef = await db.collection('projects').add(newProject);

                    // Add to local cache
                    allProjects.push({ id: docRef.id, ...newProject });
                }

                // Render Changes
                renderEnhancedProjects();

                // Also cache to LS for backup
                localStorage.setItem('mawj_mirror_projects', JSON.stringify(allProjects));

                closeProjectEditor();

            } catch (err) {
                console.error("Error submitting project:", err);
                alert("Failed to save project. See console for details.");
            }
        });
    }
});


// --- Main Init ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. Load Data (Async from Firestore)
    initFirestoreData(); // Loads settings
    initProjectsData();  // Loads projects

    // 2. Setup Editing (Already called, but listeners attached)
    setupInlineEditing();

    // 3. Init Admin Login
    initAdminLogin();
});


// --- Original Link Editor Logic ---
const editorModal = document.getElementById('link-editor-modal');
const platformNameSpan = document.getElementById('editor-platform-name');
const urlInput = document.getElementById('editor-url-input');
const editorForm = document.getElementById('link-editor-form');
const cancelBtn = document.getElementById('editor-cancel-btn');
let currentCallback = null;

function openLinkEditor(title, currentValue, onSave, mode = 'text') {
    if (!editorModal) return;
    platformNameSpan.textContent = title;
    currentCallback = onSave;
    urlInput.value = currentValue;
    urlInput.type = mode === 'email' ? 'email' : 'text';
    urlInput.required = true;
    editorModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    urlInput.focus();
}

function closeLinkEditor() {
    editorModal.classList.add('hidden');
    document.body.style.overflow = '';
    currentCallback = null;
}

if (editorForm) {
    editorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentCallback) currentCallback(urlInput.value);
        closeLinkEditor();
    });
}

if (cancelBtn) cancelBtn.addEventListener('click', closeLinkEditor);
if (editorModal) editorModal.querySelector('.modal-overlay').addEventListener('click', closeLinkEditor);


// --- Render Logic (Full Override) ---
function renderEnhancedProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // Always fetch from localStorage, which we ensure is seeded
    // Use cached allProjects instead of LS
    // const projects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');
    const projects = allProjects;

    container.innerHTML = '';

    // Add "Add Project" Button Card
    const addCard = document.createElement('div');
    addCard.className = 'project-card add-project-card';
    addCard.id = 'add-project-btn';
    addCard.innerHTML = `
        <div class="add-icon-circle">+</div>
        <p>Add New Project</p>
    `;
    addCard.addEventListener('click', () => {
        openProjectEditor();
    });
    container.appendChild(addCard);

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // Add fade in only if new? Let's just keep it simple.
        card.style.animation = 'fadeIn 0.5s ease-out forwards';

        // ... Rendering Logic ...
        // Need to update edit/delete buttons to pass index OR ID
        // Passing index is fine since we rebuild from array

        // 1. Main Box
        const mainBox = document.createElement('div');
        mainBox.className = 'project-main';

        // Thumbnail Logic: Prefer explicit thumbnail, then fallback to first section image
        let thumbUrl = project.thumbnail;
        if (!thumbUrl && project.caseStudy?.sections?.[0]?.image) {
            thumbUrl = project.caseStudy.sections[0].image;
        }

        // Title Header with blue background
        const titleHeader = `
            <div style="
                width: 100%;
                background-color: #0177BF;
                padding: 20px 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 80px;
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
            content = `<div style="position:absolute; inset:0; background:rgba(0,0,0,0.5); z-index:1; border-radius:inherit;"></div>` + content;
            mainBox.style.color = 'white';
        }

        mainBox.innerHTML = content;
        mainBox.style.display = 'flex';
        mainBox.style.flexDirection = 'column';
        mainBox.style.alignItems = 'stretch';
        mainBox.style.justifyContent = 'flex-start';
        mainBox.style.paddingTop = '0';
        mainBox.style.textAlign = 'center';

        mainBox.addEventListener('click', () => window.open(project.url, '_blank'));

        const caseStudyBox = document.createElement('button');
        caseStudyBox.className = 'project-case-study';
        caseStudyBox.textContent = 'READ CASE STUDY';
        caseStudyBox.addEventListener('click', (e) => {
            e.stopPropagation();
            openLocalCaseStudy(project);
        });

        // ACTIONS ROW
        const actionsRow = document.createElement('div');
        actionsRow.style.display = 'flex';
        actionsRow.style.gap = '8px';
        actionsRow.style.marginTop = '8px';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-project-btn';
        editBtn.textContent = 'Edit';
        editBtn.dataset.index = index;
        editBtn.style.flex = '1';
        editBtn.style.padding = '8px';
        editBtn.style.border = '1px solid #cbd5e1';
        editBtn.style.borderRadius = '8px';
        editBtn.style.background = 'white';
        editBtn.style.color = '#475569';
        editBtn.style.cursor = 'pointer';

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-project-btn';
        delBtn.textContent = 'Delete';
        delBtn.dataset.index = index;
        delBtn.style.flex = '1';
        delBtn.style.padding = '8px';
        delBtn.style.border = '1px solid #ef4444';
        delBtn.style.borderRadius = '8px';
        delBtn.style.background = '#fef2f2';
        delBtn.style.color = '#ef4444';
        delBtn.style.cursor = 'pointer';

        actionsRow.appendChild(editBtn);
        actionsRow.appendChild(delBtn);

        card.appendChild(mainBox);
        card.appendChild(caseStudyBox);
        card.appendChild(actionsRow); // Append actions
        container.appendChild(card);
    });
}

function openLocalCaseStudy(project) {
    const cs = project.caseStudy;
    const modal = document.getElementById('service-modal');
    const modalSteps = document.getElementById('modal-steps');
    const modalTitle = document.getElementById('modal-title');

    modalSteps.innerHTML = '';
    modalTitle.style.display = 'none';

    const container = document.createElement('div');
    container.className = 'sleek-modal';

    const header = document.createElement('div');
    header.className = 'sleek-header';
    header.innerHTML = `<h1 class="sleek-title">${cs.header.title || project.title}</h1>`;
    container.appendChild(header);

    if (cs.sections) {
        cs.sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = `sleek-section ${section.type}`;
            const imgSrc = section.image || "https://via.placeholder.com/600x400";

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
                    <img src="${imgSrc}" alt="${section.title}">
                </div>
            `;

            if (section.type === 'text-image') {
                sectionEl.innerHTML = textBlock + imageBlock;
            } else {
                sectionEl.innerHTML = imageBlock + textBlock;
            }
            container.appendChild(sectionEl);
        });
    }

    modalSteps.appendChild(container); // Fix: Append container
    modal.classList.add('wide-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function initAdminLogin() {
    const overlay = document.getElementById('login-overlay');
    const form = document.getElementById('overlay-login-form');
    const errorMsg = document.getElementById('overlay-error');

    console.log('Admin Login Init');
    if (!overlay || !form) {
        console.error('Login elements not found');
        return;
    }

    // Always require login on refresh
    console.log('Locking scroll for login');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    sessionStorage.removeItem('mirrorAuth');
    overlay.style.display = 'flex'; // Enforce flex to center
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    overlay.classList.remove('hidden');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Login Submit');
        const email = document.getElementById('admin-email').value.trim();
        const pass = document.getElementById('admin-password').value;

        if (email.toLowerCase() === 'mawj.eg@outlook.com' && pass === 'M123456') { /* Verified Creds */
            console.log('Login Success');
            sessionStorage.setItem('mirrorAuth', 'true');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            setTimeout(() => { overlay.style.display = 'none'; }, 600);
        } else {
            console.log('Login Failed');
            errorMsg.style.display = 'block';
            errorMsg.style.animation = 'none';
            void errorMsg.offsetHeight;
            errorMsg.style.animation = 'shake 0.4s ease-in-out';
        }
    });
}

// --- Main Init ---
window.addEventListener('DOMContentLoaded', () => {
    // 0. Seed Defaults if empty
    const savedProjects = localStorage.getItem('mawj_mirror_projects');
    if (!savedProjects) {
        localStorage.setItem('mawj_mirror_projects', JSON.stringify(defaultProjects));
    }

    // 1. Load Data
    const savedData = JSON.parse(localStorage.getItem('mawj_mirror_data') || '{}');
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach(icon => {
        const platform = icon.getAttribute('aria-label');
        if (savedData[platform]) icon.setAttribute('href', savedData[platform]);
    });
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn && savedData['contact_email']) contactBtn.setAttribute('href', `mailto:${savedData['contact_email']}`);
    const phoneSpan = document.getElementById('phone-number');
    if (phoneSpan && savedData['contact_phone']) phoneSpan.textContent = savedData['contact_phone'];
    const textMap = [
        { selector: '.contact-title', key: 'contact_title_text' },
        { selector: '.mission-title', key: 'section_mission_title' },
        { selector: '.mission-text', key: 'section_mission_text' },
        { selector: '.services-section .services-title', key: 'section_services_title' },
        { selector: '.featured-projects .services-title', key: 'section_projects_title' }
    ];
    textMap.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el && savedData[item.key]) el.innerText = savedData[item.key];
    });

    // 2. Setup Editing
    setupInlineEditing();

    // 3. Render Projects (With Delay to ensure script.js doesn't overwrite us, 
    // although we are appending, script.js might wipe if it runs late. 
    // Ideally we run AFTER script.js. script.js is at end of body. 
    // DOMContentLoaded should fire after synchronous scripts.
    setTimeout(renderEnhancedProjects, 100);

    // 4. Init Admin Login
    initAdminLogin();
});
