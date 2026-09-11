import type { Project, ProjectList } from "./project.types.js";

const projects: Project[] = [
  {
    id: "project-zawadi",
    name: "Zawadi Desk",
    owner: "Operations",
    status: "active",
    updatedAt: "2026-09-10T08:00:00.000Z",
  },
  {
    id: "project-onboarding",
    name: "New hire onboarding",
    owner: "People",
    status: "paused",
    updatedAt: "2026-09-08T11:30:00.000Z",
  },
];

export function listProjects(): ProjectList {
  return { items: projects, total: projects.length };
}

export function findProject(projectId: string): Project | undefined {
  return projects.find((project) => project.id === projectId);
}
