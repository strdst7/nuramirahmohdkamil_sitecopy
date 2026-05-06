import { NextRequest } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

const unsubscribeSchema = z.object({
  token: z.string().uuid("Invalid unsubscribe token"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = unsubscribeSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return Response.json(
        { error: "Invalid token", fieldErrors },
        { status: 400 }
      );
    }

    const { token } = parsed.data;

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return Response.json(
        {
          error:
            "Supabase configuration missing — check environment variables",
        },
        { status: 500 }
      );
    }

    // Per D-09: unsubscribe token is the subscriber's UUID id
    const { data: subscriber, error: lookupError } = await getSupabase()
      .from("newsletter_subscribers")
      .select("id, email, status")
      .eq("id", token)
      .single();

    if (lookupError || subscriber === null) {
      return Response.json(
        {
          error: "not_found",
          message:
            "This link doesn't look right — check your email for the correct link.",
        },
        { status: 404 }
      );
    }

    if (subscriber.status === "unsubscribed") {
      return Response.json(
        {
          status: "already_unsubscribed",
          message: "You're already unsubscribed from this newsletter.",
        },
        { status: 200 }
      );
    }

    // Per D-08: soft delete — set status = 'unsubscribed', preserve row
    const { error: updateError } = await getSupabase()
      .from("newsletter_subscribers")
      .update({
        status: "unsubscribed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", token);

    if (updateError) {
      console.error("Unsubscribe update error:", updateError);
      return Response.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }

    return Response.json(
      {
        status: "unsubscribed",
        message:
          "You've left the echo. You can re-subscribe anytime.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/newsletter/unsubscribe error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
