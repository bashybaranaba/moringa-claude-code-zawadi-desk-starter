type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="hero">
      <p className="eyebrow">Moringa Claude Code Workshop</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
