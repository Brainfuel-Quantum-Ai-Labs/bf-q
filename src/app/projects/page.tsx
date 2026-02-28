import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "BrainFuel Quantum AI Labs projects timeline — active research, next-up development, and pipeline initiatives.",
};

export const dynamic = "force-dynamic";

const statusConfig = {
  NOW: { label: "Active Now", variant: "success" as const, dot: "bg-green-400" },
  NEXT: { label: "Coming Next", variant: "warning" as const, dot: "bg-yellow-400" },
  PIPELINE: { label: "In Pipeline", variant: "quantum" as const, dot: "bg-quantum-400" },
};

export default async function ProjectsPage() {
  let projects: {
    id: string;
    title: string;
    slug: string;
    status: "NOW" | "NEXT" | "PIPELINE";
    summary: string;
    tags: string[];
    createdAt: Date;
  }[] = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    // DB not available
  }

  const grouped = {
    NOW: projects.filter((p) => p.status === "NOW"),
    NEXT: projects.filter((p) => p.status === "NEXT"),
    PIPELINE: projects.filter((p) => p.status === "PIPELINE"),
  };

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A living roadmap of what we are building — from active development to future pipeline
              initiatives.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-sm text-muted-foreground">{cfg.label}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-600 via-yellow-600 to-quantum-600 hidden md:block" />

            <div className="space-y-6">
              {(["NOW", "NEXT", "PIPELINE"] as const).map((status) =>
                grouped[status].map((project, i) => {
                  const cfg = statusConfig[status];
                  return (
                    <div key={project.id} className="relative md:pl-24">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-6 top-8 w-4 h-4 rounded-full ${cfg.dot} ring-4 ring-background hidden md:block`}
                      />

                      <div className="p-6 rounded-xl border border-white/10 bg-card hover:border-quantum-700/30 transition-colors">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <Badge variant={cfg.variant} className="mb-2">
                              {cfg.label}
                            </Badge>
                            <h2 className="text-xl font-semibold">{project.title}</h2>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(project.createdAt)}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {project.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {projects.length === 0 &&
                ["Active Research", "Identity Protocol", "BioSense AI"].map((title, i) => (
                  <div key={i} className="relative md:pl-24">
                    <div className="p-6 rounded-xl border border-white/10 bg-card animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-20 mb-3" />
                      <div className="h-6 bg-white/10 rounded w-2/3 mb-3" />
                      <div className="h-16 bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
