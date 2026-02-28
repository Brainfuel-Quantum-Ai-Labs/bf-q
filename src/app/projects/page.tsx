import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { staticProjects } from "@/lib/static-data";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "BrainFuel Quantum AI Labs projects timeline — active research, next-up development, and pipeline initiatives.",
};

export const dynamic = "force-dynamic";

const statusConfig = {
  NOW: {
    label: "Active Now",
    variant: "success" as const,
    dot: "bg-green-400",
    ring: "ring-green-900",
    border: "border-green-800/40 hover:border-green-600/60",
    bg: "bg-green-950/10",
    badge: "border-green-700 bg-green-950/50 text-green-400",
    tagColor: "bg-green-950/30 border-green-900/50 text-green-400",
  },
  NEXT: {
    label: "Coming Next",
    variant: "warning" as const,
    dot: "bg-yellow-400",
    ring: "ring-yellow-900",
    border: "border-yellow-800/40 hover:border-yellow-600/60",
    bg: "bg-yellow-950/10",
    badge: "border-yellow-700 bg-yellow-950/50 text-yellow-400",
    tagColor: "bg-yellow-950/30 border-yellow-900/50 text-yellow-400",
  },
  PIPELINE: {
    label: "In Pipeline",
    variant: "quantum" as const,
    dot: "bg-quantum-400",
    ring: "ring-quantum-900",
    border: "border-quantum-800/40 hover:border-quantum-600/60",
    bg: "bg-quantum-950/10",
    badge: "border-quantum-700 bg-quantum-950/50 text-quantum-400",
    tagColor: "bg-quantum-950/30 border-quantum-800/50 text-quantum-400",
  },
};

export default async function ProjectsPage() {
  let dbProjects: {
    id: string;
    title: string;
    slug: string;
    status: "NOW" | "NEXT" | "PIPELINE";
    summary: string;
    tags: string[];
    createdAt: Date;
  }[] = [];
  try {
    dbProjects = await prisma.project.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    // DB not available
  }

  // Use DB data when available, otherwise use rich static fallback.
  const projects = dbProjects.length > 0 ? dbProjects : staticProjects;

  const grouped = {
    NOW: projects.filter((p) => p.status === "NOW"),
    NEXT: projects.filter((p) => p.status === "NEXT"),
    PIPELINE: projects.filter((p) => p.status === "PIPELINE"),
  };

  const totalActive = grouped.NOW.length;
  const totalNext = grouped.NEXT.length;
  const totalPipeline = grouped.PIPELINE.length;

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16">
            {[
              { label: "Active Now", value: totalActive, dot: "bg-green-400" },
              { label: "Coming Next", value: totalNext, dot: "bg-yellow-400" },
              { label: "In Pipeline", value: totalPipeline, dot: "bg-quantum-400" },
            ].map(({ label, value, dot }) => (
              <div
                key={label}
                className="text-center p-4 rounded-xl border border-white/10 bg-card"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <div className="text-3xl font-bold gradient-text">{value}</div>
              </div>
            ))}
          </div>

          {/* Projects by status */}
          {(["NOW", "NEXT", "PIPELINE"] as const).map((status) => {
            const cfg = statusConfig[status];
            const group = grouped[status];
            if (group.length === 0) return null;
            return (
              <div key={status} className="mb-16">
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-8 pb-3 border-b border-white/10">
                  <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                  <h2 className="text-xl font-semibold">{cfg.label}</h2>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-muted-foreground">
                    {group.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.map((project) => (
                    <div
                      key={project.id}
                      className={`p-6 rounded-2xl border transition-colors ${cfg.border} ${cfg.bg}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-grow min-w-0">
                          <Badge variant={cfg.variant} className="mb-2">
                            {cfg.label}
                          </Badge>
                          <h2 className="text-xl font-semibold truncate">{project.title}</h2>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0 mt-1">
                          {formatDate(project.createdAt)}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 text-xs rounded-full border font-medium ${cfg.tagColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          status === "NOW"
                            ? "text-green-400 hover:text-green-300"
                            : status === "NEXT"
                              ? "text-yellow-400 hover:text-yellow-300"
                              : "text-quantum-400 hover:text-quantum-300"
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

          {/* CTA */}
          <div className="text-center p-12 rounded-2xl border border-white/10 bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Interested in <span className="gradient-text">Collaborating</span>?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We partner with enterprises and research institutions at every stage — from active
              projects to early pipeline exploration.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
            >
              Start a Conversation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
