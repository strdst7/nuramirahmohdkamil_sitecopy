"use client";

import { useState, useCallback } from "react";
import { Icon } from "@/components/Icon";
import { GlassPanel } from "@/components/GlassPanel";
import { MeltingShadow } from "@/components/MeltingShadow";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

type Model = "openai" | "gemini";

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<Model>("openai");
  const [temperature, setTemperature] = useState(70);
  const [hallucination, setHallucination] = useState(40);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageData(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleTransmute = useCallback(async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setResponse("");

    const tempValue =
      model === "openai" ? temperature / 50 : temperature / 100;

    try {
      if (model === "openai") {
        const res = await fetch("/api/ai/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: prompt.trim(),
            temperature: tempValue,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "OpenAI request failed");
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream available");

        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            const text = decoder.decode(value, { stream: !done });
            const lines = text.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ") && line !== "data: [DONE]") {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  setResponse((prev) => prev + parsed.content);
                } catch {
                  // Skip malformed chunks
                }
              }
            }
          }
        }
      } else {
        const body: Record<string, unknown> = {
          prompt: prompt.trim(),
          temperature: tempValue,
        };
        if (imageData) {
          body.image = imageData;
        }

        const res = await fetch("/api/ai/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Gemini request failed");
        }

        const data = await res.json();
        setResponse(data.content);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, model, temperature, imageData]);

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-horizon py-12 flex flex-col lg:flex-row gap-fluid-gap">
      {/* Left Sidebar: Alchemist Tool Icons */}
      <aside className="hidden lg:flex flex-col gap-12 items-center w-24 pt-12">
        <GlassPanel className="p-4 flex flex-col gap-8 opacity-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]">
          <button
            className="text-primary hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-in-out p-3 rounded-full bg-surface-container-high/50"
            aria-label="Science — model configuration"
          >
            <Icon name="science" size={32} fill={1} className="text-primary" />
          </button>
          <button
            className="text-on-surface-variant hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-in-out p-3 rounded-full"
            aria-label="Blur circular — randomness settings"
          >
            <Icon name="blur_circular" size={32} className="opacity-60" />
          </button>
          <button
            className="text-on-surface-variant hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-in-out p-3 rounded-full"
            aria-label="Water drop — fluidity control"
          >
            <Icon name="water_drop" size={32} className="opacity-60" />
          </button>
          <button
            className="text-on-surface-variant hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-in-out p-3 rounded-full"
            aria-label="All inclusive — scope expansion"
          >
            <Icon name="all_inclusive" size={32} className="opacity-60" />
          </button>
        </GlassPanel>
      </aside>

      {/* Central Console */}
      <section className="flex-1 flex flex-col gap-fluid-gap relative">
        {/* Ambient glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent blur-3xl -z-10" />

        {/* Header */}
        <header className="ml-8 mb-4">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">
            The Alchemist&apos;s Terminal
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 max-w-2xl italic">
            Distill logic into liquid thought. Transmute parameters to shape the
            emergent reverie.
          </p>
        </header>

        {/* Input Panel */}
        <GlassPanel className="flex flex-col gap-10 rounded-[2rem] p-12">
          {/* Model Selector */}
          <div className="flex gap-drip">
            <button
              onClick={() => setModel("openai")}
              className={`font-label-sm text-label-sm px-6 py-2 rounded-full border transition-all duration-300 ${
                model === "openai"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-transparent text-on-surface-variant border-outline-variant/30 hover:border-primary/50"
              }`}
            >
              OpenAI
            </button>
            <button
              onClick={() => setModel("gemini")}
              className={`font-label-sm text-label-sm px-6 py-2 rounded-full border transition-all duration-300 ${
                model === "gemini"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-transparent text-on-surface-variant border-outline-variant/30 hover:border-primary/50"
              }`}
            >
              Gemini
            </button>
          </div>

          {/* Prime Directive Textarea */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4">
              PRIME DIRECTIVE
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-surface-container/30 border-0 focus:ring-0 text-on-surface font-body-lg text-body-lg p-6 rounded-2xl resize-none border-b-2 border-transparent focus:border-b-primary transition-colors h-32"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ffc66b, #805600)",
                  backgroundSize: "100% 2px",
                  backgroundPosition: "bottom",
                  backgroundRepeat: "no-repeat",
                }}
                placeholder="Whisper your intent into the aether..."
              />
              <div className="absolute right-4 bottom-4 w-4 h-4 rounded-full bg-primary/20 blur-[2px] animate-pulse" />
            </div>
          </div>

          {/* Image Upload (Gemini only) */}
          {model === "gemini" && (
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
                <Icon name="visibility" size={16} /> IMAGE OFFERING
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="font-body-md text-body-md text-on-surface-variant file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:font-label-sm file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:transition-colors file:cursor-pointer"
              />
              {imagePreview && (
                <div className="relative w-32 h-32 mt-2 rounded-xl overflow-hidden border border-outline-variant/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Uploaded image preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setImageData(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                    aria-label="Remove uploaded image"
                  >
                    <Icon name="memory" size={14} className="text-error" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Parameter Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Temperature Slider */}
            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
                <Icon name="thermostat" size={16} /> TEMPERATURE
              </label>
              <div className="h-12 bg-surface-container-highest/40 rounded-full relative overflow-hidden border border-surface-bright/20 flex items-center px-2">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-primary/20 to-error/40 rounded-full opacity-60 mix-blend-screen transition-all duration-300"
                  style={{ width: `${temperature}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full bg-transparent appearance-none relative z-10
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Hallucination Slider */}
            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-label-sm text-tertiary-fixed-dim ml-4 flex items-center gap-2">
                <Icon name="filter_vintage" size={16} /> HALLUCINATION
              </label>
              <div className="h-12 bg-surface-container-highest/40 rounded-full relative overflow-hidden border border-surface-bright/20 flex items-center px-2">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-secondary/20 to-primary/30 rounded-full opacity-60 mix-blend-screen transition-all duration-300"
                  style={{ width: `${hallucination}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={hallucination}
                  onChange={(e) => setHallucination(Number(e.target.value))}
                  className="w-full bg-transparent appearance-none relative z-10
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-secondary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Transmute Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleTransmute}
              disabled={isLoading || !prompt.trim()}
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]
                         font-label-sm text-label-sm uppercase tracking-widest
                         hover:scale-105 hover:bg-primary transition-all duration-500
                         shadow-[40px_10px_60px_rgba(0,0,0,0.5)]
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                         flex items-center gap-3"
            >
              Transmute <Icon name="flare" size={20} />
            </button>
          </div>
        </GlassPanel>

        {/* Output Basin — The Crucible */}
        <GlassPanel className="rounded-[3rem] p-10 min-h-[300px] flex flex-col relative overflow-hidden mt-8">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          <h3 className="font-headline-md text-headline-md text-secondary-fixed mb-6 font-light">
            The Crucible
          </h3>

          <div className="flex-1 bg-surface-container-lowest/50 rounded-2xl p-8 border border-white/5 relative">
            {/* Idle state */}
            {!isLoading && !response && !error && (
              <p className="font-body-lg text-body-lg text-on-surface/70 italic text-center mt-12">
                Awaiting the catalyst...
              </p>
            )}

            {/* Loading state — Melting Clock Loader */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12">
                <div className="relative w-16 h-20">
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-14
                                bg-primary-container/30 border-2 border-primary/40
                                rounded-[40%_60%_55%_45%/45%_55%_60%_40%]
                                animate-[melt_3s_ease-in-out_infinite]"
                  />
                  <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[2px] h-4 bg-primary/70 rounded-full origin-bottom animate-[tick_3s_ease-in-out_infinite]" />
                  <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[2px] h-3 bg-primary/50 rounded-full origin-bottom rotate-45 animate-[tick_3s_ease-in-out_infinite_0.5s]" />
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6
                                bg-primary-container/40 rounded-[30%_30%_60%_70%/60%_50%_70%_40%]
                                animate-[meltBlob_3s_ease-in-out_infinite]"
                  />
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant animate-pulse">
                  Distilling...
                </p>
              </div>
            )}

            {/* Response text */}
            {response && !error && (
              <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap">
                {response}
                {isLoading && (
                  <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
                )}
              </p>
            )}

            {/* Error state */}
            {error && (
              <div className="flex flex-col items-center gap-3 mt-12">
                <Icon
                  name="pest_control"
                  size={32}
                  className="text-error opacity-60"
                />
                <p className="font-body-md text-body-md text-error text-center">
                  {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors mt-2"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </GlassPanel>
      </section>

      {/* Right Panel — Inner Workings */}
      <aside className="w-full lg:w-96 flex flex-col gap-8">
        {/* Concept Cards */}
        <GlassPanel className="rounded-[2rem] p-8 mt-12 lg:mt-32">
          <h2 className="font-headline-md text-headline-md text-tertiary-fixed mb-8 flex items-center gap-3">
            <Icon name="psychology" size={32} /> Inner Workings
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-1">
                <Icon
                  name="pest_control"
                  size={16}
                  className="text-primary"
                />
              </div>
              <div>
                <h4 className="font-label-sm text-label-sm text-primary mb-1">
                  SYNAPTIC DRIFT
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm opacity-80">
                  The tendency of the model to wander from the prompt into
                  adjacent conceptual spaces.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent my-2" />

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-1">
                <Icon
                  name="visibility"
                  size={16}
                  className="text-secondary"
                />
              </div>
              <div>
                <h4 className="font-label-sm text-label-sm text-secondary mb-1">
                  LATENT VISION
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm opacity-80">
                  Extracting recognizable forms from the high-dimensional noise
                  space.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent my-2" />

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-1">
                <Icon
                  name="bubble_chart"
                  size={16}
                  className="text-tertiary"
                />
              </div>
              <div>
                <h4 className="font-label-sm text-label-sm text-tertiary mb-1">
                  COGNITIVE RESONANCE
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm opacity-80">
                  Matching generated output to human emotional frequencies.
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Decorative Surreal Image */}
        <GlassPanel className="rounded-[2rem] p-4 aspect-square relative overflow-hidden group">
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full opacity-60 group-hover:opacity-80 transition-opacity duration-1000"
              style={{ mixBlendMode: "luminosity" } as React.CSSProperties}
              role="img"
              aria-label="Abstract organic art in amber and gold tones resembling neural pathways and surreal anatomy, dark background, glowing ethereal light"
            >
              <rect width="400" height="400" fill="#171305" />
              <ellipse
                cx="200"
                cy="180"
                rx="120"
                ry="90"
                fill="url(#anatomyGrad1)"
                opacity="0.4"
                style={{ filter: "blur(8px)" }}
              />
              <ellipse
                cx="160"
                cy="240"
                rx="80"
                ry="110"
                fill="url(#anatomyGrad2)"
                opacity="0.3"
                style={{ filter: "blur(12px)" }}
              />
              <path
                d="M100,150 Q200,50 300,180 Q350,250 280,320 Q180,380 120,300 Q60,220 100,150Z"
                fill="none"
                stroke="#ffc66b"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <circle
                cx="140"
                cy="160"
                r="30"
                fill="#e8a838"
                opacity="0.15"
                style={{ filter: "blur(6px)" }}
              />
              <circle
                cx="260"
                cy="220"
                r="25"
                fill="#a4c9ff"
                opacity="0.1"
                style={{ filter: "blur(6px)" }}
              />
              <circle
                cx="200"
                cy="280"
                r="35"
                fill="#eac9b4"
                opacity="0.12"
                style={{ filter: "blur(8px)" }}
              />
              <circle cx="180" cy="160" r="4" fill="#ffc66b" opacity="0.6" />
              <circle cx="230" cy="190" r="3" fill="#ffc66b" opacity="0.5" />
              <circle cx="200" cy="300" r="5" fill="#eac9b4" opacity="0.5" />
              <circle cx="150" cy="250" r="3" fill="#a4c9ff" opacity="0.4" />
              <defs>
                <radialGradient id="anatomyGrad1" cx="40%" cy="30%">
                  <stop offset="0%" stopColor="#e8a838" />
                  <stop offset="100%" stopColor="#171305" />
                </radialGradient>
                <radialGradient id="anatomyGrad2" cx="60%" cy="70%">
                  <stop offset="0%" stopColor="#a4c9ff" />
                  <stop offset="100%" stopColor="#171305" />
                </radialGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </div>
        </GlassPanel>
      </aside>

      {/* Divider between playground and lead capture */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mt-12 lg:mt-20" />

      {/* Lead Capture — per D-01: form adjacent to playground where AI drives interest */}
      <section className="w-full mt-16 lg:mt-24">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8 text-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-2">
              Transmute Interest Into Form
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 italic max-w-xl mx-auto">
              The alchemist does not hoard the philosopher&apos;s stone. Share
              your intent, and we&apos;ll craft something extraordinary together.
            </p>
          </header>
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}
