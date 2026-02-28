import type { Metadata } from "next";
import { Brain, Cpu, Link2, Shield, FlaskConical, Globe, ArrowRight } from "lucide-react";
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
    border: "border-purple-800/40",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-950/60",
  },
  {
    icon: Cpu,
    title: "Quantum Computing",
    subtitle: "Hybrid quantum-classical solutions",
    description:
      "Quantum algorithm design, QPU integration, and hybrid computing architectures. We identify where quantum advantage applies in your specific use case and build the integration layer.",
    features: [
      "Quantum circuit optimization",
      "Variational Quantum Eigensolver (VQE)",
      "Quantum machine learning",
      "QPU cloud provider integration",
      "Quantum error mitigation",
    ],
    gradient: "from-quantum-900/40 to-quantum-800/20",
    border: "border-quantum-800/40",
    iconColor: "text-quantum-400",
    iconBg: "bg-quantum-950/60",
  },
  {
    icon: Link2,
    title: "Blockchain & Web3",
    subtitle: "Decentralized architecture",
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
    border: "border-green-800/40",
    iconColor: "text-green-400",
    iconBg: "bg-green-950/60",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    subtitle: "AI-driven defense systems",
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
    border: "border-red-800/40",
    iconColor: "text-red-400",
    iconBg: "bg-red-950/60",
  },
  {
    icon: FlaskConical,
    title: "R&D Consulting",
    subtitle: "Research to product pipeline",
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
    border: "border-orange-800/40",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-950/60",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    subtitle: "Full-stack digital products",
    description:
      "Next.js, React Native, Node.js, and cloud-native platforms. High-performance web applications, mobile apps, and API ecosystems built for global scale and AI integration.",
    features: [
      "Next.js / React / TypeScript",
      "React Native mobile apps",
      "RESTful & GraphQL APIs",
      "Cloud-native architecture",
      "Performance optimization",
    ],
    gradient: "from-blue-900/40 to-blue-800/20",
    border: "border-blue-800/40",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-950/60",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end technology services across the full quantum-AI-blockchain stack. We partner
              with enterprises and startups to build what was previously impossible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`p-8 rounded-2xl border ${service.border} bg-gradient-to-br ${service.gradient}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{service.title}</h2>
                    <p className={`text-sm ${service.iconColor}`}>{service.subtitle}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${service.iconBg} ${service.iconColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to explore how we can help your organization?
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
