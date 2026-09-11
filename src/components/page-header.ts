export type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return `<header><h1>${title}</h1></header>`;
}
