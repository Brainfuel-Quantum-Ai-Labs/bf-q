import type { Metadata } from "next";
import { ArrowRight, Code2, Database, Cloud, Layers } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "BrainFuel Quantum AI Labs partnership opportunities — technology integrations, research collaborations, and go-to-market alliances.",
};

const integrations = [
  { name: "AWS", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Microsoft Azure", category: "Cloud" },
  { name: "IBM Quantum", category: "Quantum" },
  { name: "IonQ", category: "Quantum" },
  { name: "Rigetti", category: "Quantum" },
  { name: "Ethereum", category: "Blockchain" },
  { name: "Solana", category: "Blockchain" },
  { name: "Polygon", category: "Blockchain" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "Hugging Face", category: "AI/ML" },
  { name: "NVIDIA CUDA", category: "AI/ML" },
];

const partnershipTypes = [
  {
    icon: Code2,
    title: "Technology Integration",
    description:
      "Embed BF-Q capabilities into your product stack. Access our APIs, SDKs, and white-label solutions to enhance your offering with quantum AI.",
    cta: "Explore Tech Partnership",
  },
  {
    icon: Database,
    title: "Research Collaboration",
    description:
      "Joint research programs, co-authored publications, and shared IP arrangements for universities and corporate research labs.",
    cta: "Research Partnership",
  },
  {
    icon: Cloud,
    title: "Cloud Marketplace",
    description:
      "List your solutions on our upcoming marketplace, or integrate BF-Q products into your cloud marketplace for co-sell opportunities.",
    cta: "Marketplace Partner",
  },
  {
    icon: Layers,
    title: "Solution Partner",
    description:
      "Become a certified BF-Q solution partner. Resell, implement, and support BF-Q products with full training and certification.",
    cta: "Become a Partner",
  },
];

export default function PartnersPage() {
  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Partners</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the quantum AI ecosystem together. We collaborate with the world&apos;s
              leading technology providers, researchers, and cloud platforms.
            </p>
          </div>

          {/* Integrations Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Technology <span className="gradient-text">Integrations</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {integrations.map(({ name, category }) => (
                <div
                  key={name}
                  className="p-4 rounded-xl border border-white/10 bg-card hover:border-quantum-700/40 transition-colors text-center"
                >
                  <div className="text-xs text-muted-foreground mb-1">{category}</div>
                  <div className="font-semibold">{name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Partnership <span className="gradient-text">Programs</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnershipTypes.map(({ icon: Icon, title, description, cta }) => (
                <div
                  key={title}
                  className="p-8 rounded-xl border border-white/10 bg-card hover:border-quantum-700/30 transition-colors"
                >
                  <Icon className="w-8 h-8 text-quantum-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-sm text-quantum-400 hover:text-quantum-300 font-medium"
                  >
                    {cta} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
            >
              Start a Partnership Conversation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
