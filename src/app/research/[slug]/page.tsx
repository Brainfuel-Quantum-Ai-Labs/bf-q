import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return { title: "Post Not Found" };
    return { title: post.title };
  } catch {
    return { title: "Research" };
  }
}

const typeLabels: Record<string, string> = {
  RESEARCH: "Research",
  NEWS: "News",
  UPDATE: "Update",
};

export default async function ResearchPostPage({ params }: Props) {
  const { slug } = await params;
  let post: {
    id: string;
    title: string;
    slug: string;
    type: string;
    content: string;
    createdAt: Date;
  } | null = null;
  try {
    post = await prisma.post.findUnique({ where: { slug } });
  } catch {
    // DB not available
  }

  if (!post) notFound();

  return (
    <div className="pt-16">
      <article className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Research
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="quantum">{typeLabels[post.type] ?? post.type}</Badge>
              <span className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{post.title}</h1>
          </div>

          <div className="prose prose-invert prose-quantum max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-quantum-400">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
