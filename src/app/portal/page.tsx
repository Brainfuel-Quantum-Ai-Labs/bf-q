import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, FolderKanban, BookOpen, Settings } from "lucide-react";

export default async function PortalPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/portal/login");

  const user = session.user as { name?: string; email?: string; role?: string; image?: string };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Welcome back, <span className="gradient-text">{user.name ?? "User"}</span>
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          {user.role === "ADMIN" && (
            <Link
              href="/portal/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-quantum-600 hover:bg-quantum-500 text-white text-sm font-medium transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/portal", desc: "Overview" },
            { icon: Package, label: "Products", href: "/products", desc: "Explore products" },
            { icon: FolderKanban, label: "Projects", href: "/projects", desc: "View roadmap" },
            { icon: BookOpen, label: "Research", href: "/research", desc: "Read publications" },
          ].map(({ icon: Icon, label, href, desc }) => (
            <Link key={label} href={href}>
              <div className="p-6 rounded-xl border border-white/10 bg-card hover:border-quantum-700/40 transition-colors group">
                <Icon className="w-6 h-6 text-quantum-400 mb-3" />
                <h3 className="font-semibold group-hover:text-quantum-300 transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Profile Card */}
        <div className="p-8 rounded-2xl border border-white/10 bg-card">
          <div className="flex items-center gap-4 mb-6">
            <Settings className="w-5 h-5 text-quantum-400" />
            <h2 className="text-xl font-semibold">Account Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-medium">{user.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium">{user.email ?? "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Role</p>
              <p className="font-medium">
                <span className="px-2 py-1 text-xs rounded-full bg-quantum-950/60 border border-quantum-800 text-quantum-400">
                  {user.role ?? "USER"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
