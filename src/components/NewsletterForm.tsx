"use client";

import { useState, FormEvent } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { DripBorder } from "@/components/DripBorder";
import { PulseButton } from "@/components/PulseButton";
import { Icon } from "@/components/Icon";

type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "already_subscribed"
  | "previously_unsubscribed"
  | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.status === "subscribed") {
        setStatus("success");
      } else if (data.status === "already_subscribed") {
        setStatus("already_subscribed");
      } else if (data.status === "previously_unsubscribed") {
        setStatus("previously_unsubscribed");
      } else {
        setServerError(data.message || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setServerError("The echo is quiet right now. Try again in a moment.");
      setStatus("error");
    }
  };

  // ── Success state (per D-12 — amber glow) ──
  if (status === "success") {
    return (
      <GlassPanel className="rounded-[2rem] p-10 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <Icon
            name="check_circle"
            size={48}
            fill={1}
            className="text-primary mb-4"
          />
          <h3 className="font-headline-md text-headline-md text-primary mb-2">
            You&apos;re in the Echo
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">
            Welcome. You&apos;ll receive transmissions from the boundary.
          </p>
        </div>
      </GlassPanel>
    );
  }

  // ── Already-subscribed state (per D-12 — ethereal blue) ──
  if (status === "already_subscribed") {
    return (
      <GlassPanel className="rounded-[2rem] p-10 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <Icon name="blur_on" size={48} className="text-secondary mb-4" />
          <h3 className="font-headline-md text-headline-md text-secondary mb-2">
            Already in the Echo
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">
            You&apos;re already part of the frequency. No need to tune in twice.
          </p>
        </div>
      </GlassPanel>
    );
  }

  // ── Previously-unsubscribed state (per D-08 — soft block, tertiary) ──
  if (status === "previously_unsubscribed") {
    return (
      <GlassPanel className="rounded-[2rem] p-10 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <Icon
            name="blur_circular"
            size={48}
            className="text-tertiary mb-4"
          />
          <h3 className="font-headline-md text-headline-md text-tertiary mb-2">
            Echo Faded
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">
            This address previously left the echo. Contact us if you&apos;d like
            to return.
          </p>
        </div>
      </GlassPanel>
    );
  }

  // ── Idle / Error / Submitting states — render the form ──
  return (
    <GlassPanel className="rounded-[2rem] p-fluid-gap flex flex-col gap-6 text-center relative overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        {/* Poetic heading (per CONTEXT.md Specifics) */}
        <h2 className="font-headline-md text-headline-md text-primary mb-2">
          Stay in the Echo
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          Receive occasional transmissions from the boundary between cognition
          and dreaming.
        </p>

        {/* Error message */}
        {serverError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20 mb-4">
            <Icon name="pest_control" size={16} className="text-error" />
            <p className="font-body-md text-body-md text-error">
              {serverError}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <DripBorder
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full max-w-md text-center"
            required
          />
          <PulseButton type="submit" disabled={status === "submitting"}>
            <span className="flex items-center gap-2">
              {status === "submitting" ? "Subscribing..." : "Subscribe"}{" "}
              <Icon name="send" size={18} />
            </span>
          </PulseButton>
        </form>
      </div>
    </GlassPanel>
  );
}
