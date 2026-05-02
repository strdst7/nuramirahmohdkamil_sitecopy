"use client";

import { useState, useCallback, FormEvent } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { DripBorder } from "@/components/DripBorder";
import { PulseButton } from "@/components/PulseButton";
import { Icon } from "@/components/Icon";

type Intent = "white-label" | "update-notification" | "beta-access";

interface FormState {
  project_name: string;
  email: string;
  whatsapp: string;
  intent: Intent | "";
}

interface FieldErrors {
  project_name?: string;
  email?: string;
  whatsapp?: string;
  intent?: string;
}

const validate = (data: FormState): FieldErrors => {
  const errors: FieldErrors = {};
  if (!data.project_name.trim()) {
    errors.project_name = "Project name is required";
  } else if (data.project_name.length > 200) {
    errors.project_name = "Project name must be under 200 characters";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (data.whatsapp && !/^\+?[\d\s\-()]{7,20}$/.test(data.whatsapp)) {
    errors.whatsapp = "Invalid WhatsApp number";
  }
  if (!data.intent) {
    errors.intent = "Please select an intent";
  }
  return errors;
};

export function LeadCaptureForm() {
  const [formData, setFormData] = useState<FormState>({
    project_name: "",
    email: "",
    whatsapp: "",
    intent: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const errors = validate(formData);
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setIsSubmitting(true);
      setServerError(null);

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_name: formData.project_name.trim(),
            email: formData.email.trim() || undefined,
            whatsapp: formData.whatsapp.trim() || undefined,
            intent: formData.intent,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          if (err.fieldErrors) {
            setFieldErrors(err.fieldErrors as FieldErrors);
          } else {
            throw new Error(err.error || "Failed to submit lead");
          }
          return;
        }

        setIsSuccess(true);
      } catch (error) {
        setServerError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ project_name: "", email: "", whatsapp: "", intent: "" });
    setFieldErrors({});
  };

  if (isSuccess) {
    return (
      <GlassPanel className="rounded-[2rem] p-10 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <Icon
          name="check_circle"
          size={48}
          fill={1}
          className="text-primary mb-4"
        />
        <h3 className="font-headline-md text-headline-md text-primary mb-2">
          Lead Captured
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant opacity-80">
          Your intent has been recorded in the aether. We&apos;ll reach out when
          the alchemy is ready.
        </p>
        <button
          onClick={handleReset}
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors mt-6"
        >
          Transmute Another Lead
        </button>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="rounded-[2rem] p-fluid-gap flex flex-col gap-10">
      <form onSubmit={handleSubmit} noValidate>
        {serverError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20 mb-4">
            <Icon name="pest_control" size={16} className="text-error" />
            <p className="font-body-md text-body-md text-error">
              {serverError}
            </p>
            <button
              type="button"
              onClick={() => setServerError(null)}
              className="ml-auto text-error hover:text-error/70 transition-colors"
              aria-label="Dismiss error"
            >
              <Icon name="memory" size={14} className="text-error" />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {/* Project Name */}
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
              <Icon name="person" size={16} /> WHITE-LABEL PROJECT NAME
            </label>
            <DripBorder
              type="text"
              value={formData.project_name}
              onChange={(e) =>
                handleFieldChange("project_name", e.target.value)
              }
              placeholder="What shall we transmute?"
              className="w-full"
            />
            {fieldErrors.project_name && (
              <p className="font-label-sm text-label-sm text-error ml-4">
                {fieldErrors.project_name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
              <Icon name="mail" size={16} /> EMAIL (OPTIONAL)
            </label>
            <DripBorder
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="Where shall we send word?"
              className="w-full"
            />
            {fieldErrors.email && (
              <p className="font-label-sm text-label-sm text-error ml-4">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
              <Icon name="chat" size={16} /> WHATSAPP (OPTIONAL)
            </label>
            <DripBorder
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
              placeholder="A number for swift contact"
              className="w-full"
            />
            {fieldErrors.whatsapp && (
              <p className="font-label-sm text-label-sm text-error ml-4">
                {fieldErrors.whatsapp}
              </p>
            )}
          </div>

          {/* Intent */}
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
              <Icon name="flag" size={16} /> INTENT
            </label>
            <div className="relative">
              <select
                value={formData.intent}
                onChange={(e) => handleFieldChange("intent", e.target.value)}
                className="w-full border-0 border-b border-outline-variant/40 bg-transparent pb-2 text-on-surface focus:border-b-primary focus:outline-none focus:ring-0 transition-all duration-300 font-body-md text-body-md appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-surface-container">
                  SELECT INTENT
                </option>
                <option
                  value="white-label"
                  className="bg-surface-container text-on-surface"
                >
                  White-Label — Rebrand the playground
                </option>
                <option
                  value="update-notification"
                  className="bg-surface-container text-on-surface"
                >
                  Update Notification — Get notified of new tools
                </option>
                <option
                  value="beta-access"
                  className="bg-surface-container text-on-surface"
                >
                  Beta Access — Early access to experimental features
                </option>
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
            {fieldErrors.intent && (
              <p className="font-label-sm text-label-sm text-error ml-4">
                {fieldErrors.intent}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-2">
            <PulseButton type="submit" disabled={isSubmitting}>
              <span className="flex items-center gap-2">
                Transmit Intent <Icon name="send" size={18} />
              </span>
            </PulseButton>
          </div>
        </div>
      </form>
    </GlassPanel>
  );
}
