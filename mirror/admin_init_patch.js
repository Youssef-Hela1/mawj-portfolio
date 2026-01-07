
// --- Global Projects Cache ---
let allProjects = [];

async function initProjectsData() {
    if (!window.db) {
        console.warn("Firestore not available! Using local backup.");
        allProjects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');
        renderEnhancedProjects();
        return;
    }

    try {
        const snapshot = await db.collection('projects').get();
        if (!snapshot.empty) {
            allProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Projects loaded from Firestore:", allProjects.length);
        } else {
            console.log("No projects in Firestore. Checking LocalStorage backup...");
            allProjects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');

            // Optional: Seed Firestore if empty?
            if (allProjects.length > 0) {
                // seed logic could go here, but let's keep it simple
            }
        }

        // Update Local Backup
        localStorage.setItem('mawj_mirror_projects', JSON.stringify(allProjects));

        renderEnhancedProjects();
    } catch (e) {
        console.error("Error loading projects:", e);
        allProjects = JSON.parse(localStorage.getItem('mawj_mirror_projects') || '[]');
        renderEnhancedProjects();
    }
}
