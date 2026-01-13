
async function deleteProject(index) {
    if (!allProjects[index]) return;
    const project = allProjects[index];

    // Optimistic Update
    allProjects.splice(index, 1);
    renderEnhancedProjects();

    try {
        if (project.id) {
            await db.collection('projects').doc(project.id).delete();
            console.log("Deleted project from Firestore:", project.id);
            window.location.reload(); // Force sync
        } else {
            console.warn("Project had no ID, only removed from local cache");
            window.location.reload(); // Force sync
        }

        // Update LocalStorage Backup
        try {
            localStorage.setItem('mawj_mirror_projects', JSON.stringify(allProjects));
        } catch (e) { }

    } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project from server. It might reappear on refresh.");
        window.location.reload();
    }
}
