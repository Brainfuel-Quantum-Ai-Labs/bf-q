"use client";

import { useState } from "react";
import {
  Brain,
  Cpu,
  Link2,
  Shield,
  FlaskConical,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Lock,
  Code2,
  Atom,
  Network,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    subtitle: "From prototype to production",
    slug: "artificial-intelligence",
    description:
      "Custom LLM fine-tuning, computer vision systems, NLP pipelines, recommendation engines, and AI infrastructure at enterprise scale.",
    longDescription:
      "Our AI practice covers the full spectrum — from exploratory research through to production-hardened systems serving millions of inference requests per day. We specialise in large language model fine-tuning on domain-specific corpora, multi-modal architectures, reinforcement learning from human feedback (RLHF), and robust MLOps pipelines that make your models reliable 24/7.",
    technologies: ["PyTorch", "JAX", "TensorFlow", "Hugging Face", "Ray", "Kubeflow", "ONNX", "TensorRT"],
    features: [
      "Custom model training & fine-tuning",
      "MLOps infrastructure & CI/CD",
      "Edge AI deployment",
      "Federated learning systems",
      "AI auditing & explainability",
    ],
    stats: [{ label: "Models Deployed", value: "120+" }, { label: "Avg Latency", value: "<10ms" }, { label: "Uptime SLA", value: "99.99%" }],
    gradient: "from-purple-50 to-white",
    glowColor: "rgba(168,85,247,0.10)",
    border: "border-purple-200 hover:border-purple-400",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    tabBg: "bg-purple-100 border-purple-400 text-purple-700",
    tabActive: "bg-purple-200 border-purple-500 text-purple-800",
    accentDot: "bg-purple-500",
  },
  {
    icon: Cpu,
    title: "Quantum Computing",
    subtitle: "Hybrid quantum-classical solutions",
    slug: "quantum-computing",
    description:
      "Quantum algorithm design, QPU integration, and hybrid computing architectures. We identify where quantum advantage applies and build the integration layer.",
    longDescription:
      "Quantum computing is transitioning from academic curiosity to commercial reality. Our quantum team designs variational quantum algorithms, noise-adaptive circuits, and hybrid quantum-classical pipelines using IBM Quantum, Google Sycamore, IonQ, and Rigetti platforms. We translate your computational bottlenecks — optimisation, simulation, cryptography — into quantum circuits that outperform classical methods today.",
    technologies: ["Qiskit", "Cirq", "PennyLane", "Q#", "Braket SDK", "Rigetti Forest", "IonQ API", "CUDA Quantum"],
    features: [
      "Quantum circuit optimisation",
      "Variational Quantum Eigensolver (VQE)",
      "Quantum machine learning",
      "QPU cloud provider integration",
      "Quantum error mitigation",
    ],
    stats: [{ label: "Algorithms Built", value: "40+" }, { label: "QPU Providers", value: "5" }, { label: "Qubit Range", value: "5–127" }],
    gradient: "from-sky-50 to-white",
    glowColor: "rgba(14,165,233,0.10)",
    border: "border-sky-200 hover:border-sky-400",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    tabBg: "bg-sky-100 border-sky-400 text-sky-700",
    tabActive: "bg-sky-200 border-sky-500 text-sky-800",
    accentDot: "bg-sky-500",
  },
  {
    icon: Link2,
    title: "Blockchain & Web3",
    subtitle: "Decentralised architecture",
    slug: "blockchain-web3",
    description:
      "Smart contract development, DeFi protocol engineering, NFT infrastructure, DAO tooling, and quantum-resistant cryptographic protocols.",
    longDescription:
      "We architect and audit the decentralised systems powering next-generation finance, supply chain, identity, and governance. Our team has shipped DeFi protocols with over $50M TVL, built zero-knowledge proof systems for privacy-preserving transactions, and pioneered post-quantum cryptography integrations that future-proof blockchain infrastructure against quantum attacks.",
    technologies: ["Solidity", "Rust", "Hardhat", "Foundry", "ethers.js", "CRYSTALS-Kyber", "ZK-SNARKs", "Cosmos SDK"],
    features: [
      "Smart contract auditing & development",
      "DeFi protocol engineering",
      "Zero-knowledge proof systems",
      "Quantum-resistant cryptography",
      "On-chain AI inference",
    ],
    stats: [{ label: "Contracts Audited", value: "200+" }, { label: "TVL Secured", value: "$50M+" }, { label: "Chains Supported", value: "12" }],
    gradient: "from-green-50 to-white",
    glowColor: "rgba(34,197,94,0.10)",
    border: "border-green-200 hover:border-green-400",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    tabBg: "bg-green-100 border-green-400 text-green-700",
    tabActive: "bg-green-200 border-green-500 text-green-800",
    accentDot: "bg-green-500",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    subtitle: "AI-driven defence systems",
    slug: "cybersecurity",
    description:
      "Post-quantum PKI, AI threat detection, zero-trust architecture, penetration testing, and security automation.",
    longDescription:
      "The convergence of AI and quantum computing creates unprecedented security challenges. Our red team combines classical penetration testing with AI-driven attack simulation, quantum threat modelling, and automated remediation pipelines. We implement NIST post-quantum cryptography standards (CRYSTALS-Dilithium, SPHINCS+, Kyber) and build zero-trust architectures that assume breach from day one.",
    technologies: ["CRYSTALS-Dilithium", "OpenZiti", "Wazuh", "Falco", "MITRE ATT&CK", "NIST PQC", "Sigma Rules", "eBPF"],
    features: [
      "Post-quantum cryptography migration",
      "AI-driven SIEM & threat hunting",
      "Zero-trust network architecture",
      "Red team / penetration testing",
      "Security automation & orchestration",
    ],
    stats: [{ label: "Vulns Found", value: "1,200+" }, { label: "Certs Held", value: "SOC2, ISO27001" }, { label: "Response Time", value: "<1hr" }],
    gradient: "from-red-50 to-white",
    glowColor: "rgba(239,68,68,0.10)",
    border: "border-red-200 hover:border-red-400",
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    tabBg: "bg-red-100 border-red-400 text-red-700",
    tabActive: "bg-red-200 border-red-500 text-red-800",
    accentDot: "bg-red-500",
  },
  {
    icon: FlaskConical,
    title: "R&D Consulting",
    subtitle: "Research to product pipeline",
    slug: "rd-consulting",
    description:
      "Embedded research partnerships, technology scouting, proof-of-concept development, and translational R&D.",
    longDescription:
      "Cutting-edge research often stalls at the lab-to-production boundary. Our R&D consulting practice embeds senior researchers directly into your team to evaluate emerging technologies, design proof-of-concept experiments, and translate academic papers into production systems. We have active collaborations with IIT Bombay, TIFR, and MIT CSAIL, giving you direct access to frontier research.",
    technologies: ["Python", "Julia", "MATLAB", "LaTeX", "Weights & Biases", "DVC", "MLflow", "ArXiv API"],
    features: [
      "Technology feasibility assessment",
      "PoC development & validation",
      "Academic partnership facilitation",
      "IP strategy & patent guidance",
      "Grant writing support",
    ],
    stats: [{ label: "Papers Published", value: "28" }, { label: "Patents Filed", value: "7" }, { label: "Grants Won", value: "₹4.2Cr" }],
    gradient: "from-orange-50 to-white",
    glowColor: "rgba(249,115,22,0.10)",
    border: "border-orange-200 hover:border-orange-400",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    tabBg: "bg-orange-100 border-orange-400 text-orange-700",
    tabActive: "bg-orange-200 border-orange-500 text-orange-800",
    accentDot: "bg-orange-500",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    subtitle: "Full-stack digital products",
    slug: "web-app-development",
    description:
      "Next.js, React Native, Node.js, and cloud-native platforms. High-performance web apps and API ecosystems built for global scale.",
    longDescription:
      "We build the digital interfaces through which your users experience AI and quantum-powered systems. Our full-stack teams ship production-ready Next.js applications, React Native mobile apps, real-time data dashboards, and cloud-native API backends on AWS, GCP, and Azure. Every product is built with accessibility, Core Web Vitals, and AI-integration readiness at the centre.",
    technologies: ["Next.js 14", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Kubernetes", "Terraform"],
    features: [
      "Next.js / React / TypeScript",
      "React Native mobile apps",
      "RESTful & GraphQL APIs",
      "Cloud-native architecture",
      "Performance optimisation",
    ],
    stats: [{ label: "Apps Shipped", value: "85+" }, { label: "Avg Lighthouse", value: "98/100" }, { label: "Uptime", value: "99.97%" }],
    gradient: "from-blue-50 to-white",
    glowColor: "rgba(59,130,246,0.10)",
    border: "border-blue-200 hover:border-blue-400",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    tabBg: "bg-blue-100 border-blue-400 text-blue-700",
    tabActive: "bg-blue-200 border-blue-500 text-blue-800",
    accentDot: "bg-blue-500",
  },
];

