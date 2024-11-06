document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    const resumeForm = document.getElementById('resume-form') as HTMLDivElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
    const welcomeScreen = document.getElementById('welcome-screen') as HTMLDivElement;
    const form = document.getElementById('form') as HTMLFormElement;
    const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
    const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;
    const uploadInput = document.getElementById('upload') as HTMLInputElement;
    const profilePicture = document.getElementById('profile-picture') as HTMLImageElement;
    const generateLinkBtn = document.getElementById('generate-link-btn') as HTMLButtonElement;
    const shareableLinkInput = document.getElementById('shareable-link') as HTMLInputElement;

    let uploadedImageSrc: string | null = null;

    // Show the form when "Create Your Resume" button is clicked
    startBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        resumeForm.classList.remove('hidden');
    });

    // Handle file upload for profile picture
    uploadInput.addEventListener('change', function () {
        const file = uploadInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                uploadedImageSrc = e.target?.result as string;
                profilePicture.src = uploadedImageSrc;
                profilePicture.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission and generate resume content
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect user input
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const field = (document.getElementById('field') as HTMLInputElement).value;
        const institution = (document.getElementById('institution') as HTMLInputElement).value;
        const degree = (document.getElementById('degree') as HTMLInputElement).value;
        const gradYear = (document.getElementById('grad-year') as HTMLInputElement).value;
        const company = (document.getElementById('company') as HTMLInputElement).value;
        const role = (document.getElementById('role') as HTMLInputElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const contact_no = (document.getElementById('contact_no') as HTMLInputElement).value;
        const address = (document.getElementById('address') as HTMLInputElement).value;

        // Collect skills and proficiency
        const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;
        const skillsInputs = skillsContainer.querySelectorAll('.skill-input') as NodeListOf<HTMLInputElement>;
        const proficiencyInputs = skillsContainer.querySelectorAll('.proficiency-input') as NodeListOf<HTMLInputElement>;

        let skillsHTML = '';
        skillsInputs.forEach((input, index) => {
            const skill = input.value;
            const proficiency = proficiencyInputs[index].value;
            skillsHTML += `
                <div class="skill">
                    <span>${skill}</span>
                    <div class="bar">
                        <div class="fill" style="width: ${proficiency}%;"></div>
                    </div>
                    <span>${proficiency}%</span>
                </div>`;
        });

        // Generate professional resume content with skills bar
        resumeContent.innerHTML = `
            <img src="${uploadedImageSrc || ''}" alt="Profile Picture" />
            <h2>${name}</h2>
            <h4>${field}</h4>
            
            <div class="resume-section">
                <h3>Education</h3>
                <p><strong>Institution:</strong> ${institution}</p>
                <p><strong>Degree:</strong> ${degree}</p>
                <p><strong>Graduation Year:</strong> ${gradYear}</p>
            </div>
            
            <div class="resume-section">
                <h3>Work Experience</h3>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Description:</strong> ${experience}</p>
            </div>

            <div class="resume-section skills">
                <h3>Skills</h3>
                ${skillsHTML}
            </div>

            <div class="resume-section">
                <h3>Contact Info</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact No:</strong> ${contact_no}</p>
                <p><strong>Address:</strong> ${address}</p>
            </div>
        `;

        // Hide form and show the generated resume
        resumeForm.classList.add('hidden');
        resumeOutput.classList.remove('hidden');

        // Add Show/Hide Skills functionality
        addToggleSkillsButton();
    });

    // Edit resume
    editBtn.addEventListener('click', () => {
        resumeOutput.classList.add('hidden');
        resumeForm.classList.remove('hidden');
    });

    // Add new skill input fields
    const addSkillBtn = document.getElementById('add-skill-btn') as HTMLButtonElement;
    addSkillBtn.addEventListener('click', () => {
        const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;
        
        const newSkillGroup = document.createElement('div');
        newSkillGroup.classList.add('skill-group');
        newSkillGroup.innerHTML = `
            <label for="skill">Skill:</label>
            <input type="text" class="skill-input" required>

            <label for="proficiency">Proficiency (%):</label>
            <input type="number" class="proficiency-input" min="0" max="100" required>
        `;
        
        skillsContainer.appendChild(newSkillGroup);
    });

    // Function to add Show/Hide Skills button
    function addToggleSkillsButton() {
        const skillsSection = document.querySelector('.resume-section.skills') as HTMLDivElement;
        const toggleSkillsBtn = document.createElement('button');
        toggleSkillsBtn.textContent = 'Hide Skills';
        toggleSkillsBtn.id = 'toggle-skills-btn';

        let skillsVisible = true;

        toggleSkillsBtn.addEventListener('click', () => {
            if (skillsVisible) {
                skillsSection.style.display = 'none';
                toggleSkillsBtn.textContent = 'Show Skills';
            } else {
                skillsSection.style.display = 'block';
                toggleSkillsBtn.textContent = 'Hide Skills';
            }
            skillsVisible = !skillsVisible;
        });

        // Add button after the skills section
        resumeContent.appendChild(toggleSkillsBtn);
    }

    // Download Resume as PDF functionality
    document.getElementById('download-btn')?.addEventListener('click', () => {
        const resumeContent = document.getElementById('resume-content') as HTMLElement;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const opt = {
            margin: 1,
            filename: `${name}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        if (window['html2pdf']) {
            window['html2pdf']().from(resumeContent).set(opt).save();
        } else {
            console.error('html2pdf library not found.');
        }
    });

    // Generate shareable link and update URL
    function generateShareableLink() {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const name = nameInput?.value.trim();

        if (!name) {
            alert("Please enter a name to generate the URL.");
            return;
        }

        const nameSlug = name.replace(/\s+/g, '-').toLowerCase();
        window.history.pushState({}, '', `/${nameSlug}`);
        const shareableUrl = `${window.location.origin}/${nameSlug}`;
        alert(`Share your resume using this URL: ${shareableUrl}`);
    }

    document.getElementById('shareBtn')?.addEventListener('click', generateShareableLink);

    function loadResumeFromUrl() {
        const pathSegments = window.location.pathname.split('/');
        const username = pathSegments[1];

        if (username) {
            const readableName = username.replace('-', ' ');
            const nameInput = document.getElementById('name') as HTMLInputElement;
            nameInput.value = readableName;

            document.getElementById('resume-form')?.classList.add('hidden');
            document.getElementById('resume-output')?.classList.remove('hidden');
        }
    }

    document.addEventListener('DOMContentLoaded', loadResumeFromUrl);
});
