import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surrealist Echoes",
};

export default function DesignPage() {
  return (
    <div className="px-horizon py-horizon pt-24">
      <h2 className="font-headline-md text-headline-md">Surrealist Echoes</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-drip">
        Design system reference — coming soon.
      </p>
    </div>
  );
}
