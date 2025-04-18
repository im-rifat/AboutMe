document.addEventListener('DOMContentLoaded', () => {
    loadAboutData();
});

async function loadAboutData() {
    try {
        const response = await fetch('../assets/data/aboutme.json');
        if (!response.ok) {
            throw new Error('Failed to load about data');
        }
        const data = await response.json();
        displaySkills(data.skills);
        displayExperience(data.experience);
        displayEducation(data.education);
    } catch (error) {
        console.error('Error loading about data:', error);
        showError('skills-container', 'Failed to load skills data');
        showError('experience-container', 'Failed to load experience data');
        showError('education-container', 'Failed to load education data');
    }
}

function displaySkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    if (!skills || Object.keys(skills).length === 0) {
        skillsContainer.innerHTML = '<p class="no-data">No skills data available.</p>';
        return;
    }

    const skillsHTML = skills.map(category => `
        <div class="skill-category">
          <h3>${category.name}</h3>
          <div class="skill-tags">
            ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      `).join('');

    skillsContainer.innerHTML = skillsHTML;
}

function displayExperience(experience) {
    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;

    if (!experience || experience.length === 0) {
        experienceContainer.innerHTML = '<p class="no-data">No experience data available.</p>';
        return;
    }

    const experienceHTML = experience.map(exp => `
        <div class="project-card">
            <div class="project-content">
                <h3 class="project-title">${exp.title}</h3>
                <p class="project-description">${exp.company} | ${exp.period}</p>
                <div class="project-tags">
                    ${exp.achievements.map(achievement => `<span class="project-tag">${achievement}</span>`).join('')}
                </div>
                <div class="project-tags">
                    ${exp.technologies.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    experienceContainer.innerHTML = experienceHTML;
}

function displayEducation(education) {
    const educationContainer = document.getElementById('education-container');
    if (!educationContainer) return;

    if (!education || education.length === 0) {
        educationContainer.innerHTML = '<p class="no-data">No education data available.</p>';
        return;
    }

    const educationHTML = education.map(edu => `
        <div class="project-card">
            <div class="project-content">
                <h3 class="project-title">${edu.degree}</h3>
                <p class="project-description">${edu.school} | ${edu.period}</p>
                <div class="project-tags" style="display: none;">
                    ${edu.courses.map(course => `<span class="tag">${course}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    educationContainer.innerHTML = educationHTML;
}

function showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<p class="error-message">${message}</p>`;
    }
} 