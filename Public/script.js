// Once DOM is loaded, get the id of the projects list
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-list");
  const select = document.getElementById("project-select");

  // Call fetchProjects to populate dropdown
  fetchProjects();

  // Fetch projects
  function fetchProjects() {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((projects) => {
        populateDropdown(projects);
        renderProjects(projects);
      })
      .catch((err) => {
        console.error(err);
        container.innerHTML = `<p>Error loading data from server.</p>`;
      });
  }

  // Populate options inside <select>
  function populateDropdown(projects) {
    select.innerHTML = '<option value="">--- All Projects ---</option>';

    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.id; // Assigns numeric ID to value
      option.textContent = project.title; // Displays project name
      select.appendChild(option);
    });
  }

  // Populate caards
  function renderProjects(projectsArray) {
    container.innerHTML = "";

    projectsArray.forEach((project) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h2>${project.title}</h2>
        <span class="badge">Year: ${project.year}</span>
      `;
      container.appendChild(card);
    });
  }

  // Fetch a single project by ID route parameter
  function fetchSingleProject(id) {
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((project) => {
        renderProjects([project]);
      })
      .catch((err) => {
        console.error(err);
        container.innerHTML = `<p>Error loading project details.</p>`;
      });
  }

  // Handle dropdown selection changes
  select.addEventListener("change", (e) => {
    // Empty string value means "-- All Projects --" selected (null ID)
    const selectedId = e.target.value ? Number(e.target.value) : null;

    if (selectedId === null) {
      fetchProjects();
    } else {
      fetchSingleProject(selectedId);
    }
  });
});
