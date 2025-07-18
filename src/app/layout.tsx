import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MusicGPT - AI",
  description:
    "Explore music with the power of AI. Your personal music companion for endless possibilities.",
  keywords: [
    "AI music",
    "music creation",
    "artificial intelligence",
    "music generation",
  ],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} dark font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
