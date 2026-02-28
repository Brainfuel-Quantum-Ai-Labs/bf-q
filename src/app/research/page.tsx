"use client";

import { useState, useEffect } from "react";
import { staticPosts } from "@/lib/static-data";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { ArrowRight, BookOpen, Newspaper, RefreshCw, Layers } from "lucide-react";

const typeConfig = {
  RESEARCH: {
    label: "Research",
    icon: BookOpen,
    variant: "quantum" as const,
    tabActive: "bg-sky-900/50 border-sky-600/60 text-sky-300 scale-105",
    tabIdle: "bg-sky-950/20 border-sky-900/40 text-sky-500 hover:border-sky-700/60",
    glow: "rgba(14,165,233,0.12)",
    cardBorder: "border-sky-800/40 hover:border-sky-600/60",
    cardBg: "bg-sky-950/10",
  },
  NEWS: {
    label: "News",
    icon: Newspaper,
    variant: "secondary" as const,
    tabActive: "bg-slate-700/50 border-slate-500/60 text-slate-200 scale-105",
    tabIdle: "bg-slate-900/20 border-slate-800/40 text-slate-500 hover:border-slate-600/60",
    glow: "rgba(148,163,184,0.10)",
    cardBorder: "border-slate-700/40 hover:border-slate-500/60",
    cardBg: "bg-slate-900/10",
  },
  UPDATE: {
    label: "Update",
    icon: RefreshCw,
    variant: "success" as const,
    tabActive: "bg-green-900/50 border-green-600/60 text-green-300 scale-105",
    tabIdle: "bg-green-950/20 border-green-900/40 text-green-500 hover:border-green-700/60",
    glow: "rgba(34,197,94,0.12)",
    cardBorder: "border-green-800/40 hover:border-green-600/60",
    cardBg: "bg-green-950/10",
  },
};

type FilterKey = "ALL" | "RESEARCH" | "NEWS" | "UPDATE";

export default function ResearchPage() {
  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [posts, setPosts] = useState(staticPosts as { id: string; title: string; slug: string; type: "RESEARCH" | "NEWS" | "UPDATE"; content: string; createdAt: Date }[]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (Array.isArray(data) && data.length > 0) setPosts(data); })
      .catch(() => {});
  }, []);

  const counts = {
    ALL: posts.length,
    RESEARCH: posts.filter((p) => p.type === "RESEARCH").length,
    NEWS: posts.filter((p) => p.type === "NEWS").length,
    UPDATE: posts.filter((p) => p.type === "UPDATE").length,
  };

  const visible = filter === "ALL" ? posts : posts.filter((p) => p.type === filter);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-quantum-600/6 blur-[140px]" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-sky-900/8 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-green-900/6 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <BookOpen className="w-3 h-3" /> Publications &amp; Insights
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Research &amp; <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Publications, whitepapers, and announcements from the BF-Q Labs research team.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(["ALL", "RESEARCH", "NEWS", "UPDATE"] as FilterKey[]).map((key) => {
              const isActive = filter === key;
              const Icon = key === "ALL" ? Layers : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].icon;
              const activeClass = key === "ALL"
                ? "bg-quantum-900/50 border-quantum-600/60 text-quantum-300 scale-105"
                : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].tabActive;
              const idleClass = key === "ALL"
                ? "bg-quantum-950/20 border-quantum-900/40 text-quantum-500 hover:border-quantum-700/60"
                : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].tabIdle;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${isActive ? activeClass : idleClass}`}
                >
                  <Icon className="w-4 h-4" />
                  {key === "ALL" ? "All Posts" : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].label}
                  <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${isActive ? "bg-white/20" : "bg-white/10"}`}>
                    {counts[key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Featured post */}
          {featured && (() => {
            const cfg = typeConfig[featured.type] ?? typeConfig.RESEARCH;
            return (
              <Link href={`/research/${featured.slug}`} className="group block mb-10">
                <div className={`p-8 md:p-10 rounded-2xl border ${cfg.cardBorder} ${cfg.cardBg} bg-gradient-to-br from-quantum-950/60 to-quantum-900/20 hover:scale-[1.005] transition-all duration-300`}
                  style={{ boxShadow: `0 0 60px ${cfg.glow}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
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
            );
          })()}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => {
                const cfg = typeConfig[post.type] ?? typeConfig.RESEARCH;
                return (
                  <Link key={post.id} href={`/research/${post.slug}`} className="group">
                    <div className={`p-6 rounded-xl border ${cfg.cardBorder} ${cfg.cardBg} bg-card hover:scale-[1.01] transition-all duration-200 h-full flex flex-col`}>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">{formatDate(post.createdAt)}</span>
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

          {visible.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">No posts match this filter.</div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-10 rounded-2xl border border-white/10 bg-card relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-quantum-600/8 blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">
                Collaborate on <span className="gradient-text">Research</span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                We welcome academic partnerships and joint research programs. Reach out to discuss
                co-authorship, dataset sharing, and grant applications.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all shadow-lg shadow-quantum-900/30"
              >
                Partner with BF-Q Research <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
