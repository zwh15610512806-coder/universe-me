import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-white/10 bg-white/[0.06] shadow-inner-glass backdrop-blur-xl",
        "transition duration-300 hover:border-nebula-cyan/35 hover:bg-white/[0.08] hover:shadow-glow",
        className
      ].join(" ")}
      {...props}
    />
  );
}
