import type { DetailItem } from "@/lib/types";

type ContentMetaProps = {
  items: DetailItem[];
};

export function ContentMeta({ items }: ContentMetaProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <span className="text-xs text-slate-500">{item.label}</span>
          <p className="mt-2 text-sm leading-6 text-slate-200">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
