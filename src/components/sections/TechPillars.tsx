"use client";

import { motion } from "framer-motion";
import { Cpu, Link2, Shield, FlaskConical, Brain, Globe } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Custom LLMs, computer vision, NLP, and ML infrastructure designed for enterprise-scale deployment with unmatched performance.",
    color: "from-purple-600 to-purple-400",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  {
    icon: Cpu,
    title: "Quantum Computing",
    description:
      "Quantum-classical hybrid algorithms and QPU integrations that unlock computational advantages across optimization and simulation.",
    color: "from-quantum-600 to-quantum-400",
    border: "border-quantum-200",
    bg: "bg-quantum-50",
  },
  {
    icon: Link2,
    title: "Blockchain & Web3",
    description:
      "Decentralized protocols, smart contracts, and quantum-resistant cryptography for the next generation of trustless systems.",
    color: "from-green-600 to-green-400",
    border: "border-green-200",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Post-quantum cryptography, AI-driven threat detection, and zero-trust architectures securing the digital frontier.",
    color: "from-red-600 to-red-400",
    border: "border-red-200",
    bg: "bg-red-50",
  },
  {
    icon: FlaskConical,
    title: "Applied Research",
    description:
      "Translating cutting-edge academic breakthroughs into deployable technologies through rigorous applied R&D programs.",
    color: "from-orange-600 to-orange-400",
    border: "border-orange-200",
    bg: "bg-orange-50",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description:
      "Full-stack platforms, mobile applications, and API ecosystems built with modern architectures for global scale.",
    color: "from-blue-600 to-blue-400",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
];

export function TechPillars() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Our <span className="gradient-text">Technology Pillars</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Six domains of deep expertise, unified by a singular mission: building the intelligence
            infrastructure that will power the next era of human progress.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative p-6 rounded-xl border ${pillar.border} ${pillar.bg} group hover:scale-[1.02] transition-transform`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <pillar.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
