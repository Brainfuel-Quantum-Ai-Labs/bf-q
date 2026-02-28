import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Package, FolderKanban, BookOpen, Users } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;

  if (!session || user?.role !== "ADMIN") redirect("/portal");

  let stats = { products: 0, projects: 0, posts: 0, users: 0 };
  let recentProjects: { id: string; title: string; status: string; createdAt: Date }[] = [];

  try {
    const [products, projects, posts, users] = await Promise.all([
      prisma.product.count(),
      prisma.project.count(),
      prisma.post.count(),
      prisma.user.count(),
    ]);
    stats = { products, projects, posts, users };
    recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, status: true, createdAt: true },
    });
  } catch {
    // DB not available
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage all BF-Q Labs content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Package, label: "Products", value: stats.products },
            { icon: FolderKanban, label: "Projects", value: stats.projects },
            { icon: BookOpen, label: "Posts", value: stats.posts },
            { icon: Users, label: "Users", value: stats.users },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-6 rounded-xl border border-white/10 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5 text-quantum-400" />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
              <div className="text-3xl font-bold gradient-text">{value}</div>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="p-8 rounded-2xl border border-white/10 bg-card mb-8">
          <h2 className="text-xl font-semibold mb-6">Recent Projects</h2>
          {recentProjects.length === 0 ? (
            <p className="text-muted-foreground text-sm">No projects found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 font-medium text-muted-foreground">Title</th>
                    <th className="text-left py-3 pr-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 font-medium text-muted-foreground">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/2">
                      <td className="py-3 pr-4 font-medium">{p.title}</td>
                      <td className="py-3 pr-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-quantum-950/60 border border-quantum-800 text-quantum-400">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{formatDate(p.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* API Links */}
        <div className="p-8 rounded-2xl border border-white/10 bg-card">
          <h2 className="text-xl font-semibold mb-6">API Endpoints</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { method: "GET", path: "/api/projects" },
              { method: "POST", path: "/api/projects" },
              { method: "GET", path: "/api/products" },
              { method: "POST", path: "/api/products" },
              { method: "GET", path: "/api/posts" },
              { method: "POST", path: "/api/posts" },
            ].map(({ method, path }) => (
              <div
                key={`${method}-${path}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5 font-mono text-sm"
              >
                <span
                  className={`text-xs font-bold ${method === "GET" ? "text-green-400" : "text-yellow-400"}`}
                >
                  {method}
                </span>
                <span className="text-muted-foreground">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
