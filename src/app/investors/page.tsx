import type { Metadata } from "next";
import { ArrowRight, TrendingUp, Shield, Globe, DollarSign } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "BrainFuel Quantum AI Labs investment thesis, governance framework, and how to engage with our investor relations team.",
};

export default function InvestorsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-quantum-600/8 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <TrendingUp className="w-3 h-3" /> Investor Relations
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Invest in the <span className="gradient-text">Quantum Future</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              BrainFuel Quantum AI Labs is building infrastructure for the post-classical computing
              era. We invite forward-thinking investors to join us at the frontier.
            </p>
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
              <div key={title} className="p-8 rounded-xl border border-white/10 bg-card">
                <Icon className="w-8 h-8 text-quantum-400 mb-4" />
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
          <div className="p-8 md:p-12 rounded-2xl border border-quantum-800/40 bg-quantum-950/20">
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
                  <p className="font-semibold text-quantum-300">{value}</p>
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
