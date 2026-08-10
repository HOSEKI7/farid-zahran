import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farid Zahran — Full-stack Developer & AI Engineer",
  description:
    "Personal portfolio of Farid Zahran. Full-stack Developer and AI Engineer building modern web applications and intelligent systems.",
  openGraph: {
    title: "Farid Zahran — Full-stack Developer & AI Engineer",
    description: "Personal portfolio of Farid Zahran.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`bg-background text-foreground font-[Arial,sans-serif] antialiased min-h-screen ${jetbrainsMono.variable}`}>
        {/* Global SVG Filter for Grain */}
        <svg className="pointer-events-none absolute w-0 h-0" aria-hidden="true">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        {/* Global Grain Overlay Background */}
        <div className="halide-grain" style={{ filter: "url(#grain)" }} />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
