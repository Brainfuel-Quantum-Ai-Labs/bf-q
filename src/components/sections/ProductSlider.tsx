"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "BF-Q Inference API",
    category: "AI Platform",
    slug: "bf-q-inference-api",
    description: "High-throughput REST API for deploying and scaling custom AI models with sub-millisecond latency.",
    gradient: "from-quantum-600 to-quantum-500",
  },
  {
    title: "QuantumLedger SDK",
    category: "Blockchain",
    slug: "quantumledger-sdk",
    description: "Open-source SDK for building quantum-resistant blockchain applications with post-quantum cryptography.",
    gradient: "from-green-600 to-green-500",
  },
  {
    title: "NeuroCraft Studio",
    category: "Developer Tools",
    slug: "neurocraft-studio",
    description: "Visual IDE for designing, training, and deploying neural network architectures with real-time profiling.",
    gradient: "from-purple-600 to-purple-500",
  },
  {
    title: "SecureVault Enterprise",
    category: "Security",
    slug: "securevault-enterprise",
    description: "Enterprise-grade secrets management with AI-driven threat detection and automated certificate lifecycle.",
    gradient: "from-red-600 to-red-500",
  },
  {
    title: "Coretex Studio",
    category: "AI Platform",
    slug: "coretex-studio",
    description: "Advanced AI-driven digital studio platform for creative professionals, developers, and enterprises to build, design, and deploy solutions.",
    gradient: "from-violet-600 to-indigo-500",
  },
];

export function ProductSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Our <span className="gradient-text">Products</span>
            </h2>
            <p className="text-muted-foreground">
              Production-ready tools and platforms built for the quantum era.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product) => (
              <div key={product.slug} className="flex-none w-[320px] sm:w-[380px]">
                <div className="rounded-xl border border-gray-200 overflow-hidden h-full group hover:border-quantum-300 transition-colors">
                  <div className={`h-40 bg-gradient-to-br ${product.gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-6xl font-bold">BF-Q</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-black/30 text-white/80 text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-quantum-600 hover:text-quantum-700 font-medium transition-colors"
                    >
                      Learn more <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
