import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethereal Inquiries",
};

export default function InsightsPage() {
  return (
    <div className="px-horizon py-horizon pt-24">
      <h2 className="font-headline-md text-headline-md">Ethereal Inquiries</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">
        Journal entries and observations — coming soon.
      </p>
    </div>
  );
}
