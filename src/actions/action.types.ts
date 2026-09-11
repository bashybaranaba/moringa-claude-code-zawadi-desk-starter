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
