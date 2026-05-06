import { NextRequest } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { sendLeadNotification } from "@/lib/email";

const leadSchema = z.object({
  project_name: z
    .string()
    .min(1, "Project name is required")
    .max(200, "Project name must be under 200 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  whatsapp: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, "Invalid WhatsApp number")
    .optional()
    .or(z.literal("")),
  intent: z.enum(["white-label", "update-notification", "beta-access"], {
    message:
      "Intent must be one of: white-label, update-notification, beta-access",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return Response.json(
        { error: "Validation failed", fieldErrors },
        { status: 400 }
      );
    }

    const { project_name, email, whatsapp, intent } = parsed.data;

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return Response.json(
        { error: "Supabase configuration missing — check environment variables" },
        { status: 500 }
      );
    }

    const { data, error } = await getSupabase()
      .from("playground_leads")
      .insert({
        project_name,
        email: email || null,
        whatsapp: whatsapp || null,
        intent,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Failed to save lead — database error" },
        { status: 500 }
      );
    }

    // Fire-and-forget: notify site owner without blocking response (LEAD-05)
    sendLeadNotification({
      project_name,
      email: email || null,
      whatsapp: whatsapp || null,
      intent,
      submitted_at: new Date().toISOString(),
    }).catch((err) =>
      console.error("Lead notification delivery failed:", err)
    );

    return Response.json({ success: true, lead: data }, { status: 200 });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
