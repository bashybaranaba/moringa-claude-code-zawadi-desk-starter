import type { Action } from "./action.types.js";

const actionsByProject = new Map<string, Action[]>();

export function listActions(projectId: string) {
  return actionsByProject.get(projectId) ?? [];
}

export function addAction(projectId: string, action: Action) {
  const existing = actionsByProject.get(projectId) ?? [];
  actionsByProject.set(projectId, [action, ...existing]);
  return action;
}
