import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/site/AppShell";

export const metadata: Metadata = {
  title: {
    default: "KG Home Care — Washing Machine Service Centre in Tuticorin",
    template: "%s | KG Home Care",
  },
  description:
    "KG Home Care: trusted washing machine service, installation, drum cleaning and AMC in Tuticorin.",
  authors: [{ name: "KG Home Care" }],
  openGraph: {
    siteName: "KG Home Care",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0057FF",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "KG Home Care",
  description:
    "Washing machine service, installation, drum cleaning and AMC in Tuticorin.",
  telephone: "+91 99999 99999",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7/1, Kovil Street",
    addressLocality: "Pudukkottai",
    addressRegion: "Tamil Nadu",
    postalCode: "628103",
    addressCountry: "IN",
  },
  areaServed: ["Tuticorin", "Pudukkottai", "Tamil Nadu"],
  openingHours: "Mo-Su 08:00-21:00",
  priceRange: "₹₹",
};

export default function RootLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
