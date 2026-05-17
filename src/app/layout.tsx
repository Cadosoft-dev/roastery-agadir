import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roastery-agadir.vercel.app"),
  title: "ROASTERY Agadir — Restaurant Gastronomique à Founty",
  description:
    "Découvrez ROASTERY, restaurant gastronomique à Agadir. Cuisine française, marocaine et méditerranéenne. Réservez votre table.",
  openGraph: {
    title: "ROASTERY Agadir",
    description: "Restaurant gastronomique à Founty, Agadir.",
    images: ["/logo/roastery-logo.jpeg"],
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  },
  alternates: {
    canonical: "/"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  address: siteConfig.address,
  telephone: siteConfig.whatsapp,
  openingHours: ["Mo-Su 07:00-10:30", "Mo-Su 12:00-14:30", "Mo-Su 19:00-00:00"],
  servesCuisine: ["French", "Moroccan", "Mediterranean"],
  priceRange: "$$",
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.latitude,
    longitude: siteConfig.coordinates.longitude
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "200"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable} ${naskh.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
