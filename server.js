const express = require("express");
const app = express();
const PORT = 3000;

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Static files middleware
app.use(express.static("public"));

const projects = [
  {
    id: 1,
    title: "2000 LED Scrolling Display",
    year: 1988,
  },
  {
    id: 2,
    title: "286 Gantry Robot",
    year: 1989,
  },
  {
    id: 3,
    title: "Application Sherlock",
    year: 1992,
  },
  {
    id: 4,
    title: "Goldman Compensation App",
    year: 1994,
  },
  {
    id: 5,
    title: "Derivatives Valuation System",
    year: 1995,
  },
];

// Return All
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Search by id
app.get("/api/projects/:id", (req, res) => {
  // Convert req.params.id to number
  const id = Number(req.params.id);

  // Search the Projects array for a matching ID
  const project = projects.find((p) => p.id === id);

  // If no project matches id, return a 404 error
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  // Return project as JSON
  res.json(project);
});

// Listen to port 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
