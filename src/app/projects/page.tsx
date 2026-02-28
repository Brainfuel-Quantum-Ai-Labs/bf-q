"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { staticProjects } from "@/lib/static-data";
import { ArrowRight, Layers, Zap, Clock, Cpu } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  NOW: {
    label: "Active Now",
    variant: "success" as const,
    dot: "bg-green-400",
    border: "border-green-800/40 hover:border-green-600/60",
    bg: "bg-green-950/10",
    tagColor: "bg-green-950/30 border-green-900/50 text-green-400",
    glowColor: "rgba(34,197,94,0.12)",
    tabActive: "bg-green-900/50 border-green-600/60 text-green-300",
    tabIdle: "bg-green-950/20 border-green-900/40 text-green-500 hover:border-green-700/60",
  },
  NEXT: {
    label: "Coming Next",
    variant: "warning" as const,
    dot: "bg-yellow-400",
    border: "border-yellow-800/40 hover:border-yellow-600/60",
    bg: "bg-yellow-950/10",
    tagColor: "bg-yellow-950/30 border-yellow-900/50 text-yellow-400",
    glowColor: "rgba(234,179,8,0.12)",
    tabActive: "bg-yellow-900/50 border-yellow-600/60 text-yellow-300",
    tabIdle: "bg-yellow-950/20 border-yellow-900/40 text-yellow-500 hover:border-yellow-700/60",
  },
  PIPELINE: {
    label: "In Pipeline",
    variant: "quantum" as const,
    dot: "bg-quantum-400",
    border: "border-quantum-800/40 hover:border-quantum-600/60",
    bg: "bg-quantum-950/10",
    tagColor: "bg-quantum-950/30 border-quantum-800/50 text-quantum-400",
    glowColor: "rgba(14,165,233,0.12)",
    tabActive: "bg-quantum-900/50 border-quantum-600/60 text-quantum-300",
    tabIdle: "bg-quantum-950/20 border-quantum-900/40 text-quantum-500 hover:border-quantum-700/60",
  },
};

type StatusKey = "ALL" | "NOW" | "NEXT" | "PIPELINE";

const tabIcons: Record<StatusKey, React.ElementType> = {
  ALL: Layers,
  NOW: Zap,
  NEXT: Clock,
  PIPELINE: Cpu,
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<StatusKey>("ALL");
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (Array.isArray(data) && data.length > 0) setProjects(data); })
      .catch(() => {});
  }, []);

  const counts = {
    ALL: projects.length,
    NOW: projects.filter((p) => p.status === "NOW").length,
    NEXT: projects.filter((p) => p.status === "NEXT").length,
    PIPELINE: projects.filter((p) => p.status === "PIPELINE").length,
  };

  const visible = filter === "ALL" ? projects : projects.filter((p) => p.status === filter);

  const grouped: Record<string, typeof projects> = {
    NOW: visible.filter((p) => p.status === "NOW"),
    NEXT: visible.filter((p) => p.status === "NEXT"),
    PIPELINE: visible.filter((p) => p.status === "PIPELINE"),
  };

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-quantum-600/6 blur-[140px]" />
          <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full bg-green-900/8 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-yellow-900/6 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live Roadmap
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A living roadmap of what we are building — from active development to future pipeline
              initiatives.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(["ALL", "NOW", "NEXT", "PIPELINE"] as StatusKey[]).map((key) => {
              const Icon = tabIcons[key];
              const isActive = filter === key;
              const dotColor =
                key === "ALL" ? "bg-quantum-400" :
                key === "NOW" ? "bg-green-400" :
                key === "NEXT" ? "bg-yellow-400" : "bg-quantum-400";
              const activeClass =
                key === "ALL" ? "bg-quantum-900/50 border-quantum-600/60 text-quantum-300 scale-105" :
                statusConfig[key as "NOW"|"NEXT"|"PIPELINE"]?.tabActive + " scale-105";
              const idleClass =
                key === "ALL" ? "bg-quantum-950/20 border-quantum-900/40 text-quantum-500 hover:border-quantum-700/60" :
                statusConfig[key as "NOW"|"NEXT"|"PIPELINE"]?.tabIdle;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${isActive ? activeClass : idleClass}`}
                >
                  <Icon className="w-4 h-4" />
                  {key === "ALL" ? "All Projects" : statusConfig[key as "NOW"|"NEXT"|"PIPELINE"].label}
                  <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${isActive ? "bg-white/20" : "bg-white/10"}`}>
                    {counts[key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16">
            {[
              { label: "Active Now", value: counts.NOW, dot: "bg-green-400" },
              { label: "Coming Next", value: counts.NEXT, dot: "bg-yellow-400" },
              { label: "In Pipeline", value: counts.PIPELINE, dot: "bg-quantum-400" },
            ].map(({ label, value, dot }) => (
              <div key={label} className="text-center p-4 rounded-xl border border-white/10 bg-card">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <div className="text-3xl font-bold gradient-text">{value}</div>
              </div>
            ))}
          </div>

          {/* Project groups */}
          {(["NOW", "NEXT", "PIPELINE"] as const).map((status) => {
            const cfg = statusConfig[status];
            const group = grouped[status];
            if (group.length === 0) return null;
            return (
              <div key={status} className="mb-16">
                <div className="flex items-center gap-3 mb-8 pb-3 border-b border-white/10">
                  <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                  <h2 className="text-xl font-semibold">{cfg.label}</h2>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-muted-foreground">{group.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.map((project) => (
                    <div
                      key={project.id}
                      className={`p-6 rounded-2xl border transition-all duration-300 ${cfg.border} ${cfg.bg} hover:scale-[1.01]`}
                      style={{ boxShadow: `0 0 0 0 ${cfg.glowColor}` }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${cfg.glowColor}`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-grow min-w-0">
                          <Badge variant={cfg.variant} className="mb-2">{cfg.label}</Badge>
                          <h2 className="text-xl font-semibold truncate">{project.title}</h2>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0 mt-1">
                          {formatDate(project.createdAt)}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{project.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`px-2.5 py-1 text-xs rounded-full border font-medium ${cfg.tagColor}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          status === "NOW" ? "text-green-400 hover:text-green-300" :
                          status === "NEXT" ? "text-yellow-400 hover:text-yellow-300" :
                          "text-quantum-400 hover:text-quantum-300"
                        }`}
                      >
                        {status === "NOW" ? "Get early access" : status === "NEXT" ? "Join waitlist" : "Learn more"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {visible.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">No projects match this filter.</div>
          )}

          {/* CTA */}
          <div className="text-center p-12 rounded-2xl border border-white/10 bg-card relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-quantum-600/8 blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">
                Interested in <span className="gradient-text">Collaborating</span>?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                We partner with enterprises and research institutions at every stage — from active
                projects to early pipeline exploration.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all shadow-lg shadow-quantum-900/30"
              >
                Start a Conversation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
