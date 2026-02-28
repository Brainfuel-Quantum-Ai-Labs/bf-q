import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { ArrowRight, BookOpen, Newspaper, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Research",
  description:
    "BrainFuel Quantum AI Labs research publications, whitepapers, and news on quantum computing, AI, and blockchain.",
};

export const dynamic = "force-dynamic";

const typeConfig = {
  RESEARCH: { label: "Research", icon: BookOpen, variant: "quantum" as const },
  NEWS: { label: "News", icon: Newspaper, variant: "secondary" as const },
  UPDATE: { label: "Update", icon: RefreshCw, variant: "success" as const },
};

export default async function ResearchPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    type: "RESEARCH" | "NEWS" | "UPDATE";
    content: string;
    createdAt: Date;
  }[] = [];
  try {
    posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // DB not available
  }

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Research &amp; <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Publications, whitepapers, and announcements from the BF-Q Labs research team.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-white/10 bg-card animate-pulse"
                >
                  <div className="h-4 bg-white/10 rounded w-16 mb-4" />
                  <div className="h-6 bg-white/10 rounded mb-3" />
                  <div className="h-20 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const cfg = typeConfig[post.type];
                return (
                  <Link key={post.id} href={`/research/${post.slug}`} className="group">
                    <div className="p-6 rounded-xl border border-white/10 bg-card hover:border-quantum-700/50 transition-colors h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold mb-3 group-hover:text-quantum-300 transition-colors flex-grow">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {post.content.replace(/[#*>`]/g, "").slice(0, 150)}…
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-quantum-400 font-medium">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
