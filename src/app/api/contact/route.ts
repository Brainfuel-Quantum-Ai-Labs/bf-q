import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // In production, integrate an email service (Resend, SendGrid, etc.)
    // For now, log and return success
    console.log("Contact form submission:", {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      messageLength: parsed.data.message.length,
    });

    return NextResponse.json({ success: true, message: "Message received. We will be in touch shortly." });
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
