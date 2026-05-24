import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { ContentMeta } from "@/components/common/ContentMeta";
import { GlassCard } from "@/components/common/GlassCard";
import { PageHero } from "@/components/common/PageHero";
import { TagList } from "@/components/common/TagList";
import { galleryImages } from "@/lib/mock-data";

type GalleryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function findImage(slug: string) {
  return galleryImages.find((image) => image.slug === slug);
}

export function generateStaticParams() {
  return galleryImages.map((image) => ({ slug: image.slug }));
}

export async function generateMetadata({
  params
}: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const image = findImage(slug);

  if (!image) {
    return {
      title: "图像未找到 | Cosmos Atlas"
    };
  }

  return {
    title: `${image.title} | Cosmos Atlas`,
    description: image.description
  };
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params;
  const image = findImage(slug);

  if (!image) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
      <Link
        href="/gallery"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        返回天文图像库
      </Link>

      <PageHero
        eyebrow={`${image.category} / ${image.wavelength}`}
        title={image.title}
        description={image.description}
        icon={ImageIcon}
        tone="rose"
      >
        <GlassCard className="overflow-hidden">
          <div className={`h-56 ${image.gradient}`} />
        </GlassCard>
      </PageHero>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <GlassCard className="p-6">
          <h2 className="text-2xl font-semibold text-white">观测说明</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{image.observation}</p>
          <div className="mt-6">
            <TagList tags={image.tags} />
          </div>
        </GlassCard>

        <ContentMeta
          items={[
            { label: "分类", value: image.category },
            { label: "对象类型", value: image.objectType },
            { label: "观测波段", value: image.wavelength },
            { label: "图像来源", value: image.source },
            ...image.details
          ]}
        />
      </div>
    </section>
  );
}
