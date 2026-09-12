import { Action } from "@/lib/actions";
import { StatusBadge } from "./status-badge";
import { ActionRow } from "./action-row";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";

type Props = {
  loading?: boolean;
  actions?: Action[];
  error?: Error | null;
  onRetry?: () => void;
  onCreate?: () => void;
  loadingSkeletonCount?: number;
};

export function ActionsScreen({
  loading = false,
  actions = [],
  error = null,
  onRetry,
  onCreate,
  loadingSkeletonCount = 3,
}: Props) {
  if (loading) {
    return (
      <section className="panel" aria-labelledby="actions-screen-heading">
        <h2 id="actions-screen-heading">Actions</h2>
        <div className="actionList">
          {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
            <div key={`skeleton-${index}`} className="actionRow skeleton">
              <div className="actionRowMain">
                <div className="skeletonTitle"></div>
                <div className="skeletonMeta"></div>
              </div>
              <div className="skeletonStatus"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="panel" aria-labelledby="actions-screen-heading">
        <h2 id="actions-screen-heading">Actions</h2>
        <ErrorState onRetry={onRetry} />
      </section>
    );
  }

  if (actions.length === 0) {
    return (
      <section className="panel" aria-labelledby="actions-screen-heading">
        <h2 id="actions-screen-heading">Actions</h2>
        <EmptyState onCreate={onCreate} />
      </section>
    );
  }

  return (
    <section className="panel" aria-labelledby="actions-screen-heading">
      <h2 id="actions-screen-heading">Actions</h2>
      <div className="actionList">
        {actions.map((action) => (
          <ActionRow key={action.id} action={action} />
        ))}
      </div>
    </section>
  );
}