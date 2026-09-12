import { listProjects } from "@/lib/projects";
import { ActionsScreen } from "@/components/actions-screen";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";

export default function Home( {
  const projects = listProjects();

  return (
    <main className="shell">
      <PageHeader
        title="Zawadi Desk"
        subtitle="Operations projects, decisions, and follow-up actions in one calm workspace."
      />
      <section className="panel" aria-labelledby="projects-heading">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Reference Feature</p>
            <h2 id="projects-heading">Projects</h2>
          </div>
          <span>{projects.total} active records</span>
        </div>
        <div className="list">
          {projects.items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <ActionsScreen projectId="project-zawadi" />
    </main>
  );
}
