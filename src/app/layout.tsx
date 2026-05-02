import type { Metadata } from "next";
import { Epilogue, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNavDock } from "@/components/BottomNavDock";
import { Footer } from "@/components/Footer";
import { VercelProviders } from "@/components/VercelProviders";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s | Nur Amirah", default: "Nur Amirah Mohd Kamil" },
  description: "Portfolio & AI Playground — bridging creative direction with technical experimentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${epilogue.variable} ${newsreader.variable} ${spaceGrotesk.variable} `}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <BottomNavDock />
        <Footer />
        <VercelProviders />
      </body>
    </html>
  );
}
