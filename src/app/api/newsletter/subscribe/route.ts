import { NextRequest } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { sendSubscribeConfirmation } from "@/lib/email";

const subscribeSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .min(1, "Email is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return Response.json(
        { error: "Validation failed", fieldErrors },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const trimmedEmail = email.trim();

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return Response.json(
        {
          error: "Supabase configuration missing — check environment variables",
        },
        { status: 500 }
      );
    }

    // Check for existing subscriber (per D-08: check status before insert)
    const { data: existing, error: lookupError } = await getSupabase()
      .from("newsletter_subscribers")
      .select("status")
      .eq("email", trimmedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error("Supabase lookup error:", lookupError);
      return Response.json(
        { error: "Failed to check subscription status — database error" },
        { status: 500 }
      );
    }

    if (existing) {
      if (existing.status === "active") {
        return Response.json(
          {
            status: "already_subscribed",
            message: "You're already in the echo",
          },
          { status: 200 }
        );
      }
      // status === 'unsubscribed' — soft block per D-08
      return Response.json(
        {
          status: "previously_unsubscribed",
          message:
            "This email was previously unsubscribed. Contact us to re-subscribe.",
        },
        { status: 200 }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await getSupabase()
      .from("newsletter_subscribers")
      .insert({
        email: trimmedEmail,
        status: "active",
      });

    if (insertError) {
      // Handle race condition: email inserted between our lookup and insert
      if (insertError.code === "23505") {
        return Response.json(
          {
            status: "already_subscribed",
            message: "You're already in the echo",
          },
          { status: 200 }
        );
      }
      console.error("Supabase insert error:", insertError);
      return Response.json(
        { error: "Failed to subscribe — database error" },
        { status: 500 }
      );
    }

    // Fire-and-forget: send confirmation email without blocking response (per D-05)
    sendSubscribeConfirmation(trimmedEmail).catch((err) =>
      console.error("Subscribe confirmation delivery failed:", err)
    );

    return Response.json(
      {
        status: "subscribed",
        message: "Welcome to the echo.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/newsletter/subscribe error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
