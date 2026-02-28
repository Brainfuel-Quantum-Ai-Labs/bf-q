import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { staticPosts } from "@/lib/static-data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = staticPosts.find((p) => p.slug === slug);
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (post) return { title: post.title };
  } catch {
    // DB not available
  }
  if (sp) return { title: sp.title };
  return { title: "Research" };
}

const typeLabels: Record<string, { label: string; variant: "quantum" | "secondary" | "success" }> = {
  RESEARCH: { label: "Research", variant: "quantum" },
  NEWS: { label: "News", variant: "secondary" },
  UPDATE: { label: "Update", variant: "success" },
};

export default async function ResearchPostPage({ params }: Props) {
  const { slug } = await params;

  let dbPost: {
    id: string;
    title: string;
    slug: string;
    type: string;
    content: string;
    createdAt: Date;
  } | null = null;
  try {
    dbPost = await prisma.post.findUnique({ where: { slug } });
  } catch {
    // DB not available
  }

  const sp = staticPosts.find((p) => p.slug === slug);

  if (!dbPost && !sp) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const post = dbPost ?? sp!;
  const typeCfg = typeLabels[post.type] ?? typeLabels.RESEARCH;

  const relatedPosts = staticPosts.filter((p) => p.slug !== slug && p.type === post.type).slice(0, 3);

  return (
    <div className="pt-16">
      <article className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Research
            </Link>

            {/* Meta */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={typeCfg.variant}>{typeCfg.label}</Badge>
                <span className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{post.title}</h1>
            </div>

            {/* Content */}
            <div className="p-8 rounded-2xl border border-white/10 bg-card mb-10">
              <div className="prose prose-invert prose-quantum max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-quantum-400 prose-table:text-sm prose-th:text-muted-foreground prose-td:text-muted-foreground">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-xl border border-quantum-800/40 bg-quantum-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold mb-1">Interested in this research area?</p>
                <p className="text-sm text-muted-foreground">
                  Explore partnership and collaboration opportunities with BF-Q Labs.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-quantum-600 hover:bg-quantum-500 text-white text-sm font-medium transition-colors"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6">
                Related <span className="gradient-text">Research</span>
              </h2>
              <div className="space-y-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/research/${rp.slug}`} className="group block">
                    <div className="p-5 rounded-xl border border-white/10 bg-card hover:border-quantum-700/50 transition-colors flex items-center justify-between gap-4">
                      <div className="flex-grow min-w-0">
                        <Badge variant={typeLabels[rp.type]?.variant ?? "quantum"} className="mb-2">
                          {typeLabels[rp.type]?.label ?? rp.type}
                        </Badge>
                        <h3 className="font-semibold group-hover:text-quantum-300 transition-colors truncate">
                          {rp.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(rp.createdAt)}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-quantum-400 flex-shrink-0 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
