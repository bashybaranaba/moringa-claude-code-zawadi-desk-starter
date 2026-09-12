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

export type CreateActionInput = {
  title: string;
  owner?: string | null;
  dueDate?: string | null;
};

const actionsByProject = new Map<string, Action[]>([
  [
    "project-zawadi",
    [
      {
        id: "action-zawadi-2",
        title: "Confirm the demo desk owners",
        owner: "Amina",
        dueDate: "2026-09-18",
        status: "open",
        createdAt: "2026-09-11T12:30:00.000Z",
      },
      {
        id: "action-zawadi-1",
        title: "Review support inbox tags",
        owner: "Operations",
        dueDate: null,
        status: "blocked",
        createdAt: "2026-09-10T09:00:00.000Z",
      },
    ],
  ],
]);

export function listActions(projectId: string): ActionList {
  const items = actionsByProject.get(projectId) ?? [];
  return { items: [...items], total: items.length };
}

export function addAction(projectId: string, action: Action) {
  const existing = actionsByProject.get(projectId) ?? [];
  actionsByProject.set(projectId, [action, ...existing]);
  return action;
}

export function createAction(projectId: string, input: CreateActionInput) {
  const action = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    owner: input.owner?.trim() || "Unassigned",
    dueDate: input.dueDate || null,
    status: "open",
    createdAt: new Date().toISOString(),
  } satisfies Action;

  return addAction(projectId, action);
}
