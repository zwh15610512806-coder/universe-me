import type { LucideIcon } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: "cyan" | "violet" | "amber" | "rose";
  children?: React.ReactNode;
};

const toneClassName = {
  cyan: "text-nebula-cyan",
  violet: "text-nebula-violet",
  amber: "text-nebula-amber",
  rose: "text-nebula-rose"
};

export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  tone = "cyan",
  children
}: PageHeroProps) {
  return (
    <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
      <div className="max-w-3xl">
        <div
          className={[
            "mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm",
            toneClassName[tone]
          ].join(" ")}
        >
          <Icon size={16} />
          {eyebrow}
        </div>
        <h1 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
