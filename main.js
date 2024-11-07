document.addEventListener('DOMContentLoaded', function () {
    var _a, _b;
    var startBtn = document.getElementById('start-btn');
    var resumeForm = document.getElementById('resume-form');
    var resumeOutput = document.getElementById('resume-output');
    var welcomeScreen = document.getElementById('welcome-screen');
    var form = document.getElementById('form');
    var resumeContent = document.getElementById('resume-content');
    var editBtn = document.getElementById('edit-btn');
    var uploadInput = document.getElementById('upload');
    var profilePicture = document.getElementById('profile-picture');
    var generateLinkBtn = document.getElementById('generate-link-btn');
    var shareableLinkInput = document.getElementById('shareable-link');
    var uploadedImageSrc = null;
    // Show the form when "Create Your Resume" button is clicked
    startBtn.addEventListener('click', function () {
        welcomeScreen.classList.add('hidden');
        resumeForm.classList.remove('hidden');
    });
    // Handle file upload for profile picture
    uploadInput.addEventListener('change', function () {
        var _a;
        var file = (_a = uploadInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                uploadedImageSrc = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                profilePicture.src = uploadedImageSrc;
                profilePicture.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    // Handle form submission and generate resume content
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Collect user input
        var name = document.getElementById('name').value;
        var field = document.getElementById('field').value;
        var institution = document.getElementById('institution').value;
        var degree = document.getElementById('degree').value;
        var gradYear = document.getElementById('grad-year').value;
        var company = document.getElementById('company').value;
        var role = document.getElementById('role').value;
        var experience = document.getElementById('experience').value;
        var email = document.getElementById('email').value;
        var contact_no = document.getElementById('contact_no').value;
        var address = document.getElementById('address').value;
        // Collect skills and proficiency
        var skillsContainer = document.getElementById('skills-container');
        var skillsInputs = skillsContainer.querySelectorAll('.skill-input');
        var proficiencyInputs = skillsContainer.querySelectorAll('.proficiency-input');
        var skillsHTML = '';
        skillsInputs.forEach(function (input, index) {
            var skill = input.value;
            var proficiency = proficiencyInputs[index].value;
            skillsHTML += "\n                <div class=\"skill\">\n                    <span>".concat(skill, "</span>\n                    <div class=\"bar\">\n                        <div class=\"fill\" style=\"width: ").concat(proficiency, "%;\"></div>\n                    </div>\n                    <span>").concat(proficiency, "%</span>\n                </div>");
        });
        // Generate professional resume content with skills bar
        resumeContent.innerHTML = "\n            <img src=\"".concat(uploadedImageSrc || '', "\" alt=\"Profile Picture\" />\n            <h2>").concat(name, "</h2>\n            <h4>").concat(field, "</h4>\n            \n            <div class=\"resume-section\">\n                <h3>Education</h3>\n                <p><strong>Institution:</strong> ").concat(institution, "</p>\n                <p><strong>Degree:</strong> ").concat(degree, "</p>\n                <p><strong>Graduation Year:</strong> ").concat(gradYear, "</p>\n            </div>\n            \n            <div class=\"resume-section\">\n                <h3>Work Experience</h3>\n                <p><strong>Company:</strong> ").concat(company, "</p>\n                <p><strong>Role:</strong> ").concat(role, "</p>\n                <p><strong>Description:</strong> ").concat(experience, "</p>\n            </div>\n\n            <div class=\"resume-section skills\">\n                <h3>Skills</h3>\n                ").concat(skillsHTML, "\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Contact Info</h3>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Contact No:</strong> ").concat(contact_no, "</p>\n                <p><strong>Address:</strong> ").concat(address, "</p>\n            </div>\n        ");
        // Hide form and show the generated resume
        resumeForm.classList.add('hidden');
        resumeOutput.classList.remove('hidden');
        // Add Show/Hide Skills functionality
        addToggleSkillsButton();
    });
    // Edit resume
    editBtn.addEventListener('click', function () {
        resumeOutput.classList.add('hidden');
        resumeForm.classList.remove('hidden');
    });
    // Add new skill input fields
    var addSkillBtn = document.getElementById('add-skill-btn');
    addSkillBtn.addEventListener('click', function () {
        var skillsContainer = document.getElementById('skills-container');
        var newSkillGroup = document.createElement('div');
        newSkillGroup.classList.add('skill-group');
        newSkillGroup.innerHTML = "\n            <label for=\"skill\">Skill:</label>\n            <input type=\"text\" class=\"skill-input\" required>\n\n            <label for=\"proficiency\">Proficiency (%):</label>\n            <input type=\"number\" class=\"proficiency-input\" min=\"0\" max=\"100\" required>\n        ";
        skillsContainer.appendChild(newSkillGroup);
    });
    // Function to add Show/Hide Skills button
    function addToggleSkillsButton() {
        var skillsSection = document.querySelector('.resume-section.skills');
        var toggleSkillsBtn = document.createElement('button');
        toggleSkillsBtn.textContent = 'Hide Skills';
        toggleSkillsBtn.id = 'toggle-skills-btn';
        var skillsVisible = true;
        toggleSkillsBtn.addEventListener('click', function () {
            if (skillsVisible) {
                skillsSection.style.display = 'none';
                toggleSkillsBtn.textContent = 'Show Skills';
            }
            else {
                skillsSection.style.display = 'block';
                toggleSkillsBtn.textContent = 'Hide Skills';
            }
            skillsVisible = !skillsVisible;
        });
        // Add button after the skills section
        resumeContent.appendChild(toggleSkillsBtn);
    }
    // Download Resume as PDF functionality
    (_a = document.getElementById('download-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var resumeContent = document.getElementById('resume-content');
        var name = document.getElementById('name').value;
        var opt = {
            margin: 1,
            filename: "".concat(name, "_Resume.pdf"),
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        if (window['html2pdf']) {
            window['html2pdf']().from(resumeContent).set(opt).save();
        }
        else {
            console.error('html2pdf library not found.');
        }
    });
    // Generate shareable link and update URL
    function generateShareableLink() {
        var nameInput = document.getElementById('name');
        var name = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim();
        if (!name) {
            alert("Please enter a name to generate the URL.");
            return;
        }
        var nameSlug = name.replace(/\s+/g, '-').toLowerCase();
        window.history.pushState({}, '', "/".concat(nameSlug));
        var shareableUrl = "".concat(window.location.origin, "/").concat(nameSlug);
        alert("Share your resume using this URL: ".concat(shareableUrl));
    }
    (_b = document.getElementById('shareBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', generateShareableLink);
    function loadResumeFromUrl() {
        var _a, _b;
        var pathSegments = window.location.pathname.split('/');
        var username = pathSegments[1];
        if (username) {
            var readableName = username.replace('-', ' ');
            var nameInput = document.getElementById('name');
            nameInput.value = readableName;
            (_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            (_b = document.getElementById('resume-output')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        }
    }
    document.addEventListener('DOMContentLoaded', loadResumeFromUrl);
});