const process = [
  { step: "01", title: "Discovery Call", icon: Sparkles, desc: "30-minute session to understand your use case, constraints, and goals." },
  { step: "02", title: "Technical Assessment", icon: Atom, desc: "Our engineers analyse feasibility, define scope, and produce a delivery roadmap." },
  { step: "03", title: "Proposal & SOW", icon: Network, desc: "Fixed-price or time-and-materials statement of work with clear milestones." },
  { step: "04", title: "Delivery & Handover", icon: Zap, desc: "Agile sprints, weekly demos, full documentation, and knowledge transfer." },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const service = services[activeTab];

  return (
    <div className="pt-16">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-200 bg-quantum-50 text-quantum-600 text-sm mb-6">
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

          {/* Tab navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {services.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? `${s.tabActive} scale-105 shadow-lg`
                    : `${s.tabBg} hover:scale-105`
                }`}
              >
                <s.icon className={`w-4 h-4 ${s.iconColor}`} />
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active service detail panel */}
          <div
            className={`rounded-3xl border ${service.border} bg-gradient-to-br ${service.gradient} mb-16 overflow-hidden transition-all duration-300`}
            style={{ boxShadow: `0 0 80px ${service.glowColor}` }}
          >
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center border ${service.border}`}>
                      <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                      <p className={`text-sm ${service.iconColor}`}>{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">{service.longDescription}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {service.stats.map((stat) => (
                      <div key={stat.label} className="p-3 rounded-xl bg-white border border-gray-200 text-center">
                        <div className={`text-base font-bold ${service.iconColor}`}>{stat.value}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/contact?service=${service.slug}`}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border ${service.border} bg-white hover:bg-gray-50 transition-all text-sm font-semibold ${service.iconColor}`}
                  >
                    Enquire about this service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-2.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${service.iconColor}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      Technologies &amp; Frameworks
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span key={tech} className={`px-3 py-1 text-xs rounded-lg border font-mono font-medium ${service.tabBg}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All services compact grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-8">
              All <span className="gradient-text">Capabilities</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <button
                  key={s.slug}
                  onClick={() => setActiveTab(i)}
                  className={`group text-left p-5 rounded-2xl border transition-all duration-200 bg-gradient-to-br ${s.gradient} ${s.border} ${activeTab === i ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
                  style={activeTab === i ? { boxShadow: `0 0 40px ${s.glowColor}` } : undefined}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <s.icon className={`w-4 h-4 ${s.iconColor}`} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-sm">{s.title}</h3>
                      <p className={`text-xs ${s.iconColor}`}>{s.subtitle}</p>
                    </div>
                    {activeTab === i && <div className={`w-2 h-2 rounded-full ${s.accentDot} animate-pulse flex-shrink-0 mt-1`} />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.description}</p>
                </button>
              ))}
            </div>
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
              {process.map(({ step, title, desc, icon: Icon }) => (
                <div key={step} className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm text-center hover:border-quantum-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-quantum-50 border border-quantum-200 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-quantum-600" />
                  </div>
                  <div className="text-3xl font-black gradient-text mb-3">{step}</div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 rounded-3xl border border-gray-200 bg-gray-50 relative overflow-hidden">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-200 bg-quantum-50 text-quantum-600 text-xs mb-6">
                <Lock className="w-3 h-3" /> Enterprise-grade security &amp; NDAs available
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Ready to <span className="gradient-text">Get Started</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Schedule a free 30-minute discovery call. No commitment required. We&apos;ll assess
                your use case and tell you exactly where we can help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all shadow-lg"
                >
                  Start a Conversation <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-sm font-semibold transition-all"
                >
                  <Code2 className="w-4 h-4 text-muted-foreground" /> View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
