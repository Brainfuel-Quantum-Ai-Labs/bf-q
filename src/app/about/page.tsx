import type { Metadata } from "next";
import { Target, Eye, Lightbulb, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about BrainFuel Quantum AI Labs — our mission, story, and the founder driving the quantum AI revolution from Navi Mumbai, India.",
};

const milestones = [
  {
    year: "2023",
    title: "Founded",
    description:
      "BrainFuel Quantum AI Labs established in Navi Mumbai as a deep-technology research collective focused on quantum-classical hybrid AI.",
  },
  {
    year: "2023",
    title: "First Research Publication",
    description:
      "Published foundational whitepaper on quantum-classical hybrid architectures, establishing our technical credibility.",
  },
  {
    year: "2024",
    title: "Seed Funding Secured",
    description:
      "Closed seed round to accelerate product development and expand the engineering team.",
  },
  {
    year: "2024",
    title: "BF-Q Inference API — Beta",
    description:
      "Launched public beta of our flagship AI inference platform with sub-10 ms latency.",
  },
  {
    year: "2024",
    title: "QuantumLedger SDK v1.0",
    description:
      "Open-sourced the first post-quantum cryptography SDK for blockchain developers.",
  },
  {
    year: "2025",
    title: "QuantumMind Neural Engine",
    description:
      "Active development of next-gen hybrid neural engine with QPU-accelerated attention mechanisms.",
  },
];

const techStack = [
  { category: "Quantum", items: ["IBM Quantum", "IonQ", "Rigetti", "Qiskit", "PennyLane"] },
  { category: "AI / ML", items: ["PyTorch", "JAX", "Hugging Face", "NVIDIA CUDA", "ONNX"] },
  { category: "Blockchain", items: ["Ethereum", "Solana", "Polygon", "CRYSTALS-Kyber", "ZK-SNARKs"] },
  { category: "Infrastructure", items: ["Kubernetes", "AWS", "GCP", "Terraform", "OpenTelemetry"] },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-quantum-600/10 blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
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
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To pioneer the convergence of quantum computing, artificial intelligence, and blockchain — delivering transformative technology infrastructure that empowers the next generation of innovators.",
                color: "text-quantum-400",
                bg: "bg-quantum-950/40 border-quantum-800/40",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "A world where quantum-powered intelligence is as accessible as cloud computing today — where every enterprise can harness the full computational potential of nature itself.",
                color: "text-purple-400",
                bg: "bg-purple-950/40 border-purple-800/40",
              },
              {
                icon: Lightbulb,
                title: "Our Values",
                text: "Radical transparency, first-principles thinking, open collaboration, and an unwavering commitment to the long-term benefit of humanity through responsible AI development.",
                color: "text-green-400",
                bg: "bg-green-950/40 border-green-800/40",
              },
            ].map(({ icon: Icon, title, text, color, bg }) => (
              <div key={title} className={`p-8 rounded-xl border ${bg}`}>
                <Icon className={`w-8 h-8 ${color} mb-4`} />
                <h2 className="text-xl font-semibold mb-3">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              </div>
            </div>

            {/* Founder */}
            <div className="relative">
              <div className="p-8 rounded-2xl border border-quantum-800/40 bg-quantum-950/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-quantum-400 to-quantum-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                    MA
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Mohsin Agwan</h3>
                    <p className="text-quantum-400 text-sm">Founder & CEO</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> Navi Mumbai, India
                    </p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic border-l-2 border-quantum-600 pl-4">
                  &quot;We are not just building products — we are building the foundation upon which
                  the next civilisation of intelligent systems will be constructed. The quantum era
                  is not a distant future; it is the work we do today.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Our <span className="gradient-text">Milestones</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A journey from research collective to enterprise-grade quantum AI platform.
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-quantum-600 to-quantum-900 hidden sm:block" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.title}
                  className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12"
                >
                  {/* Left / Right positioning */}
                  {i % 2 === 0 ? (
                    <>
                      <div className="sm:text-right sm:pr-12">
                        <div className="inline-flex items-center gap-2 text-quantum-400 text-sm font-medium mb-2">
                          <Calendar className="w-3.5 h-3.5 sm:hidden" />
                          {m.year}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                      <div className="hidden sm:flex items-start pl-12">
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-quantum-400 ring-4 ring-background mt-1" />
                        <span className="text-quantum-400 font-bold text-sm">{m.year}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden sm:flex items-start justify-end pr-12">
                        <span className="text-quantum-400 font-bold text-sm">{m.year}</span>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-quantum-400 ring-4 ring-background mt-1" />
                      </div>
                      <div className="sm:pl-12">
                        <div className="inline-flex items-center gap-2 text-quantum-400 text-sm font-medium mb-2">
                          <Calendar className="w-3.5 h-3.5 sm:hidden" />
                          {m.year}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Our <span className="gradient-text">Technology Stack</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Best-in-class tools and platforms across every domain we operate in.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map(({ category, items }) => (
              <div key={category} className="p-6 rounded-xl border border-white/10 bg-card">
                <h3 className="text-sm font-semibold text-quantum-400 mb-4">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-quantum-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us on the <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you want to partner, invest, or just learn more — we would love to connect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-quantum-700 text-quantum-400 font-semibold hover:bg-quantum-950/50 transition-colors"
            >
              Read Our Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
