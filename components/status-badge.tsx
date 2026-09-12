import { ActionStatus } from "@/lib/actions";

type Props = {
  status: ActionStatus;
};

const statusConfig: Record<ActionStatus, { label: string; class: string }> = {
  open: { label: "Open", class: "status-open" },
  blocked: { label: "Blocked", class: "status-blocked" },
  done: { label: "Done", class: "status-done" },
};

export function StatusBadge({ status }: Props) {
  const config = statusConfig[status];

  return (
    <span className={`status ${config.class}`} aria-label={config.label}>
      {config.label}
    </span>
  );
}