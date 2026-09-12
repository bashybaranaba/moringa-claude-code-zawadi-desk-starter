"use client";

import { listProjects } from "@/lib/projects";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { ActionsScreen } from "@/components/actions-screen";
import { useState } from "react";

type Action = {
  id: string;
  title: string;
  owner: string;
  dueDate: string | null;
  status: "open" | "blocked" | "done";
  createdAt: string;
};

export default function Home() {
  const projects = listProjects();
  const [showActions, setShowActions] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadActions = async (projectId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects/${projectId}/actions`);
      if (response.ok) {
        const data = await response.json();
        setActions(data.items);
      } else {
        setError(new Error("Failed to load actions"));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const title = formData.get("title") as string;
    const owner = formData.get("owner") as string;
    const dueDate = formData.get("dueDate") as string | null;

    setIsCreating(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects/project-zawadi/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, owner, dueDate }),
      });
      
      if (response.ok) {
        const newAction = await response.json();
        setActions([newAction, ...actions]);
        form.reset();
      } else {
        setError(new Error("Failed to create action"));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsCreating(false);
    }
  };

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
      <section className="panel" aria-labelledby="actions-heading">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Workshop Feature</p>
            <h2 id="actions-heading">Actions</h2>
          </div>
        </div>
        <div style={{ marginTop: "24px" }}>
          <button
            className="primaryButton"
            onClick={() => setShowActions(!showActions)}
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </button>
          {showActions && (
            <div style={{ marginTop: "24px" }}>
              {/* Full screen with actual API integration */}
              <ActionsScreen
                loading={loading}
                actions={actions}
                error={error}
                onRetry={() => loadActions("project-zawadi")}
                onCreate={() => {
                  // Focus the form when created
                  document.getElementById("create-action-form")?.focus();
                }}
              />

              {/* Creation form */}
              <form
                id="create-action-form"
                onSubmit={createAction}
                style={{ marginTop: "32px", maxWidth: "720px" }}
              >
                <h3 style={{ marginTop: "0" }}>Create new action</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <input
                    name="title"
                    placeholder="Title (required)"
                    required
                    minLength={1}
                    maxLength={200}
                    style={{
                      padding: "12px",
                      fontSize: "1rem",
                      border: "1px solid color-mix(in srgb, var(--ink), transparent 60%)",
                      borderRadius: "4px",
                      backgroundColor: "var(--card)",
                      color: "var(--ink)",
                    }}
                  />
                  <input
                    name="owner"
                    placeholder="Owner (required)"
                    required
                    style={{
                      padding: "12px",
                      fontSize: "1rem",
                      border: "1px solid color-mix(in srgb, var(--ink), transparent 60%)",
                      borderRadius: "4px",
                      backgroundColor: "var(--card)",
                      color: "var(--ink)",
                    }}
                  />
                  <input
                    name="dueDate"
                    type="date"
                    placeholder="Due date (optional)"
                    style={{
                      padding: "12px",
                      fontSize: "1rem",
                      border: "1px solid color-mix(in srgb, var(--ink), transparent 60%)",
                      borderRadius: "4px",
                      backgroundColor: "var(--card)",
                      color: "var(--ink)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="primaryButton"
                    style={{ cursor: isCreating ? "not-allowed" : "pointer" }}
                  >
                    {isCreating ? "Creating..." : "Create Action"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}