import { Resend } from "resend";
import nodemailer from "nodemailer";
import { LeadNotificationEmail } from "@/emails/lead-notification";
import { SubscribeConfirmationEmail } from "@/emails/subscribe-confirmation";

// ─── Lazy-init Resend client ─────────────────────────────────────────────────
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// ─── Lazy-init Nodemailer SMTP transporter ────────────────────────────────────
const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    })
  : null;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadNotificationPayload {
  project_name: string;
  email?: string | null;
  whatsapp?: string | null;
  intent: string;
  submitted_at: string;
}

// ─── HTML fallback for SMTP (no React Email rendering) ────────────────────────

function buildFallbackHtml(lead: LeadNotificationPayload): string {
  const { project_name, email, whatsapp, intent, submitted_at } = lead;
  const formattedDate = new Date(submitted_at).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
    <div style="background-color:#171305;color:#ebe2c8;font-family:system-ui,sans-serif;padding:24px;max-width:600px;margin:0 auto;">
      <div style="border-left:4px solid #ffc66b;padding-left:16px;margin-bottom:24px;">
        <h2 style="color:#ffc66b;font-size:22px;margin-top:0;">New Lead — The Alchemist's Terminal</h2>
      </div>
      <p style="font-size:16px;margin:8px 0;"><strong>Project Name:</strong> ${project_name}</p>
      <p style="font-size:16px;margin:8px 0;"><strong>Email:</strong> ${email || "Not provided"}</p>
      <p style="font-size:16px;margin:8px 0;"><strong>WhatsApp:</strong> ${whatsapp || "Not provided"}</p>
      <p style="font-size:16px;margin:8px 0;"><strong>Intent:</strong> ${intent}</p>
      <p style="font-size:16px;margin:8px 0;"><strong>Submitted:</strong> ${formattedDate}</p>
      <hr style="border-color:#504535;margin:24px 0;" />
      <p style="color:#9d8e7c;font-size:13px;margin-top:24px;">NUR AMIRAH MOHD KAMIL — Portfolio & AI Playground</p>
    </div>
  `;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send a lead notification email to the site owner.
 *
 * Provider selection (per D-01):
 *   1. Resend (primary) — if RESEND_API_KEY is set
 *   2. SMTP (fallback) — if SMTP_HOST is set
 *   3. Skip — if neither is configured
 *
 * Returns `false` on any delivery failure (fire-and-forget per D-04).
 * Never throws — callers can `void sendLeadNotification(...)` without try/catch.
 */
export async function sendLeadNotification(
  lead: LeadNotificationPayload
): Promise<boolean> {
  const { project_name, email, whatsapp, intent, submitted_at } = lead;
  const to = process.env.NOTIFICATION_TO_ADDRESS;

  if (!to) {
    console.warn(
      "Email not configured — NOTIFICATION_TO_ADDRESS is missing. Skipping notification."
    );
    return false;
  }

  try {
    // ── Primary: Resend ──
    if (resend) {
      const from = process.env.RESEND_FROM_ADDRESS;
      if (!from) {
        console.warn(
          "Resend configured but RESEND_FROM_ADDRESS is missing. Falling back to SMTP."
        );
      } else {
        await resend.emails.send({
          from,
          to,
          subject: `New Lead — ${project_name}`,
          react: LeadNotificationEmail({
            project_name,
            email,
            whatsapp,
            intent,
            submitted_at,
          }),
        });
        return true;
      }
    }

    // ── Fallback: SMTP ──
    if (transporter) {
      const html = buildFallbackHtml(lead);
      await transporter.sendMail({
        from: process.env.SMTP_USER || process.env.RESEND_FROM_ADDRESS || to,
        to,
        subject: `New Lead — ${project_name}`,
        html,
      });
      return true;
    }

    console.warn(
      "Email not configured — skipping notification. Set RESEND_API_KEY or SMTP_HOST."
    );
    return false;
  } catch (err) {
    console.error("Email delivery failed:", err);
    return false;
  }
}

/**
 * Send a subscription confirmation email to the subscriber.
 *
 * Provider selection (per D-01):
 *   1. Resend (primary) — if RESEND_API_KEY is set
 *   2. SMTP (fallback) — if SMTP_HOST is set
 *   3. Skip — if neither is configured
 *
 * Returns `false` on any delivery failure (fire-and-forget per D-04).
 * Never throws — callers can `void sendSubscribeConfirmation(...)` without try/catch.
 */
export async function sendSubscribeConfirmation(
  email: string
): Promise<boolean> {
  if (!email) return false;

  try {
    // ── Primary: Resend ──
    if (resend) {
      const from = process.env.RESEND_FROM_ADDRESS;
      if (!from) {
        console.warn(
          "Resend configured but RESEND_FROM_ADDRESS is missing. Falling back to SMTP."
        );
      } else {
        await resend.emails.send({
          from,
          to: email,
          subject: "You're in the echo — Nur Amirah",
          react: SubscribeConfirmationEmail({ email }),
        });
        return true;
      }
    }

    // ── Fallback: SMTP ──
    if (transporter) {
      const html = buildSubscribeConfirmationHtml(email);
      await transporter.sendMail({
        from:
          process.env.SMTP_USER ||
          process.env.RESEND_FROM_ADDRESS ||
          email,
        to: email,
        subject: "You're in the echo — Nur Amirah",
        html,
      });
      return true;
    }

    console.warn(
      "Email not configured — skipping subscribe confirmation. Set RESEND_API_KEY or SMTP_HOST."
    );
    return false;
  } catch (err) {
    console.error("Subscribe confirmation delivery failed:", err);
    return false;
  }
}

// ─── HTML fallback for subscribe confirmation (no React Email rendering) ─────

function buildSubscribeConfirmationHtml(email: string): string {
  return `
    <div style="background-color:#171305;color:#ebe2c8;font-family:system-ui,sans-serif;padding:24px;max-width:600px;margin:0 auto;">
      <div style="border-left:4px solid #ffc66b;padding-left:16px;margin-bottom:24px;">
        <h2 style="color:#ffc66b;font-size:28px;font-weight:700;margin-top:0;">You're in the echo.</h2>
      </div>
      <p style="font-size:16px;margin:8px 0;line-height:1.6;">
        Thank you for subscribing. You'll receive occasional transmissions from
        the boundary between artificial cognition and human dreaming.
      </p>
      <p style="font-size:14px;margin:16px 0;color:#9d8e7c;font-style:italic;">
        Subscribed as: ${email}
      </p>
      <p style="font-size:14px;margin:8px 0;line-height:1.6;">
        If you ever wish to leave the echo, you can unsubscribe at any time.
      </p>
      <p style="color:#9d8e7c;font-size:13px;margin-top:24px;padding-top:16px;border-top:1px solid #504535;">
        NUR AMIRAH MOHD KAMIL — Portfolio &amp; AI Playground
      </p>
    </div>
  `;
}
