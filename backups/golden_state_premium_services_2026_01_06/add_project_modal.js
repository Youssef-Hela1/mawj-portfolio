
// --- Add Project Modal Logic (Admin Only) ---
function openAddProjectModal() {
    // Create Modal Dom
    const overlay = document.createElement('div');
    overlay.className = 'cms-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'cms-modal';
    modal.style.maxWidth = '800px'; // Wider for form
    modal.style.maxHeight = '90vh';
    modal.style.overflowY = 'auto'; // Scrollable form

    const title = document.createElement('h3');
    title.innerText = 'Add New Project';

    // Form Container
    const form = document.createElement('div');
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '15px';

    // Helper for Inputs
    const createInput = (label, type = 'text', placeholder = '') => {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '5px';

        const lbl = document.createElement('label');
        lbl.innerText = label;
        lbl.style.fontWeight = 'bold';
        lbl.style.fontSize = '0.9rem';

        const inp = type === 'textarea' ? document.createElement('textarea') : document.createElement('input');
        if (type !== 'textarea') inp.type = type;
        inp.placeholder = placeholder;
        inp.style.padding = '8px';
        inp.style.border = '1px solid #ccc';
        inp.style.borderRadius = '4px';

        wrapper.appendChild(lbl);
        wrapper.appendChild(inp);
        return { wrapper, input: inp };
    };

    // 1. Basic Info
    const titleField = createInput('Project Title', 'text', 'My Awesome Project');
    const urlField = createInput('Project URL', 'text', 'https://example.com');

    // 2. Case Study Sections (Client, Challenge, Results)
    const sectionsData = [
        { name: 'The Client', defaultHead: 'The Client' },
        { name: 'The Challenge', defaultHead: 'The Challenge' },
        { name: 'The Results', defaultHead: 'The Results' }
    ];

    const sectionsInputs = [];

    sectionsData.forEach((sec, idx) => {
        const secDiv = document.createElement('div');
        secDiv.style.border = '1px dashed #ccc';
        secDiv.style.padding = '10px';
        secDiv.style.background = '#f9f9f9';
        secDiv.style.borderRadius = '6px';

        const header = document.createElement('h4');
        header.innerText = `Section ${idx + 1}: ${sec.name}`;
        header.style.margin = '0 0 10px 0';

        const textArea = createInput('Description', 'textarea');
        textArea.input.rows = 3;

        const fileInput = createInput('Image (from device)', 'file');
        const filePreview = document.createElement('img');
        filePreview.style.maxWidth = '100px';
        filePreview.style.marginTop = '5px';
        filePreview.style.display = 'none';

        // Base64 Handler
        let base64Image = "";
        fileInput.input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 1024 * 1024) alert("Warning: Image is larger than 1MB. This may slow down the site.");

                const reader = new FileReader();
                reader.onload = (evt) => {
                    base64Image = evt.target.result;
                    filePreview.src = base64Image;
                    filePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        secDiv.appendChild(header);
        secDiv.appendChild(textArea.wrapper);
        secDiv.appendChild(fileInput.wrapper);
        secDiv.appendChild(filePreview);

        form.appendChild(secDiv);

        sectionsInputs.push({
            heading: sec.defaultHead,
            getInput: () => textArea.input.value,
            getImage: () => base64Image
        });
    });

    // Assemble Form
    form.appendChild(titleField.wrapper);
    form.appendChild(urlField.wrapper);


    // Buttons
    const actionRow = document.createElement('div');
    actionRow.className = 'cms-modal-actions';
    actionRow.style.marginTop = '20px';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cms-btn cms-btn-cancel';
    cancelBtn.innerText = 'Cancel';
    cancelBtn.onclick = () => overlay.remove();

    const saveBtn = document.createElement('button');
    saveBtn.className = 'cms-btn cms-btn-save';
    saveBtn.innerText = 'Create Project';
    saveBtn.onclick = async () => {
        saveBtn.innerText = 'Creating...';

        // Construct Project Object
        const newProject = {
            title: titleField.input.value,
            url: urlField.input.value,
            caseStudy: {
                title: "Case Study",
                sections: sectionsInputs.map((s, i) => ({
                    heading: s.heading,
                    text: s.getInput(),
                    image: s.getImage() || "https://placehold.co/600x400/png?text=No+Image",
                    layout: i % 2 === 0 ? "text-left" : "image-left"
                }))
            }
        };

        // Add to State
        projects.push(newProject);
        renderProjects();

        // Save to CMS
        await saveContent('projects', JSON.stringify(projects));

        overlay.remove();
    };

    actionRow.appendChild(cancelBtn);
    actionRow.appendChild(saveBtn);

    modal.appendChild(title);
    modal.appendChild(form);
    modal.appendChild(actionRow);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
