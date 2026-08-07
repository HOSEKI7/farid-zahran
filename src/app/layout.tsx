import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
