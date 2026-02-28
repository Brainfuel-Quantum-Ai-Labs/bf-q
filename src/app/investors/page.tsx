import type { Metadata } from "next";
import { ArrowRight, TrendingUp, Shield, Globe, DollarSign, BarChart3, Lock, Users, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "BrainFuel Quantum AI Labs investment thesis, governance framework, and how to engage with our investor relations team.",
};

const metrics = [
  { label: "Quantum Computing Market by 2040", value: "$850B", sub: "Projected TAM" },
  { label: "Enterprise AI Spend by 2027", value: "$407B", sub: "SAM within reach" },
  { label: "Products in Development", value: "4+", sub: "Across AI, blockchain & security" },
  { label: "Research Publications", value: "5+", sub: "Peer-reviewed & whitepapers" },
];

const dueDiligence = [
  {
    icon: BarChart3,
    title: "Financial Transparency",
    desc: "Quarterly investor updates with unaudited financials, burn rate, and runway projections.",
  },
  {
    icon: Lock,
    title: "IP Documentation",
    desc: "Full IP register with patent applications, trade secrets policy, and open-source licensing summary.",
  },
  {
    icon: Users,
    title: "Team Profiles",
    desc: "Detailed founder and team CVs, advisor agreements, and equity cap table available under NDA.",
  },
  {
    icon: Zap,
    title: "Technical Deep Dives",
    desc: "Architecture walkthroughs, benchmark datasets, and third-party code audits available on request.",
  },
];

export default function InvestorsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-quantum-50/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-200 bg-quantum-50 text-quantum-600 text-sm mb-6">
              <TrendingUp className="w-3 h-3" /> Investor Relations
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Invest in the <span className="gradient-text">Quantum Future</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              BrainFuel Quantum AI Labs is building infrastructure for the post-classical computing
              era. We invite forward-thinking investors to join us at the frontier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
              >
                Request Investor Deck <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-quantum-300 text-quantum-600 font-semibold hover:bg-quantum-50 transition-colors"
              >
                Read Our Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {metrics.map(({ label, value, sub }) => (
              <div key={label} className="p-6 rounded-xl border border-gray-200 bg-white text-center shadow-sm">
                <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                <div className="text-xs text-quantum-600 font-medium mb-1">{sub}</div>
                <div className="text-xs text-muted-foreground leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            Investment <span className="gradient-text">Thesis</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Market Timing",
                text: "The quantum computing market is projected to reach $850B by 2040. We are positioned at the earliest infrastructure layer — the highest-leverage investment position.",
              },
              {
                icon: Shield,
                title: "Defensible Moat",
                text: "Our proprietary quantum-classical hybrid middleware and research IP create significant barriers to entry. First-mover advantage in quantum AI tooling for enterprises.",
              },
              {
                icon: Globe,
                title: "Global Addressable Market",
                text: "Every enterprise deploying AI today will need quantum-ready infrastructure within the decade. Our products are designed for global distribution from day one.",
              },
              {
                icon: DollarSign,
                title: "Revenue Model",
                text: "API usage pricing, enterprise SaaS subscriptions, SDK licensing, and R&D consulting engagements provide diversified, recurring revenue streams.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-8 rounded-xl border border-gray-200 bg-white shadow-sm">
                <Icon className="w-8 h-8 text-quantum-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-2xl border border-gray-200 bg-gray-50">
            <h2 className="text-3xl font-bold mb-6">
              Governance &amp; <span className="gradient-text">Transparency</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { label: "Legal Structure", value: "Private Limited Company" },
                { label: "Headquarters", value: "Navi Mumbai, Maharashtra, India" },
                { label: "Stage", value: "Seed / Early Growth" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-sm text-muted-foreground mb-1">{label}</p>
                  <p className="font-semibold text-quantum-700">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We maintain investor-grade transparency with quarterly reporting, open-source
              contributions that demonstrate technical credibility, and a governance framework
              aligned with long-term value creation. Our leadership maintains significant equity
              alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Due Diligence */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Due <span className="gradient-text">Diligence</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are prepared for serious investor scrutiny. Here is what we provide during the due
              diligence process.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dueDiligence.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-quantum-50 border border-quantum-200 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-quantum-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to <span className="gradient-text">Connect</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            We welcome conversations with institutional investors, family offices, and strategic
            partners. Reach out to begin due diligence.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
          >
            Contact Investor Relations <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
