import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className={`projectCard${compact ? " projectCard-compact" : ""}`}>
      <div>
        <h3>{project.name}</h3>
        <p>{project.owner}</p>
      </div>
      <span className={`status status-${project.status}`}>{project.status}</span>
    </article>
  );
}
