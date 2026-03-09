"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/auth/login");
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="pt-16 min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-400 to-quantum-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="border-white/10 hover:bg-white/5">
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-2xl border border-white/10 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-quantum-400" />
              <h2 className="font-semibold">Profile</h2>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-foreground font-medium">ID:</span> {user.id}
              </p>
              <p>
                <span className="text-foreground font-medium">Role:</span>{" "}
                {(user.user_metadata?.role as string) ?? "user"}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-card">
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-quantum-400 hover:text-quantum-300"
              >
                ← Back to home
              </Link>
              <Link
                href="/portal"
                className="block text-sm text-quantum-400 hover:text-quantum-300"
              >
                Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
