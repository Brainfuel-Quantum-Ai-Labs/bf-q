import type { Metadata } from "next";
import { ArrowRight, Code2, Database, Cloud, Layers } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "BrainFuel Quantum AI Labs partnership opportunities — technology integrations, research collaborations, and go-to-market alliances.",
};

const integrations = [
  { name: "AWS", category: "Cloud", href: "https://aws.amazon.com", desc: "Compute, storage & managed quantum" },
  { name: "Google Cloud", category: "Cloud", href: "https://cloud.google.com", desc: "Cloud Run, Vertex AI & Quantum AI" },
  { name: "Microsoft Azure", category: "Cloud", href: "https://azure.microsoft.com", desc: "Azure Quantum & AI services" },
  { name: "IBM Quantum", category: "Quantum", href: "https://quantum.ibm.com", desc: "127+ qubit processors" },
  { name: "IonQ", category: "Quantum", href: "https://ionq.com", desc: "Trapped-ion QPU platform" },
  { name: "Rigetti", category: "Quantum", href: "https://rigetti.com", desc: "Superconducting QPU cloud" },
  { name: "Ethereum", category: "Blockchain", href: "https://ethereum.org", desc: "Smart contracts & EVM ecosystem" },
  { name: "Solana", category: "Blockchain", href: "https://solana.com", desc: "High-throughput L1 chain" },
  { name: "Polygon", category: "Blockchain", href: "https://polygon.technology", desc: "Ethereum L2 & ZK rollups" },
  { name: "PyTorch", category: "AI/ML", href: "https://pytorch.org", desc: "Deep learning framework" },
  { name: "Hugging Face", category: "AI/ML", href: "https://huggingface.co", desc: "Models, datasets & spaces" },
  { name: "NVIDIA CUDA", category: "AI/ML", href: "https://developer.nvidia.com/cuda-zone", desc: "GPU accelerated computing" },
];

const categoryColors: Record<string, string> = {
  Cloud: "text-blue-600 border-blue-200 bg-blue-50",
  Quantum: "text-quantum-600 border-quantum-200 bg-quantum-50",
  Blockchain: "text-green-600 border-green-200 bg-green-50",
  "AI/ML": "text-purple-600 border-purple-200 bg-purple-50",
};

const partnershipTypes = [
  {
    icon: Code2,
    title: "Technology Integration",
    description:
      "Embed BF-Q capabilities into your product stack. Access our APIs, SDKs, and white-label solutions to enhance your offering with quantum AI.",
    cta: "Explore Tech Partnership",
    slug: "tech-integration",
  },
  {
    icon: Database,
    title: "Research Collaboration",
    description:
      "Joint research programs, co-authored publications, and shared IP arrangements for universities and corporate research labs.",
    cta: "Research Partnership",
    slug: "research-collaboration",
  },
  {
    icon: Cloud,
    title: "Cloud Marketplace",
    description:
      "List your solutions on our upcoming marketplace, or integrate BF-Q products into your cloud marketplace for co-sell opportunities.",
    cta: "Marketplace Partner",
    slug: "cloud-marketplace",
  },
  {
    icon: Layers,
    title: "Solution Partner",
    description:
      "Become a certified BF-Q solution partner. Resell, implement, and support BF-Q products with full training and certification.",
    cta: "Become a Partner",
    slug: "solution-partner",
  },
];

const partnerBenefits = [
  { title: "Co-Marketing", desc: "Joint press releases, blog posts, case studies, and conference presence." },
  { title: "Technical Support", desc: "Priority access to engineering support and early access to new APIs." },
  { title: "Revenue Share", desc: "Attractive referral and reseller margins aligned with deal size." },
  { title: "Certification", desc: "Official BF-Q partner badge, training curriculum, and certification exam." },
];

export default function PartnersPage() {
  const categories = [...new Set(integrations.map((i) => i.category))];

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-200 bg-quantum-50 text-quantum-600 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-quantum-400 animate-pulse" />
              Ecosystem Partners
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Partners</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the quantum AI ecosystem together. We collaborate with the world&apos;s
              leading technology providers, researchers, and cloud platforms.
            </p>
          </div>

          {/* Integrations Grid — grouped by category */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Technology <span className="gradient-text">Integrations</span>
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              BF-Q products are built to integrate natively with the tools you already use.
            </p>
            {categories.map((cat) => (
              <div key={cat} className="mb-8">
                <h3 className={`text-sm font-semibold mb-4 ${categoryColors[cat]?.split(" ")[0] ?? "text-muted-foreground"}`}>
                  {cat}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {integrations
                    .filter((i) => i.category === cat)
                    .map(({ name, category, href, desc }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-xl border transition-colors hover:scale-[1.02] duration-200 ${
                          categoryColors[category] ?? "border-white/10 bg-card"
                        }`}
                      >
                        <div className="font-semibold mb-1">{name}</div>
                        <div className="text-xs text-muted-foreground leading-snug">{desc}</div>
                      </a>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Partnership <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Choose the programme that best fits your organisation&apos;s goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnershipTypes.map(({ icon: Icon, title, description, cta, slug }) => (
                <Link
                  key={title}
                  href={`/contact?partnership=${slug}`}
                  className="group block"
                >
                  <div className="p-8 rounded-xl border border-gray-200 bg-white hover:border-quantum-300 shadow-sm transition-colors h-full">
                    <Icon className="w-8 h-8 text-quantum-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-quantum-600 hover:text-quantum-700 font-medium">
                      {cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Partner Benefits */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-3">
                Partner <span className="gradient-text">Benefits</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                All registered partners gain access to a comprehensive set of go-to-market and
                technical resources.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {partnerBenefits.map(({ title, desc }) => (
                <div
                  key={title}
                  className="p-5 rounded-xl border border-gray-200 bg-quantum-50 text-center"
                >
                  <h3 className="font-semibold text-quantum-700 mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
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
