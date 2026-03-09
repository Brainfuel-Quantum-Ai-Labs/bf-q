import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); },
        remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: "", ...options }); },
      },
    }
  );

  // Verify JWT from Authorization header if present, otherwise use session cookie
  const authHeader = request.headers.get("authorization");
  let user = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    user = data.user;
  } else {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    user = session.user;
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    role: (user.user_metadata?.role as string) ?? "user",
    name: (user.user_metadata?.full_name as string) ?? null,
    createdAt: user.created_at,
  });
}
