import express from "express";
import { actionRouter } from "../actions/action.routes.js";
import { ApiError } from "../errors.js";
import { projectRouter } from "../projects/project.routes.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use("/projects", projectRouter);
  app.use("/projects/:projectId/actions", actionRouter);

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof ApiError) {
      res.status(error.status).json(error.body);
      return;
    }
    res.status(500).json({ code: "INTERNAL_ERROR", message: "Something went wrong." });
  });

  return app;
}
