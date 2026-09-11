import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="projectCard">
      <div>
        <h3>{project.name}</h3>
        <p>{project.owner}</p>
      </div>
      <span className={`status status-${project.status}`}>{project.status}</span>
    </article>
  );
}
