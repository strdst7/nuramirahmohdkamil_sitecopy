"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GlassPanel } from "@/components/GlassPanel";
import { PulseButton } from "@/components/PulseButton";
import { Icon } from "@/components/Icon";

type PageState =
  | "loading"
  | "confirm"
  | "unsubscribing"
  | "done"
  | "already_unsubscribed"
  | "error";

function LoadingIndicator() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="font-body-md text-body-md text-on-surface-variant animate-pulse">
        Checking your link...
      </p>
    </div>
  );
}

function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [pageState, setPageState] = useState<PageState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  useEffect(() => {
    if (!token || token.length === 0) {
      setPageState("error");
      setErrorMessage(
        "No unsubscribe token found. Check your email link."
      );
      return;
    }

    // Validate UUID format client-side before calling API (per plan)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      setPageState("error");
      setErrorMessage(
        "This link doesn't look right — check your email for the correct link."
      );
      return;
    }

    setPageState("confirm");
  }, [token]);

  const handleUnsubscribe = async () => {
    setIsUnsubscribing(true);
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (data.status === "unsubscribed") {
        setPageState("done");
      } else if (data.status === "already_unsubscribed") {
        setPageState("already_unsubscribed");
      } else {
        setPageState("error");
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch {
      setPageState("error");
      setErrorMessage("The echo is quiet right now. Please try again.");
    } finally {
      setIsUnsubscribing(false);
    }
  };

  // --- LOADING STATE ---
  if (pageState === "loading") {
    return <LoadingIndicator />;
  }

  // --- ERROR STATE (per D-15: friendly, non-technical) ---
  if (pageState === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <GlassPanel className="max-w-lg mx-auto rounded-[2rem] p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-error/5 rounded-full blur-3xl" />
          <Icon
            name="pest_control"
            size={48}
            className="text-error mb-4"
          />
          <h2 className="font-headline-md text-headline-md text-error mb-4">
            This Link Doesn&apos;t Look Right
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 opacity-80">
            {errorMessage}
          </p>
          <PulseButton href="/">Return Home</PulseButton>
        </GlassPanel>
      </div>
    );
  }

  // --- CONFIRM STATE (per D-14: confirmation before acting) ---
  if (pageState === "confirm" || pageState === "unsubscribing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <GlassPanel className="max-w-lg mx-auto rounded-[2rem] p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl" />
          <Icon
            name="blur_circular"
            size={48}
            className="text-tertiary mb-4"
          />
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Leave the Echo?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 opacity-80">
            Are you sure you want to unsubscribe? You&apos;ll stop
            receiving transmissions from the boundary between cognition
            and dreaming.
          </p>
          <div className="flex gap-4 justify-center">
            <PulseButton
              onClick={handleUnsubscribe}
              disabled={isUnsubscribing}
            >
              <span className="flex items-center gap-2">
                {isUnsubscribing
                  ? "Unsubscribing..."
                  : "Yes, Unsubscribe"}{" "}
                <Icon name="east" size={18} />
              </span>
            </PulseButton>
            <PulseButton
              href="/"
              className="bg-surface-container text-on-surface-variant"
            >
              Never Mind
            </PulseButton>
          </div>
        </GlassPanel>
      </div>
    );
  }

  // --- DONE STATE (per Specifics: warm goodbye) ---
  if (pageState === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <GlassPanel className="max-w-lg mx-auto rounded-[2rem] p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <Icon
            name="check_circle"
            size={48}
            fill={1}
            className="text-primary mb-4"
          />
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            You&apos;ve Left the Echo
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 opacity-80">
            Your email has been removed from the newsletter. The door
            remains open if you ever wish to return.
          </p>
          <PulseButton href="/">Return Home</PulseButton>
        </GlassPanel>
      </div>
    );
  }

  // --- ALREADY-UNSUBSCRIBED STATE (per D-15: friendly acknowledgment) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <GlassPanel className="max-w-lg mx-auto rounded-[2rem] p-10 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <Icon
          name="blur_on"
          size={48}
          className="text-secondary mb-4"
        />
        <h2 className="font-headline-md text-headline-md text-secondary mb-4">
          Already Unsubscribed
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 opacity-80">
          You&apos;re already unsubscribed from this newsletter. No
          further action needed.
        </p>
        <PulseButton href="/">Return Home</PulseButton>
      </GlassPanel>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <UnsubscribeForm />
    </Suspense>
  );
}
