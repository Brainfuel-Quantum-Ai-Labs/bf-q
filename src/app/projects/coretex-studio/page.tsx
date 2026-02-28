import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Users, Cpu, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Coretex Studio | AI-Powered Creative & Developer Platform | BrainFuel Quantum AI Labs",
  description:
    "Coretex Studio is an advanced AI-powered creative and development platform by BrainFuel Quantum AI Labs, enabling intelligent digital design, automation, and scalable software ecosystems.",
};

const features = [
  {
    title: "AI Visual Content Generation",
    description: "Generate high-quality images, illustrations, and design assets using generative AI models tuned for professional workflows.",
    icon: Zap,
    color: "text-violet-500",
    border: "border-violet-200",
    bg: "bg-violet-50",
  },
  {
    title: "Brand Identity & Media Creation",
    description: "Build cohesive brand identities with AI-assisted logo design, colour palettes, and multimedia asset pipelines.",
    icon: Zap,
    color: "text-indigo-500",
    border: "border-indigo-200",
    bg: "bg-indigo-50",
  },
  {
    title: "UI/UX Design & Prototyping",
    description: "Design and interactively prototype user interfaces with AI layout suggestions and component generation.",
    icon: Cpu,
    color: "text-blue-500",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  {
    title: "API & Workflow Simulation",
    description: "Simulate backend API flows, model data contracts, and explore endpoints without leaving the studio environment.",
    icon: Cpu,
    color: "text-sky-500",
    border: "border-sky-200",
    bg: "bg-sky-50",
  },
  {
    title: "Automated Marketing Content",
    description: "Generate on-brand marketing copy, social media assets, and campaign materials at scale using AI-driven templates.",
    icon: Zap,
    color: "text-purple-500",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  {
    title: "Developer Sandbox & Endpoint Explorer",
    description: "Experiment with APIs, run sandboxed code snippets, and explore integrations directly from the studio dashboard.",
    icon: Cpu,
    color: "text-fuchsia-500",
    border: "border-fuchsia-200",
    bg: "bg-fuchsia-50",
  },
  {
    title: "AI-Assisted Product Mockups",
    description: "Rapidly create photorealistic product mockups and renders using AI, reducing prototyping time from days to minutes.",
    icon: Zap,
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
  },
  {
    title: "Cloud Deployment Integration",
    description: "Deploy creative and software artefacts directly to cloud environments with built-in CI/CD pipeline support.",
    icon: Cpu,
    color: "text-indigo-600",
    border: "border-indigo-200",
    bg: "bg-indigo-50",
  },
];

const audiences = [
  { label: "Startups", description: "Move fast with AI-powered design and development tooling from day one.", icon: "🚀" },
  { label: "Developers", description: "Accelerate prototyping with sandbox tools, API explorers, and code generation.", icon: "💻" },
  { label: "Creative Agencies", description: "Deliver brand identities and media campaigns with intelligent creative tools.", icon: "🎨" },
  { label: "Enterprises", description: "Scale content production and software delivery with automated AI pipelines.", icon: "🏢" },
  { label: "Content Creators", description: "Produce high-quality visual and media content with minimal manual effort.", icon: "✨" },
];

const techStack = [
  { name: "Next.js / React", description: "Modern, performant frontend framework for interactive studio interfaces." },
  { name: "Node.js / Fastify", description: "High-throughput backend for real-time API and workflow processing." },
  { name: "PostgreSQL", description: "Reliable relational database for project state and asset management." },
  { name: "AI Integration Layer", description: "Modular connectors for generative AI models and inference APIs." },
  { name: "Cloud-ready Microservices", description: "Container-native architecture deployable on AWS, GCP, and Azure." },
];

export default function CoretexStudioPage() {
  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-50/40 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          {/* Hero */}
          <div className="rounded-2xl border border-violet-800/30 overflow-hidden mb-10 bg-gradient-to-br from-violet-700 to-indigo-600">
            <div className="p-10 md:p-14 relative">
              <div className="absolute inset-0 flex items-center justify-end pr-10 opacity-10 overflow-hidden">
                <span className="text-white text-[10rem] font-black leading-none">BF-Q</span>
              </div>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="quantum" className="bg-black/30 border-white/20 text-white">
                    AI Platform
                  </Badge>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Active · In Development
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Coretex Studio</h1>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                  AI-Powered Creative &amp; Developer Studio Platform — a next-generation intelligent
                  studio ecosystem that combines generative AI, interactive development tools, and
                  digital content creation systems into a unified creative environment.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["AI", "Creative", "Developer Platform"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="p-8 rounded-2xl border border-violet-800/20 bg-card mb-10">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Coretex Studio is a next-generation intelligent studio ecosystem that combines generative
              AI, interactive development tools, digital content creation systems, and automation
              frameworks into a unified creative environment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are shipping a product, building a brand, or scaling a software platform,
              Coretex Studio provides the AI-assisted tooling to move from concept to deployment
              faster than ever before.
            </p>
          </div>

          {/* Feature grid */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              Core <span className="gradient-text">Capabilities</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`p-5 rounded-xl border ${feature.border} ${feature.bg} transition-all duration-200 hover:scale-[1.01]`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-white/70 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target audience */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              Who It <span className="gradient-text">Empowers</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {audiences.map((a) => (
                <div key={a.label} className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-violet-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{a.icon}</span>
                    <h3 className="font-semibold">{a.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology stack */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              Technology <span className="gradient-text">Stack</span>
            </h2>
            <div className="rounded-2xl border border-violet-800/20 bg-card overflow-hidden divide-y divide-border">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-start gap-4 p-5 hover:bg-muted/30 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm">{tech.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-10 rounded-2xl border border-violet-800/20 bg-gradient-to-br from-violet-50 to-indigo-50 text-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-[8rem] font-black text-violet-900">BF-Q</span>
            </div>
            <div className="relative">
              <Users className="w-8 h-8 text-violet-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">
                Partner, <span className="gradient-text">Explore</span>, or Integrate
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Coretex Studio is actively being developed. Whether you want to partner, join an early
                access programme, or explore enterprise integrations — we would love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold hover:from-violet-500 hover:to-indigo-400 transition-all shadow-lg"
                >
                  Contact Us <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-violet-300 text-violet-700 font-semibold hover:bg-violet-50 transition-colors"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
