import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const editorial = Instrument_Serif({ subsets: ["latin"], variable: "--font-editorial", weight: "400", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adventskalendersuche.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Adventskalendersuche – Finde den Kalender, der wirklich passt", template: "%s | Adventskalendersuche" },
  description: "Der transparente Adventskalender-Finder: 200 geprüfte Produkte, nachvollziehbare Match-Scores und ehrliche Vergleiche für Deutschland.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: "Adventskalendersuche", title: "24 Tage. Ein Volltreffer.", description: "Finde in wenigen Schritten den Adventskalender, der wirklich zur Person passt.", images: [{ url: "/heroes/hero-01-familie-desktop.webp", width: 1920, height: 800, alt: "Familie öffnet gemeinsam einen Adventskalender" }] },
  twitter: { card: "summary_large_image", title: "Adventskalendersuche", description: "Dein transparenter Adventskalender-Finder.", images: ["/heroes/hero-01-familie-desktop.webp"] },
  category: "shopping",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbf7ef", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" data-scroll-behavior="smooth" className={`${manrope.variable} ${editorial.variable}`}><body><a href="#main" className="skip-link">Zum Inhalt springen</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
