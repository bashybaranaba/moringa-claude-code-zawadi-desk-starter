type Props = {
  onCreate?: () => void;
};

export function EmptyState({ onCreate }: Props) {
  return (
    <div className="emptyState">
      <p className="emptyStateText">No actions yet.</p>
      {onCreate && (
        <button className="primaryButton" onClick={onCreate}>
          Add the first one
        </button>
      )}
    </div>
  );
}