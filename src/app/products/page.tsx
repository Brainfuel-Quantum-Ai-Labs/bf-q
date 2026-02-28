import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { staticProducts } from "@/lib/static-data";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore BrainFuel Quantum AI Labs products — AI platforms, blockchain SDKs, developer tools, and security solutions.",
};

export const dynamic = "force-dynamic";

const categoryGradients: Record<string, string> = {
  "AI Platform": "from-quantum-800 to-quantum-600",
  Blockchain: "from-green-900 to-green-700",
  "Developer Tools": "from-purple-900 to-purple-700",
  Security: "from-red-900 to-red-700",
};

const categoryBorders: Record<string, string> = {
  "AI Platform": "border-quantum-800/40 hover:border-quantum-600/60",
  Blockchain: "border-green-800/40 hover:border-green-600/60",
  "Developer Tools": "border-purple-800/40 hover:border-purple-600/60",
  Security: "border-red-800/40 hover:border-red-600/60",
};

const categoryIconColors: Record<string, string> = {
  "AI Platform": "text-quantum-400",
  Blockchain: "text-green-400",
  "Developer Tools": "text-purple-400",
  Security: "text-red-400",
};

export default async function ProductsPage() {
  let dbProducts: { id: string; title: string; slug: string; category: string; summary: string }[] =
    [];
  try {
    dbProducts = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    // DB not connected in build/preview
  }

  // Use DB data if available, otherwise use rich static fallback.
  const products =
    dbProducts.length > 0
      ? dbProducts.map((p) => ({
          ...p,
          features: staticProducts.find((s) => s.slug === p.slug)?.features ?? [],
          links: staticProducts.find((s) => s.slug === p.slug)?.links ?? [],
        }))
      : staticProducts.map((p) => ({ ...p }));

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-quantum-600/8 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-quantum-700/50 bg-quantum-950/50 text-quantum-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-quantum-400 animate-pulse" />
              Production-Ready Tools
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready tools, platforms, and SDKs built for the quantum-AI era. Each product
              is battle-tested, enterprise-grade, and designed to ship.
            </p>
          </div>

          {/* Category tabs overview */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  categoryBorders[cat] ?? "border-white/10 hover:border-white/20"
                } ${categoryIconColors[cat] ?? "text-muted-foreground"} bg-transparent`}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Products by category */}
          {categories.map((cat) => (
            <div
              key={cat}
              id={cat.toLowerCase().replace(/\s+/g, "-")}
              className="mb-20 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-8 pb-3 border-b border-white/10">
                <h2
                  className={`text-xl font-semibold ${categoryIconColors[cat] ?? "text-quantum-400"}`}
                >
                  {cat}
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {products
                  .filter((p) => p.category === cat)
                  .map((product) => {
                    const sp = staticProducts.find((s) => s.slug === product.slug);
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group block"
                      >
                        <div
                          className={`rounded-2xl border overflow-hidden h-full transition-all duration-200 group-hover:scale-[1.01] ${
                            categoryBorders[cat] ?? "border-white/10"
                          } bg-card`}
                        >
                          {/* Card header gradient */}
                          <div
                            className={`h-32 bg-gradient-to-br ${
                              categoryGradients[cat] ?? "from-quantum-800 to-quantum-600"
                            } relative`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                              <span className="text-white text-7xl font-black">BF-Q</span>
                            </div>
                            <div className="absolute top-4 left-4">
                              <Badge variant="quantum" className="bg-black/40 border-white/20 text-white">
                                {product.category}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/30 text-white/60 group-hover:text-white transition-colors">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Card body */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-quantum-300 transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                              {product.summary}
                            </p>

                            {/* Feature highlights */}
                            {sp && sp.features.length > 0 && (
                              <ul className="space-y-1.5 mb-5">
                                {sp.features.slice(0, 4).map((f) => (
                                  <li
                                    key={f}
                                    className="flex items-center gap-2 text-xs text-muted-foreground"
                                  >
                                    <CheckCircle2
                                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                                        categoryIconColors[cat] ?? "text-quantum-400"
                                      }`}
                                    />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Links */}
                            {sp && sp.links.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {sp.links.map((link) => (
                                  <span
                                    key={link}
                                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                                      categoryIconColors[cat] ?? "text-quantum-400"
                                    }`}
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    {link.replace(/^https?:\/\//, "")}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-8 text-center p-12 rounded-2xl border border-quantum-800/30 bg-quantum-950/20">
            <h2 className="text-2xl font-bold mb-3">
              Need a <span className="gradient-text">Custom Solution</span>?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our products can be white-labelled, extended, or combined. Talk to our team about
              tailored enterprise deployments.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all"
            >
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
