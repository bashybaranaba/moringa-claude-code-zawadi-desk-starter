"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Action, ActionList, ActionStatus } from "@/lib/actions";

type LoadState = "loading" | "loaded" | "empty" | "error";

const statusLabels: Record<ActionStatus, string> = {
  open: "Open",
  blocked: "Blocked",
  done: "Done",
};

export function ActionsScreen({ projectId }: { projectId: string }) {
  const [actions, setActions] = useState<Action[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = actions.length;
  const actionCount = useMemo(() => {
    if (loadState === "loading") return "Loading";
    if (!total) return "No actions";
    return `${total} ${total === 1 ? "action" : "actions"}`;
  }, [loadState, total]);

  async function loadActions() {
    setLoadState("loading");
    try {
      const response = await fetch(`/api/projects/${projectId}/actions`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Could not load actions.");
      const body = (await response.json()) as ActionList;
      setActions(body.items);
      setLoadState(body.items.length ? "loaded" : "empty");
    } catch {
      setLoadState("error");
    }
  }

  useEffect(() => {
    void loadActions();
    // projectId is stable for this demo screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function createAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Add a short action title before saving.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/actions`, {
        method: "POST",
        body: JSON.stringify({
          title,
          owner,
          dueDate: dueDate || null,
        }),
      });

      const body = (await response.json()) as Action | { message?: string };

      if (!response.ok) {
        throw new Error("message" in body ? body.message : "Could not save action.");
      }

      setActions((current) => [body as Action, ...current]);
      setLoadState("loaded");
      setTitle("");
      setOwner("");
      setDueDate("");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not save action.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel actionsPanel" aria-labelledby="actions-heading">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Workshop Feature</p>
          <h2 id="actions-heading">Actions</h2>
        </div>
        <span>{actionCount}</span>
      </div>

      <p className="copy">
        Track follow-up work for the Zawadi Desk project. New actions appear
        first, with status, owner, and due date visible without opening another
        screen.
      </p>

      <form className="actionForm" onSubmit={createAction}>
        <label>
          <span>Action title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={200}
            placeholder="Send the meeting minutes"
          />
        </label>
        <label>
          <span>Owner</span>
          <input
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            maxLength={80}
            placeholder="Amina"
          />
        </label>
        <label>
          <span>Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add action"}
        </button>
        {formError ? <p className="formError">{formError}</p> : null}
      </form>

      <div className="actionsList" aria-live="polite">
        {loadState === "loading" ? <LoadingRows /> : null}
        {loadState === "error" ? <ErrorState onRetry={loadActions} /> : null}
        {loadState === "empty" ? <EmptyState /> : null}
        {loadState === "loaded"
          ? actions.map((action) => (
              <ActionRow key={action.id} action={action} />
            ))
          : null}
      </div>
    </section>
  );
}

function ActionRow({ action }: { action: Action }) {
  return (
    <article className="actionRow" tabIndex={0}>
      <div>
        <StatusBadge status={action.status} />
        <h3>{action.title}</h3>
        <p>
          Owner: {action.owner}
          <span aria-hidden="true"> · </span>
          Due: {formatDueDate(action.dueDate)}
        </p>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: ActionStatus }) {
  return (
    <span className={`status status-${status}`} aria-label={`Status: ${statusLabels[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

function LoadingRows() {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <div className="skeletonRow" key={index}>
          <span />
          <strong />
          <em />
        </div>
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="stateCard">
      <h3>No actions yet.</h3>
      <p>Create the first follow-up action for this project.</p>
      <a href="#actions-heading">Add the first one</a>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="stateCard stateCardDanger">
      <h3>We could not load actions.</h3>
      <p>Check your connection and try again.</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

function formatDueDate(dueDate: string | null) {
  if (!dueDate) return "No due date";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dueDate}T00:00:00`));
}
