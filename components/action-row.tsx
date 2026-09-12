import { Action } from "@/lib/actions";
import { StatusBadge } from "./status-badge";

type Props = {
  action: Action;
};

export function ActionRow({ action }: Props) {
  return (
    <div className="actionRow">
      <div className="actionRowMain">
        <h3 className="actionTitle">{action.title}</h3>
        <div className="actionMeta">
          <span className="actionOwner">{action.owner}</span>
          {action.dueDate && (
            <span className="actionDueDate">• Due: {action.dueDate}</span>
          )}
        </div>
      </div>
      <StatusBadge status={action.status} />
    </div>
  );
}