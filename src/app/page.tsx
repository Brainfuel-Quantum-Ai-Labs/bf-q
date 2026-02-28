import { Hero } from "@/components/sections/Hero";
import { TechPillars } from "@/components/sections/TechPillars";
import { ProductSlider } from "@/components/sections/ProductSlider";
import Link from "next/link";
import { ArrowRight, BookOpen, FolderKanban, Users, Handshake } from "lucide-react";
import { staticPosts, staticProjects } from "@/lib/static-data";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

const typeVariants = {
  RESEARCH: "quantum" as const,
  NEWS: "secondary" as const,
  UPDATE: "success" as const,
};

export default function HomePage() {
  const recentPosts = staticPosts.slice(0, 3);
  const activeProjects = staticProjects.filter((p) => p.status === "NOW").slice(0, 3);

  return (
    <>
      <Hero />
      <TechPillars />
      <ProductSlider />

      {/* Recent Research */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Latest <span className="gradient-text">Research</span>
              </h2>
              <p className="text-muted-foreground">
                Publications and insights from the BF-Q research team.
              </p>
            </div>
            <Link
              href="/research"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-quantum-600 hover:text-quantum-700 font-medium"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/research/${post.slug}`} className="group">
                <div className="p-6 rounded-xl border border-gray-200 bg-white hover:border-quantum-300 shadow-sm transition-colors h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={typeVariants[post.type] ?? "quantum"}>
                      {post.type === "RESEARCH" ? "Research" : post.type === "NEWS" ? "News" : "Update"}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-3 group-hover:text-quantum-600 transition-colors flex-grow leading-snug">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-quantum-600 font-medium">
                    Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <Link href="/research" className="text-sm text-quantum-600 hover:text-quantum-700 font-medium">
              View all research →
            </Link>
          </div>
        </div>
      </section>

      {/* Active Projects */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Active <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-muted-foreground">
                What we are actively building right now.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-quantum-600 hover:text-quantum-700 font-medium"
            >
              View roadmap <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <div
                key={project.slug}
                className="p-6 rounded-xl border border-green-200 bg-green-50 hover:border-green-400 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">Active Now</span>
                </div>
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full border border-green-200 bg-green-50 text-green-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Research Library",
                desc: "5 publications on quantum AI, ZKPs, and federated learning.",
                href: "/research",
                color: "text-quantum-600",
                border: "border-gray-200 hover:border-quantum-300",
              },
              {
                icon: FolderKanban,
                title: "Project Roadmap",
                desc: "6 projects across AI, quantum, blockchain & health.",
                href: "/projects",
                color: "text-purple-600",
                border: "border-gray-200 hover:border-purple-300",
              },
              {
                icon: Handshake,
                title: "Partnerships",
                desc: "Integrations with 12 leading cloud, quantum & AI platforms.",
                href: "/partners",
                color: "text-green-600",
                border: "border-gray-200 hover:border-green-300",
              },
            ].map(({ icon: Icon, title, desc, href, color, border }) => (
              <Link key={title} href={href} className="group">
                <div className={`p-6 rounded-xl border ${border} bg-white shadow-sm transition-colors`}>
                  <Icon className={`w-7 h-7 ${color} mb-4`} />
                  <h3 className="font-semibold mb-2 group-hover:text-quantum-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                  <span className={`inline-flex items-center gap-1 text-sm ${color} font-medium mt-4`}>
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-quantum-300 text-quantum-600 font-semibold hover:bg-quantum-50 transition-colors"
            >
              Investor Relations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
