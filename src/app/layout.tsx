import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "BrainFuel Quantum AI Labs",
    template: "%s | BrainFuel Quantum AI Labs",
  },
  description:
    "Pioneering the convergence of quantum computing, artificial intelligence, and blockchain technologies. Building tomorrow's intelligence infrastructure today.",
  keywords: [
    "quantum computing",
    "artificial intelligence",
    "blockchain",
    "AI research",
    "quantum AI",
    "BrainFuel",
    "BF-Q",
    "Navi Mumbai",
    "India",
  ],
  authors: [{ name: "Mohsin Agwan", url: "https://www.bf-q.com" }],
  creator: "BrainFuel Quantum AI Labs",
  metadataBase: new URL("https://www.bf-q.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bf-q.com",
    siteName: "BrainFuel Quantum AI Labs",
    title: "BrainFuel Quantum AI Labs",
    description:
      "Pioneering the convergence of quantum computing, artificial intelligence, and blockchain technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrainFuel Quantum AI Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainFuel Quantum AI Labs",
    description:
      "Pioneering the convergence of quantum computing, artificial intelligence, and blockchain technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
