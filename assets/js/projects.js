// Function to load projects data
async function loadProjects() {
    try {
        const response = await fetch('../assets/data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects data');
        }
        const data = await response.json();
        displayProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        showError('projects-grid', 'Failed to load projects. Please try again later.');
    }
}

// Function to display projects
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    if (!projects || projects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-data">No projects available at the moment.</p>';
        return;
    }

    const projectsHTML = projects.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image" style="display: none;">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn btn-primary" target="_blank">${project.buttonText}</a>
            </div>
        </div>
    `).join('');

    projectsGrid.innerHTML = projectsHTML;
}

// Function to show error message
function showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<p class="error-message">${message}</p>`;
    }
}

// Load projects when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadProjects); 