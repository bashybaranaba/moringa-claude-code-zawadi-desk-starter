import { describe, expect, it } from "vitest";
import { createApp } from "../../src/api/app.js";

const run = process.env.INCLUDE_ACTION_CONTRACTS === "1" ? describe : describe.skip;

async function request(path: string, init?: RequestInit) {
  const app = createApp();
  const server = app.listen(0);
  try {
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No test port.");
    const response = await fetch(`http://127.0.0.1:${address.port}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    const body = await response.json();
    return { response, body };
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
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
