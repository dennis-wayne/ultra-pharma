import "./globals.css";
import type { Metadata } from "next";
import { Source_Serif_4, Nunito, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/structure/site-header";
import { SiteFooter } from "@/components/structure/site-footer";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/content/site";

/** Weight ceiling 500, no italics, per `03 §3`. */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--font-source-serif",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--font-nunito",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ultra Pharma · Regulatory affairs and market access, Kenya",
    template: "%s · Ultra Pharma",
  },
  description:
    "Registration, compliance and health technology assessment for healthcare products in Kenya and East Africa. From Pharmacy and Poisons Board approval to SHA reimbursement.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_KE",
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${nunito.variable} ${plexMono.variable}`}
    >
      <body>
        {/*
          Light is the default. The palette, the paper grounds and the graded
          plates are all authored light-first, so a first visit lands there
          regardless of the operating system setting. Dark stays a deliberate
          choice, made with the toggle and remembered from then on.
        */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {process.env.NODE_ENV === "development" &&
          process.env.UI_AUDIT === "1" && <script defer src="/__audit.js" />}
      </body>
    </html>
  );
}
