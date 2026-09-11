export type ActionStatus = "open" | "blocked" | "done";

export type Action = {
  id: string;
  title: string;
  owner: string;
  dueDate: string | null;
  status: ActionStatus;
  createdAt: string;
};

export type ActionList = {
  items: Action[];
  total: number;
};

const actionsByProject = new Map<string, Action[]>();

export function listActions(projectId: string) {
  return actionsByProject.get(projectId) ?? [];
}

export function addAction(projectId: string, action: Action) {
  const existing = actionsByProject.get(projectId) ?? [];
  actionsByProject.set(projectId, [action, ...existing]);
  return action;
}
