import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground font-[Arial,sans-serif] antialiased">
        {children}
      </body>
    </html>
  );
}
