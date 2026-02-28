import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { staticPosts } from "@/lib/static-data";
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
  let dbPosts: {
    id: string;
    title: string;
    slug: string;
    type: "RESEARCH" | "NEWS" | "UPDATE";
    content: string;
    createdAt: Date;
  }[] = [];
  try {
    dbPosts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // DB not available
  }

  // Use DB data when available, otherwise use rich static fallback.
  const posts =
    dbPosts.length > 0
      ? dbPosts
      : (staticPosts as typeof dbPosts);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <BookOpen className="w-3 h-3" /> Publications & Insights
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Research &amp; <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Publications, whitepapers, and announcements from the BF-Q Labs research team.
            </p>
          </div>

          {/* Type filter badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(["RESEARCH", "NEWS", "UPDATE"] as const).map((type) => {
              const cfg = typeConfig[type];
              const count = posts.filter((p) => p.type === type).length;
              return (
                <div
                  key={type}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-card text-sm"
                >
                  <cfg.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-medium">{cfg.label}</span>
                  <span className="px-1.5 py-0.5 rounded text-xs bg-white/10 text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/research/${featured.slug}`} className="group block mb-10">
              <div className="p-8 md:p-10 rounded-2xl border border-quantum-800/40 bg-gradient-to-br from-quantum-950/60 to-quantum-900/20 hover:border-quantum-600/60 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={typeConfig[featured.type]?.variant ?? "quantum"}>
                    {typeConfig[featured.type]?.label ?? featured.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(featured.createdAt)}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-quantum-700/50 text-quantum-400">
                    Featured
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-quantum-300 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2 max-w-3xl">
                  {featured.content.replace(/[#*>`|]/g, "").slice(0, 220)}…
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-quantum-400 font-medium">
                  Read full paper <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => {
                const cfg = typeConfig[post.type] ?? typeConfig.RESEARCH;
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
                        {post.content.replace(/[#*>`|]/g, "").slice(0, 150)}…
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-quantum-400 font-medium">
                        Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-10 rounded-2xl border border-white/10 bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Collaborate on <span className="gradient-text">Research</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We welcome academic partnerships and joint research programs. Reach out to discuss
              co-authorship, dataset sharing, and grant applications.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
            >
              Partner with BF-Q Research <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
