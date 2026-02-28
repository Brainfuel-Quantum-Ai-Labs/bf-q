import { Hero } from "@/components/sections/Hero";
import { TechPillars } from "@/components/sections/TechPillars";
import { ProductSlider } from "@/components/sections/ProductSlider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechPillars />
      <ProductSlider />

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-quantum-950/30 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build the <span className="gradient-text">Future</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join us in shaping the next era of intelligent systems. Whether you are a partner,
            investor, or enterprise — let&apos;s build something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all glow"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-quantum-700 text-quantum-400 font-semibold hover:bg-quantum-950/50 transition-colors"
            >
              Investor Relations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
