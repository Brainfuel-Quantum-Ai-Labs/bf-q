"use client";

import { useState } from "react";
import { Target, Eye, Lightbulb, MapPin, Calendar, ArrowRight, Layers, Code2, Users, BookOpen } from "lucide-react";
import Link from "next/link";

const milestones = [
  {
    year: "2023",
    title: "Founded",
    description: "BrainFuel Quantum AI Labs established in Navi Mumbai as a deep-technology research collective focused on quantum-classical hybrid AI.",
  },
  {
    year: "2023",
    title: "First Research Publication",
    description: "Published foundational whitepaper on quantum-classical hybrid architectures, establishing our technical credibility.",
  },
  {
    year: "2024",
    title: "Seed Funding Secured",
    description: "Closed seed round to accelerate product development and expand the engineering team.",
  },
  {
    year: "2024",
    title: "BF-Q Inference API — Beta",
    description: "Launched public beta of our flagship AI inference platform with sub-10 ms latency.",
  },
  {
    year: "2024",
    title: "QuantumLedger SDK v1.0",
    description: "Open-sourced the first post-quantum cryptography SDK for blockchain developers.",
  },
  {
    year: "2025",
    title: "QuantumMind Neural Engine",
    description: "Active development of next-gen hybrid neural engine with QPU-accelerated attention mechanisms.",
  },
];

const techStack = [
  { category: "Quantum", items: ["IBM Quantum", "IonQ", "Rigetti", "Qiskit", "PennyLane", "CUDA Quantum"] },
  { category: "AI / ML", items: ["PyTorch", "JAX", "Hugging Face", "NVIDIA CUDA", "ONNX", "TensorRT"] },
  { category: "Blockchain", items: ["Ethereum", "Solana", "Polygon", "CRYSTALS-Kyber", "ZK-SNARKs", "Foundry"] },
  { category: "Infrastructure", items: ["Kubernetes", "AWS", "GCP", "Terraform", "OpenTelemetry", "Prometheus"] },
];

const values = [
  { title: "First-Principles Thinking", desc: "We decompose every problem to its fundamental truths and reason up from there, never constrained by conventional wisdom." },
  { title: "Radical Transparency", desc: "Open communication with clients, investors, and the broader community — in our research, our roadmap, and our limitations." },
  { title: "Open Collaboration", desc: "We publish research, open-source tools, and partner with academia to compound the pace of discovery." },
  { title: "Responsible AI", desc: "Every system we build is subject to rigorous ethics review, bias auditing, and explainability standards before deployment." },
  { title: "Long-Term Thinking", desc: "We optimise for civilisational impact over quarterly returns. The quantum era requires a decade-long perspective." },
  { title: "Relentless Execution", desc: "Vision without execution is hallucination. We ship, measure, and iterate at pace." },
];

