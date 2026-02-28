import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { staticProducts } from "@/lib/static-data";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = staticProducts.find((p) => p.slug === slug);
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) return { title: product.title, description: product.summary };
  } catch {
    // DB not available
  }
  if (sp) return { title: sp.title, description: sp.summary };
  return { title: "Product" };
}

const categoryBorderColors: Record<string, string> = {
  "AI Platform": "border-quantum-800/40",
  Blockchain: "border-green-800/40",
  "Developer Tools": "border-purple-800/40",
  Security: "border-red-800/40",
};

const categoryIconColors: Record<string, string> = {
  "AI Platform": "text-quantum-400",
  Blockchain: "text-green-400",
  "Developer Tools": "text-purple-400",
  Security: "text-red-400",
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // Prefer DB data, fall back to static data.
  let dbProduct: {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string;
    links: string[];
    createdAt: Date;
  } | null = null;
  try {
    dbProduct = await prisma.product.findUnique({ where: { slug } });
  } catch {
    // DB not available
  }

  const sp = staticProducts.find((p) => p.slug === slug);

  if (!dbProduct && !sp) {
    // Dynamic import to avoid issues during static generation
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const product = dbProduct ?? sp!;
  const borderColor = categoryBorderColors[product.category] ?? "border-white/10";
  const iconColor = categoryIconColors[product.category] ?? "text-quantum-400";

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          {/* Hero */}
          <div
            className={`rounded-2xl border ${borderColor} overflow-hidden mb-10 bg-gradient-to-br ${sp?.gradient ?? "from-quantum-800 to-quantum-600"}`}
          >
            <div className="p-10 md:p-14 relative">
              <div className="absolute inset-0 flex items-center justify-end pr-10 opacity-10 overflow-hidden">
                <span className="text-white text-[10rem] font-black leading-none">BF-Q</span>
              </div>
              <div className="relative">
                <Badge variant="quantum" className="bg-black/30 border-white/20 text-white mb-4">
                  {product.category}
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{product.title}</h1>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{product.summary}</p>
                {product.links && product.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {product.links.map((link) => (
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-white/80 hover:text-white hover:bg-black/40 text-sm transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {link.replace(/^https?:\/\//, "")}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {sp?.description && (
                <div className={`p-8 rounded-2xl border ${borderColor} bg-card`}>
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{sp.description}</p>
                </div>
              )}

              {/* Use Cases */}
              {sp?.useCases && sp.useCases.length > 0 && (
                <div className={`p-8 rounded-2xl border ${borderColor} bg-card`}>
                  <h2 className="text-xl font-semibold mb-5">Use Cases</h2>
                  <ul className="space-y-3">
                    {sp.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-3">
                        <ArrowRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                        <span className="text-muted-foreground">{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Features */}
              {sp?.features && sp.features.length > 0 && (
                <div className={`p-6 rounded-2xl border ${borderColor} bg-card`}>
                  <h2 className="text-lg font-semibold mb-4">Key Features</h2>
                  <ul className="space-y-2.5">
                    {sp.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                        <span className="text-sm text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meta */}
              <div className={`p-6 rounded-2xl border ${borderColor} bg-card`}>
                <h2 className="text-lg font-semibold mb-4">Details</h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className={`font-medium ${iconColor}`}>{product.category}</dd>
                  </div>
                  {"createdAt" in product && product.createdAt && (
                    <div>
                      <dt className="text-muted-foreground">Released</dt>
                      <dd className="font-medium">{formatDate(product.createdAt)}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className={`flex items-center justify-between p-6 rounded-2xl border ${borderColor} bg-card hover:border-quantum-600/60 transition-colors group`}
              >
                <div>
                  <p className="font-semibold mb-1">Get Started</p>
                  <p className="text-xs text-muted-foreground">Talk to our product team</p>
                </div>
                <ArrowRight className={`w-5 h-5 ${iconColor} group-hover:translate-x-1 transition-transform`} />
              </Link>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">
              Other <span className="gradient-text">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticProducts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group">
                    <div className="p-5 rounded-xl border border-white/10 bg-card hover:border-quantum-700/40 transition-colors h-full">
                      <Badge variant="quantum" className="mb-3">
                        {p.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-quantum-300 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {p.summary}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
