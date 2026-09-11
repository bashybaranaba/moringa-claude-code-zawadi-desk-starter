import { Router } from "express";
import { findProject } from "../projects/project.repository.js";
import { notFound } from "../errors.js";

export const actionRouter = Router({ mergeParams: true });

actionRouter.get("/", (req, res, next) => {
  try {
    const projectId = String(
      (req.params as Record<string, string | undefined>)["projectId"] ?? "",
    );
    if (!findProject(projectId)) throw notFound(`Project ${projectId} was not found.`);
    res.status(501).json({
      code: "NOT_IMPLEMENTED",
      message: "Dev A builds this endpoint during the workshop.",
    });
  } catch (error) {
    next(error);
  }
});

actionRouter.post("/", (req, res, next) => {
  try {
    const projectId = String(
      (req.params as Record<string, string | undefined>)["projectId"] ?? "",
    );
    if (!findProject(projectId)) throw notFound(`Project ${projectId} was not found.`);
    res.status(501).json({
      code: "NOT_IMPLEMENTED",
      message: "Dev A builds this endpoint during the workshop.",
    });
  } catch (error) {
    next(error);
  }
});
