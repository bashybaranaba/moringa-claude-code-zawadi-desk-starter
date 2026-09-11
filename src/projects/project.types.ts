export type ProjectStatus = "active" | "paused" | "complete";

export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  updatedAt: string;
};

export type ProjectList = {
  items: Project[];
  total: number;
};
