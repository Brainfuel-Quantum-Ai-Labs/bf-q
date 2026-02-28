import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await prisma.product.findUnique({ where: { slug: params.slug } });
    if (!product) return { title: "Product Not Found" };
    return { title: product.title, description: product.summary };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  let product: {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string;
    links: string[];
    createdAt: Date;
  } | null = null;
  try {
    product = await prisma.product.findUnique({ where: { slug: params.slug } });
  } catch {
    // DB not available
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="mb-6">
            <Badge variant="quantum" className="mb-4">
              {product.category}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{product.title}</h1>
            <p className="text-muted-foreground text-sm">Added {formatDate(product.createdAt)}</p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-card mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">{product.summary}</p>
          </div>

          {product.links.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Links</h2>
              <div className="flex flex-wrap gap-3">
                {product.links.map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-quantum-700 text-quantum-400 hover:bg-quantum-950/50 text-sm transition-colors"
                  >
                    {link} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
