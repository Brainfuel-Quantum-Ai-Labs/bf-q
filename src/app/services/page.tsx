import type { Metadata } from "next";
import { Brain, Cpu, Link2, Shield, FlaskConical, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "BrainFuel Quantum AI Labs offers AI development, quantum computing, blockchain, cybersecurity, and R&D consulting services.",
};

const services = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    subtitle: "From prototype to production",
    slug: "artificial-intelligence",
    description:
      "Custom LLM fine-tuning, computer vision systems, NLP pipelines, recommendation engines, and AI infrastructure. We design, train, and deploy machine learning systems at enterprise scale.",
    features: [
      "Custom model training & fine-tuning",
      "MLOps infrastructure & CI/CD",
      "Edge AI deployment",
      "Federated learning systems",
      "AI auditing & explainability",
    ],
    gradient: "from-purple-900/40 to-purple-800/20",
    border: "border-purple-800/40 hover:border-purple-600/60",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-950/60",
    ctaColor: "text-purple-400 hover:text-purple-300",
  },
  {
    icon: Cpu,
    title: "Quantum Computing",
    subtitle: "Hybrid quantum-classical solutions",
    slug: "quantum-computing",
    description:
      "Quantum algorithm design, QPU integration, and hybrid computing architectures. We identify where quantum advantage applies in your specific use case and build the integration layer.",
    features: [
      "Quantum circuit optimisation",
      "Variational Quantum Eigensolver (VQE)",
      "Quantum machine learning",
      "QPU cloud provider integration",
      "Quantum error mitigation",
    ],
    gradient: "from-quantum-900/40 to-quantum-800/20",
    border: "border-quantum-800/40 hover:border-quantum-600/60",
    iconColor: "text-quantum-400",
    iconBg: "bg-quantum-950/60",
    ctaColor: "text-quantum-400 hover:text-quantum-300",
  },
  {
    icon: Link2,
    title: "Blockchain & Web3",
    subtitle: "Decentralised architecture",
    slug: "blockchain-web3",
    description:
      "Smart contract development, DeFi protocol engineering, NFT infrastructure, DAO tooling, and quantum-resistant cryptographic protocols for the post-quantum blockchain era.",
    features: [
      "Smart contract auditing & development",
      "DeFi protocol engineering",
      "Zero-knowledge proof systems",
      "Quantum-resistant cryptography",
      "On-chain AI inference",
    ],
    gradient: "from-green-900/40 to-green-800/20",
    border: "border-green-800/40 hover:border-green-600/60",
    iconColor: "text-green-400",
    iconBg: "bg-green-950/60",
    ctaColor: "text-green-400 hover:text-green-300",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    subtitle: "AI-driven defence systems",
    slug: "cybersecurity",
    description:
      "Post-quantum PKI, AI threat detection, zero-trust architecture, penetration testing, and security automation. Future-proofing your security posture against quantum-era adversaries.",
    features: [
      "Post-quantum cryptography migration",
      "AI-driven SIEM & threat hunting",
      "Zero-trust network architecture",
      "Red team / penetration testing",
      "Security automation & orchestration",
    ],
    gradient: "from-red-900/40 to-red-800/20",
    border: "border-red-800/40 hover:border-red-600/60",
    iconColor: "text-red-400",
    iconBg: "bg-red-950/60",
    ctaColor: "text-red-400 hover:text-red-300",
  },
  {
    icon: FlaskConical,
    title: "R&D Consulting",
    subtitle: "Research to product pipeline",
    slug: "rd-consulting",
    description:
      "Embedded research partnerships, technology scouting, proof-of-concept development, and translational R&D that bridges academic breakthroughs with production deployments.",
    features: [
      "Technology feasibility assessment",
      "PoC development & validation",
      "Academic partnership facilitation",
      "IP strategy & patent guidance",
      "Grant writing support",
    ],
    gradient: "from-orange-900/40 to-orange-800/20",
    border: "border-orange-800/40 hover:border-orange-600/60",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-950/60",
    ctaColor: "text-orange-400 hover:text-orange-300",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    subtitle: "Full-stack digital products",
    slug: "web-app-development",
    description:
      "Next.js, React Native, Node.js, and cloud-native platforms. High-performance web applications, mobile apps, and API ecosystems built for global scale and AI integration.",
    features: [
      "Next.js / React / TypeScript",
      "React Native mobile apps",
      "RESTful & GraphQL APIs",
      "Cloud-native architecture",
      "Performance optimisation",
    ],
    gradient: "from-blue-900/40 to-blue-800/20",
    border: "border-blue-800/40 hover:border-blue-600/60",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-950/60",
    ctaColor: "text-blue-400 hover:text-blue-300",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "30-minute session to understand your use case, constraints, and goals.",
  },
  {
    step: "02",
    title: "Technical Assessment",
    desc: "Our engineers analyse feasibility, define scope, and produce a delivery roadmap.",
  },
  {
    step: "03",
    title: "Proposal & SOW",
    desc: "Fixed-price or time-and-materials statement of work with clear milestones.",
  },
  {
    step: "04",
    title: "Delivery & Handover",
    desc: "Agile sprints, weekly demos, full documentation, and knowledge transfer.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-quantum-600/8 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-quantum-400 animate-pulse" />
              End-to-End Technology Services
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end technology services across the full quantum-AI-blockchain stack. We partner
              with enterprises and startups to build what was previously impossible.
            </p>
          </div>

          {/* Service cards (clickable) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {services.map((service) => (
              <Link
                key={service.title}
                href={`/contact?service=${service.slug}`}
                className="group block"
              >
                <div
                  className={`p-8 rounded-2xl border ${service.border} bg-gradient-to-br ${service.gradient} transition-all duration-200 group-hover:scale-[1.01] h-full`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h2 className="text-xl font-bold">{service.title}</h2>
                      <p className={`text-sm ${service.iconColor}`}>{service.subtitle}</p>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:${service.iconColor} group-hover:translate-x-1 transition-all`}
                    />
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${service.iconColor}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-medium ${service.ctaColor}`}
                  >
                    Enquire about this service <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* How we work */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">
                How We <span className="gradient-text">Work</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A clear, predictable engagement process designed for enterprise buyers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="p-6 rounded-xl border border-white/10 bg-card text-center"
                >
                  <div className="text-4xl font-black gradient-text mb-4">{step}</div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 rounded-2xl border border-quantum-800/30 bg-quantum-950/20">
            <h2 className="text-2xl font-bold mb-3">
              Ready to <span className="gradient-text">Get Started</span>?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Ready to explore how we can help your organisation? Schedule a free discovery call.
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
