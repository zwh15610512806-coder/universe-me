type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm tracking-[0.28em] text-nebula-cyan">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-xl text-sm leading-6 text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
