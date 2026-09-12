type Props = {
  onRetry?: () => void;
};

export function ErrorState({ onRetry }: Props) {
  return (
    <div className="errorState">
      <p className="errorStateText">We could not load actions.</p>
      {onRetry && (
        <button className="primaryButton" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}