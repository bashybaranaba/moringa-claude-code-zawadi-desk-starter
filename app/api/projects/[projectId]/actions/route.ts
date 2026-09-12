import { NextRequest, NextResponse } from "next/server";
import { findProject } from "@/lib/projects";
import { addAction, listActions, type ActionStatus } from "@/lib/actions";

type RouteContext = {
  params: Promise<{ projectId: string }>;
};

function notFound(projectId: string) {
  return NextResponse.json(
    { code: "PROJECT_NOT_FOUND", message: `Project ${projectId} was not found.` },
    { status: 404 },
  );
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  if (!findProject(projectId)) {
    return notFound(projectId);
  }

  const items = listActions(projectId);
  return NextResponse.json({ items, total: items.length }, { status: 200 });
}

export async function POST(_request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  if (!findProject(projectId)) {
    return notFound(projectId);
  }

  let payload: { title?: unknown; owner?: unknown; dueDate?: unknown; status?: unknown } = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const owner = typeof payload.owner === "string" ? payload.owner.trim() : "";
  const dueDate = payload.dueDate === null || typeof payload.dueDate === "string" ? payload.dueDate : null;
  const status = payload.status === "blocked" || payload.status === "done" ? payload.status : "open";

  const fields: string[] = [];
  if (!title) fields.push("title");

  if (fields.length > 0) {
    return NextResponse.json(
      { code: "VALIDATION_FAILED", message: "One or more fields are invalid.", fields },
      { status: 400 },
    );
  }

  const action = addAction(projectId, {
    id: `action-${crypto.randomUUID()}`,
    title,
    owner,
    dueDate: dueDate ?? null,
    status: status as ActionStatus,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(action, { status: 201 });
}
