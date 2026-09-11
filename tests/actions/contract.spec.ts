import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import {
  GET,
  POST,
} from "../../app/api/projects/[projectId]/actions/route";

const run = process.env.INCLUDE_ACTION_CONTRACTS === "1" ? describe : describe.skip;
type NextRequestInit = ConstructorParameters<typeof NextRequest>[1];

async function request(path: string, init?: NextRequestInit) {
  const match = path.match(/^\/projects\/([^/]+)\/actions$/);
  if (!match?.[1]) throw new Error(`Unexpected test path: ${path}`);
  const request = new NextRequest(`http://localhost/api${path}`, init);
  const context = { params: Promise.resolve({ projectId: match[1] }) };
  const response = init?.method === "POST" ? await POST(request, context) : await GET(request, context);
  const body = await response.json();
  return { response, body };
}

run("actions contract", () => {
  it("lists actions for a known project", async () => {
    const { response, body } = await request("/projects/project-zawadi/actions");

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ items: expect.any(Array), total: expect.any(Number) });
    expect(body.items).not.toBeNull();
  });

  it("returns 404 for an unknown project", async () => {
    const { response, body } = await request("/projects/missing/actions");

    expect(response.status).toBe(404);
    expect(body).toMatchObject({ code: "PROJECT_NOT_FOUND", message: expect.any(String) });
  });

  it("creates an action with defaults", async () => {
    const { response, body } = await request("/projects/project-zawadi/actions", {
      method: "POST",
      body: JSON.stringify({ title: "Send minutes", owner: "Amina", dueDate: null }),
    });

    expect(response.status).toBe(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      title: "Send minutes",
      owner: "Amina",
      dueDate: null,
      status: "open",
      createdAt: expect.any(String),
    });
  });

  it("validates blank titles", async () => {
    const { response, body } = await request("/projects/project-zawadi/actions", {
      method: "POST",
      body: JSON.stringify({ title: "  ", owner: "Amina" }),
    });

    expect(response.status).toBe(400);
    expect(body).toMatchObject({
      code: "VALIDATION_FAILED",
      fields: expect.arrayContaining(["title"]),
    });
  });
});
