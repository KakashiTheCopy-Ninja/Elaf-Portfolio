import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DESCRIPTION, SITE_URL, TITLE } from "@/lib/seo";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Elaf Muneeb" },
  description: DESCRIPTION,
  applicationName: "Elaf Muneeb",
  keywords: [
    "Elaf Muneeb",
    "AI automation expert",
    "AI automation",
    "n8n automation",
    "AI agents",
    "lead generation automation",
    "customer support automation",
    "invoice processing automation",
    "workflow automation freelancer",
  ],
  authors: [{ name: "Elaf Muneeb", url: SITE_URL }],
  creator: "Elaf Muneeb",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Elaf Muneeb",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f4f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`.loader,.cursor{display:none!important}`}</style>
        </noscript>
        <a className="skip" href="#services">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
