import { NextRequest, NextResponse } from "next/server";
import { findProject } from "@/lib/projects";
import { listActions, addAction } from "@/lib/actions";
import { validationFailed, projectNotFound } from "@/lib/errors";

type RouteContext = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  const project = findProject(projectId);

  if (!project) {
    return NextResponse.json(
      projectNotFound(projectId),
      { status: 404 }
    );
  }

  const actions = listActions(projectId);
  return NextResponse.json({ items: actions, total: actions.length });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  const project = findProject(projectId);

  if (!project) {
    return NextResponse.json(
      projectNotFound(projectId),
      { status: 404 }
    );
  }

  let body: { title: string; owner: string; dueDate: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      validationFailed("Invalid JSON body", ["body"]),
      { status: 400 }
    );
  }

  const trimmedTitle = body.title?.trim() ?? "";
  if (!trimmedTitle) {
    return NextResponse.json(
      validationFailed("Title is required", ["title"]),
      { status: 400 }
    );
  }
  if (trimmedTitle.length > 200) {
    return NextResponse.json(
      validationFailed("Title must not exceed 200 characters", ["title"]),
      { status: 400 }
    );
  }

  if (!body.owner) {
    return NextResponse.json(
      validationFailed("Owner is required", ["owner"]),
      { status: 400 }
    );
  }

  if (body.dueDate) {
    try {
      new Date(body.dueDate);
    } catch {
      return NextResponse.json(
        validationFailed("Due date must be a valid ISO 8601 date", ["dueDate"]),
        { status: 400 }
      );
    }
  }

  const newAction = addAction(projectId, {
    id: crypto.randomUUID(),
    title: trimmedTitle,
    owner: body.owner,
    dueDate: body.dueDate,
    status: "open",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(newAction, { status: 201 });
}