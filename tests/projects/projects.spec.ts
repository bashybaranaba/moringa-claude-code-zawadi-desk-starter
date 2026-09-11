import { describe, expect, it } from "vitest";
import { listProjects } from "../../src/projects/project.repository.js";

describe("projects", () => {
  it("returns a stable project list", () => {
    const result = listProjects();

    expect(result.total).toBe(2);
    expect(result.items[0]).toMatchObject({
      id: "project-zawadi",
      name: "Zawadi Desk",
      status: "active",
    });
  });
});
