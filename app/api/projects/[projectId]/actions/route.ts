import { NextRequest, NextResponse } from "next/server";
import { createAction, listActions } from "@/lib/actions";
import { validationFailed } from "@/lib/errors";
import { findProject } from "@/lib/projects";

type RouteContext = {
  params: Promise<{ projectId: string }>;
};

function projectNotFound(projectId: string) {
  return NextResponse.json(
    { code: "PROJECT_NOT_FOUND", message: `Project ${projectId} was not found.` },
    { status: 404 },
  );
}

async function readJson(request: NextRequest) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  if (!findProject(projectId)) {
    return projectNotFound(projectId);
  }
  return NextResponse.json(listActions(projectId));
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  if (!findProject(projectId)) {
    return projectNotFound(projectId);
  }

  const body = await readJson(request);
  const payload = isRecord(body) ? body : {};
  const fields: string[] = [];

  if (typeof payload.title !== "string" || !payload.title.trim()) {
    fields.push("title");
  }

  if (fields.length) {
    return NextResponse.json(
      validationFailed("Please fix the highlighted fields.", fields),
      { status: 400 },
    );
  }

  const action = createAction(projectId, {
    title: payload.title as string,
    owner: typeof payload.owner === "string" ? payload.owner : null,
    dueDate: typeof payload.dueDate === "string" ? payload.dueDate : null,
  });

  return NextResponse.json(action, { status: 201 });
}
