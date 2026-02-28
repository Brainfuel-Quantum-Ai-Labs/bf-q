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
    tabActive: "bg-sky-100 border-sky-400 text-sky-700 scale-105",
    tabIdle: "bg-white border-gray-200 text-gray-600 hover:border-sky-300",
    glow: "rgba(14,165,233,0.08)",
    cardBorder: "border-sky-200 hover:border-sky-400",
    cardBg: "bg-sky-50",
  },
  NEWS: {
    label: "News",
    icon: Newspaper,
    variant: "secondary" as const,
    tabActive: "bg-slate-100 border-slate-400 text-slate-700 scale-105",
    tabIdle: "bg-white border-gray-200 text-gray-600 hover:border-slate-300",
    glow: "rgba(148,163,184,0.08)",
    cardBorder: "border-slate-200 hover:border-slate-400",
    cardBg: "bg-slate-50",
  },
  UPDATE: {
    label: "Update",
    icon: RefreshCw,
    variant: "success" as const,
    tabActive: "bg-green-100 border-green-400 text-green-700 scale-105",
    tabIdle: "bg-white border-gray-200 text-gray-600 hover:border-green-300",
    glow: "rgba(34,197,94,0.08)",
    cardBorder: "border-green-200 hover:border-green-400",
    cardBg: "bg-green-50",
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
      .catch((err) => { console.warn("Failed to fetch posts:", err); });
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
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-200 bg-quantum-50 text-quantum-600 text-sm mb-6">
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
                ? "bg-quantum-100 border-quantum-400 text-quantum-700 scale-105"
                : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].tabActive;
              const idleClass = key === "ALL"
                ? "bg-white border-gray-200 text-gray-600 hover:border-quantum-300"
                : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].tabIdle;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${isActive ? activeClass : idleClass}`}
                >
                  <Icon className="w-4 h-4" />
                  {key === "ALL" ? "All Posts" : typeConfig[key as "RESEARCH"|"NEWS"|"UPDATE"].label}
                  <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${isActive ? "bg-white/50" : "bg-gray-100"}`}>
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
                <div className={`p-8 md:p-10 rounded-2xl border ${cfg.cardBorder} ${cfg.cardBg} bg-white hover:scale-[1.005] transition-all duration-300`}
                  style={{ boxShadow: `0 0 60px ${cfg.glow}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(featured.createdAt)}</span>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-quantum-200 text-quantum-600">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-quantum-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2 max-w-3xl">
                    {featured.content.replace(/[#*>`|]/g, "").slice(0, 220)}…
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-quantum-600 font-medium">
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
                      <h2 className="text-lg font-semibold mb-3 group-hover:text-quantum-600 transition-colors flex-grow">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {post.content.replace(/[#*>`|]/g, "").slice(0, 150)}…
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-quantum-600 font-medium">
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
          <div className="mt-16 text-center p-10 rounded-2xl border border-gray-200 bg-gray-50 relative overflow-hidden">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all shadow-lg"
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
