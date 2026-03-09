"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, LogOut, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [users, setUsers] = useState<{ id: string; email: string; role: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const role = data.user?.user_metadata?.role as string | undefined;
      if (!data.user) {
        router.replace("/auth/login");
        return;
      }
      if (role !== "admin") {
        router.replace("/dashboard");
        return;
      }
      setUser(data.user);
    });
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="pt-16 min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-400 to-quantum-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Admin access
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="border-white/10 hover:bg-white/5">
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-quantum-400" />
            <h2 className="font-semibold">Users</h2>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading users…</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-white/10">
                    <th className="pb-2 pr-4">ID</th>
                    <th className="pb-2 pr-4">Email</th>
                    <th className="pb-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 last:border-0">
                      <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{u.id}</td>
                      <td className="py-2 pr-4">{u.email}</td>
                      <td className="py-2">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