const TABS = [
  { key: "overview", label: "Overview", icon: Layers },
  { key: "story", label: "Story & Founder", icon: Users },
  { key: "milestones", label: "Milestones", icon: Calendar },
  { key: "tech", label: "Tech Stack", icon: Code2 },
  { key: "values", label: "Values", icon: BookOpen },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-quantum-600/8 blur-[140px]" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-purple-900/8 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <MapPin className="w-3 h-3" /> Navi Mumbai, India
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              About <span className="gradient-text">BF-Q Labs</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a deep-technology laboratory on a mission to make quantum-era intelligence
              accessible to enterprises and researchers worldwide.
            </p>
          </div>

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2 mb-12">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  activeTab === key
                    ? "bg-quantum-900/50 border-quantum-600/60 text-quantum-300 scale-105 shadow-lg"
                    : "bg-quantum-950/20 border-quantum-900/40 text-quantum-500 hover:border-quantum-700/60 hover:scale-105"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab: Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "To pioneer the convergence of quantum computing, artificial intelligence, and blockchain — delivering transformative technology infrastructure that empowers the next generation of innovators.",
                  color: "text-quantum-400",
                  bg: "bg-quantum-950/40 border-quantum-800/40",
                  glow: "rgba(14,165,233,0.12)",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "A world where quantum-powered intelligence is as accessible as cloud computing today — where every enterprise can harness the full computational potential of nature itself.",
                  color: "text-purple-400",
                  bg: "bg-purple-950/40 border-purple-800/40",
                  glow: "rgba(168,85,247,0.12)",
                },
                {
                  icon: Lightbulb,
                  title: "Our Values",
                  text: "Radical transparency, first-principles thinking, open collaboration, and an unwavering commitment to the long-term benefit of humanity through responsible AI development.",
                  color: "text-green-400",
                  bg: "bg-green-950/40 border-green-800/40",
                  glow: "rgba(34,197,94,0.12)",
                },
              ].map(({ icon: Icon, title, text, color, bg, glow }) => (
                <div
                  key={title}
                  className={`p-8 rounded-2xl border ${bg} hover:scale-[1.01] transition-all duration-300`}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${glow}`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <Icon className={`w-8 h-8 ${color} mb-4`} />
                  <h2 className="text-xl font-semibold mb-3">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Story & Founder */}
          {activeTab === "story" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  The <span className="gradient-text">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    BrainFuel Quantum AI Labs was founded in Navi Mumbai with a singular conviction:
                    the next great leap in computing would not come from incremental improvements to
                    classical silicon — it would emerge from the intersection of quantum mechanics,
                    machine learning, and decentralised cryptography.
                  </p>
                  <p>
                    Our journey began as a research collective, exploring quantum circuit optimisation
                    and hybrid neural architectures. What started as theoretical exploration quickly
                    evolved into deployable products when we recognised the gap between academic
                    quantum research and enterprise-ready tooling.
                  </p>
                  <p>
                    Today, BF-Q Labs builds the middleware layer between cutting-edge quantum hardware
                    and real-world enterprise applications — making quantum AI accessible without
                    requiring a PhD in physics.
                  </p>
                  <p>
                    With partnerships spanning IIT Bombay, TIFR, and international quantum hardware
                    providers, we are uniquely positioned at the intersection of India&apos;s world-class
                    engineering talent and the global quantum technology ecosystem.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-2xl border border-quantum-800/40 bg-quantum-950/20"
                style={{ boxShadow: "0 0 60px rgba(14,165,233,0.10)" }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-quantum-400 to-quantum-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                    MA
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Mohsin Agwan</h3>
                    <p className="text-quantum-400 text-sm">Founder &amp; CEO</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> Navi Mumbai, India
                    </p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic border-l-2 border-quantum-600 pl-4 mb-6">
                  &quot;We are not just building products — we are building the foundation upon which
                  the next civilisation of intelligent systems will be constructed. The quantum era
                  is not a distant future; it is the work we do today.&quot;
                </blockquote>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-quantum-400 hover:text-quantum-300 font-medium transition-colors"
                >
                  Connect with Mohsin <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Tab: Milestones */}
          {activeTab === "milestones" && (
            <div>
              <h2 className="text-3xl font-bold mb-10">
                Our <span className="gradient-text">Journey</span>
              </h2>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-quantum-500 via-quantum-700 to-quantum-900" />
                <div className="space-y-8">
                  {milestones.map((m, i) => (
                    <div key={m.title} className="relative flex gap-8 items-start">
                      <div className="relative z-10 flex-shrink-0 w-16 flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ${i === milestones.length - 1 ? "bg-quantum-400 border-quantum-400 animate-pulse" : "bg-background border-quantum-600"}`} />
                        <span className="text-xs text-quantum-400 font-bold mt-2">{m.year}</span>
                      </div>
                      <div
                        className="flex-grow p-5 rounded-2xl border border-white/10 bg-card hover:border-quantum-700/50 transition-all duration-200 hover:scale-[1.005]"
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(14,165,233,0.08)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                      >
                        <h3 className="font-semibold mb-1.5">{m.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Tech Stack */}
          {activeTab === "tech" && (
            <div>
              <h2 className="text-3xl font-bold mb-10">
                Technology <span className="gradient-text">Arsenal</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {techStack.map(({ category, items }) => (
                  <div
                    key={category}
                    className="p-6 rounded-2xl border border-white/10 bg-card hover:border-quantum-700/40 transition-all duration-200"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(14,165,233,0.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-quantum-400 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span key={item} className="px-3 py-1.5 text-xs rounded-lg border border-white/10 bg-white/5 font-mono text-muted-foreground hover:border-quantum-700/50 hover:text-foreground transition-colors">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Values */}
          {activeTab === "values" && (
            <div>
              <h2 className="text-3xl font-bold mb-10">
                Our <span className="gradient-text">Values</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {values.map((v, i) => (
                  <div
                    key={v.title}
                    className="p-6 rounded-2xl border border-white/10 bg-card hover:border-quantum-700/40 transition-all duration-200 hover:scale-[1.01]"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(14,165,233,0.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div className="text-3xl font-black gradient-text mb-3">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-12 rounded-3xl border border-quantum-800/30 bg-quantum-950/20 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-quantum-600/10 blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">
                Join the <span className="gradient-text">Quantum Era</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Whether you&apos;re an enterprise looking to adopt quantum AI, an investor, or a
                researcher — we would love to connect.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all shadow-lg shadow-quantum-900/30"
                >
                  Get in Touch <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-sm font-semibold transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
