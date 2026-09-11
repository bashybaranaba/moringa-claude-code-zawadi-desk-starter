import { Router } from "express";
import { listProjects } from "./project.repository.js";

export const projectRouter = Router();

projectRouter.get("/", (_req, res) => {
  res.json(listProjects());
});
