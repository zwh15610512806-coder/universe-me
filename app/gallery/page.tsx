import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { TagList } from "@/components/common/TagList";
import { galleryImages } from "@/lib/mock-data";

export default function GalleryPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
      <PageHero
        eyebrow="天文图像库"
        title="为天文影像建立可扩展的中文图库。"
        description="当前使用渐变模拟图像呈现不同观测对象，先确认分类、波段、天体类型和说明文字的展示方式。"
        icon={ImageIcon}
        tone="rose"
      >
        <GlassCard className="p-5">
          <p className="text-sm text-slate-400">图库条目</p>
          <div className="mt-3 text-3xl font-semibold text-white">{galleryImages.length} 张</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            每张图像都有独立详情页，用于承载观测说明、标签和对象信息。
          </p>
        </GlassCard>
      </PageHero>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <Link key={image.slug} href={`/gallery/${image.slug}`} className="group">
            <GlassCard className="h-full overflow-hidden">
              <div className={`h-52 ${image.gradient}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">{image.title}</h2>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:text-white"
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{image.description}</p>
                <div className="mt-4">
                  <TagList tags={image.tags} />
                </div>
                <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
                  <div>
                    <span className="text-slate-500">波段：</span>
                    <span className="text-slate-300">{image.wavelength}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">类型：</span>
                    <span className="text-slate-300">{image.objectType}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
