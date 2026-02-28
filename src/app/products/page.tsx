import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore BrainFuel Quantum AI Labs products — AI platforms, blockchain SDKs, developer tools, and security solutions.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: { id: string; title: string; slug: string; category: string; summary: string }[] = [];
  try {
    products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    // DB not connected in build/preview
  }

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready tools, platforms, and SDKs built for the quantum-AI era.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">Products loading from database...</p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["BF-Q Inference API", "QuantumLedger SDK", "NeuroCraft Studio", "SecureVault Enterprise"].map((title) => (
                  <div key={title} className="p-6 rounded-xl border border-white/10 bg-card animate-pulse">
                    <div className="h-4 bg-white/10 rounded mb-3 w-1/2" />
                    <div className="h-6 bg-white/10 rounded mb-4" />
                    <div className="h-16 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {categories.map((cat) => (
                <div key={cat} className="mb-16">
                  <h2 className="text-xl font-semibold text-quantum-400 mb-6 border-b border-white/10 pb-3">{cat}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.filter((p) => p.category === cat).map((product) => (
                      <Link key={product.id} href={`/products/${product.slug}`} className="group">
                        <div className="p-6 rounded-xl border border-white/10 bg-card hover:border-quantum-700/50 transition-colors h-full">
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant="quantum">{product.category}</Badge>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-quantum-400 transition-colors" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-quantum-300 transition-colors">{product.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{product.summary}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
