"use client";

import { useState, useEffect } from "react";
import { staticProducts } from "@/lib/static-data";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, CheckCircle2, ExternalLink, Layers } from "lucide-react";

const categoryGradients: Record<string, string> = {
  "AI Platform": "from-quantum-600 to-quantum-500",
  Blockchain: "from-green-600 to-green-500",
  "Developer Tools": "from-purple-600 to-purple-500",
  Security: "from-red-600 to-red-500",
};

const categoryBorders: Record<string, string> = {
  "AI Platform": "border-quantum-200 hover:border-quantum-400 shadow-sm",
  Blockchain: "border-green-200 hover:border-green-400 shadow-sm",
  "Developer Tools": "border-purple-200 hover:border-purple-400 shadow-sm",
  Security: "border-red-200 hover:border-red-400 shadow-sm",
};

const categoryIconColors: Record<string, string> = {
  "AI Platform": "text-quantum-600",
  Blockchain: "text-green-600",
  "Developer Tools": "text-purple-600",
  Security: "text-red-600",
};

const categoryTabActive: Record<string, string> = {
  "AI Platform": "bg-sky-100 border-sky-400 text-sky-700 scale-105",
  Blockchain: "bg-green-100 border-green-400 text-green-700 scale-105",
  "Developer Tools": "bg-purple-100 border-purple-400 text-purple-700 scale-105",
  Security: "bg-red-100 border-red-400 text-red-700 scale-105",
};

const categoryTabIdle: Record<string, string> = {
  "AI Platform": "bg-white border-gray-200 text-gray-600 hover:border-sky-300",
  Blockchain: "bg-white border-gray-200 text-gray-600 hover:border-green-300",
  "Developer Tools": "bg-white border-gray-200 text-gray-600 hover:border-purple-300",
  Security: "bg-white border-gray-200 text-gray-600 hover:border-red-300",
};

const categoryGlow: Record<string, string> = {
  "AI Platform": "rgba(14,165,233,0.14)",
  Blockchain: "rgba(34,197,94,0.14)",
  "Developer Tools": "rgba(168,85,247,0.14)",
  Security: "rgba(239,68,68,0.14)",
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [products, setProducts] = useState(staticProducts);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(
            data.map((p: { id: string; title: string; slug: string; category: string; summary: string }) => ({
              ...p,
              features: staticProducts.find((s) => s.slug === p.slug)?.features ?? [],
              links: staticProducts.find((s) => s.slug === p.slug)?.links ?? [],
              gradient: categoryGradients[p.category] ?? "from-quantum-800 to-quantum-600",
              iconColor: categoryIconColors[p.category] ?? "text-quantum-400",
              description: staticProducts.find((s) => s.slug === p.slug)?.description ?? "",
              useCases: staticProducts.find((s) => s.slug === p.slug)?.useCases ?? [],
              createdAt: new Date(),
            }))
          );
        }
      })
      .catch((err) => { console.warn("Failed to fetch products:", err); });
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const visibleProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category === activeCategory);

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

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {/* All tab */}
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                activeCategory === "ALL"
                  ? "bg-quantum-100 border-quantum-400 text-quantum-700 scale-105"
                  : "bg-white border-gray-200 text-gray-600 hover:border-quantum-300"
              }`}
            >
              <Layers className="w-4 h-4" />
              All Products
              <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${activeCategory === "ALL" ? "bg-white/50" : "bg-gray-100"}`}>
                {products.length}
              </span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? (categoryTabActive[cat] ?? "bg-quantum-100 border-quantum-400 text-quantum-700 scale-105")
                    : (categoryTabIdle[cat] ?? "bg-white border-gray-200 text-gray-600 hover:border-quantum-300")
                }`}
              >
                {cat}
                <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${activeCategory === cat ? "bg-white/50" : "bg-gray-100"}`}>
                  {products.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Products grid */}
          {(activeCategory === "ALL" ? categories : [activeCategory]).map((cat) => {
            const catProducts = visibleProducts.filter((p) => p.category === cat);
            if (catProducts.length === 0) return null;
            return (
              <div key={cat} className="mb-20">
                <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200">
                  <h2 className={`text-xl font-semibold ${categoryIconColors[cat] ?? "text-quantum-600"}`}>
                    {cat}
                  </h2>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    {catProducts.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {catProducts.map((product) => {
                    const sp = staticProducts.find((s) => s.slug === product.slug);
                    const glow = categoryGlow[cat] ?? "rgba(14,165,233,0.08)";
                    return (
                      <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                        <div
                          className={`rounded-2xl border overflow-hidden h-full transition-all duration-300 group-hover:scale-[1.01] card-hover-glow ${
                            categoryBorders[cat] ?? "border-gray-200"
                          } bg-white shadow-sm`}
                          style={{ "--glow-color": glow } as React.CSSProperties}
                        >
                          {/* Card header gradient */}
                          <div className={`h-32 bg-gradient-to-br ${categoryGradients[cat] ?? "from-quantum-600 to-quantum-500"} relative`}>
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
                            <h3 className="text-xl font-bold mb-2 group-hover:text-quantum-600 transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                              {product.summary}
                            </p>

                            {sp && sp.features.length > 0 && (
                              <ul className="space-y-1.5 mb-5">
                                {sp.features.slice(0, 4).map((f) => (
                                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${categoryIconColors[cat] ?? "text-quantum-400"}`} />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {sp && sp.links.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {sp.links.map((link) => (
                                  <span key={link} className={`inline-flex items-center gap-1 text-xs font-medium ${categoryIconColors[cat] ?? "text-quantum-400"}`}>
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
            );
          })}

          {/* CTA */}
          <div className="mt-8 text-center p-12 rounded-2xl border border-gray-200 bg-gray-50 relative overflow-hidden">
            <div className="relative">
              <h2 className="text-2xl font-bold mb-3">
                Need a <span className="gradient-text">Custom Solution</span>?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Our products can be white-labelled, extended, or combined. Talk to our team about
                tailored enterprise deployments.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-quantum-600 to-quantum-500 text-white font-semibold hover:from-quantum-500 hover:to-quantum-400 transition-all shadow-lg"
              >
                Talk to Sales <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
