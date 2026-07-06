export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
