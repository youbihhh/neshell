import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { adsenseClient } from "../lib/ads";
import { IntroScript } from "../components/Intro";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WhatsAppButton from "../components/WhatsAppButton";
import { Poppins } from "next/font/google";
import "./globals.css";

// Poppins isn't a variable font, so each weight has to be listed
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Neshell Developers | Building Today, Creating Tomorrow",
  description:
    "Neshell Developers designs and builds quality homes and commercial spaces in Ghana — for local clients and the diaspora.",
  // Lets AdSense confirm this site belongs to your account
  ...(adsenseClient && { other: { "google-adsense-account": adsenseClient } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      // The intro's inline script sets data-intro-seen before hydration
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <IntroScript />
        {/* usePathname may suspend under cacheComponents on dynamic routes */}
        <Suspense>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        <WhatsAppButton />
        {/* Google AdSense — only loads once NEXT_PUBLIC_ADSENSE_CLIENT is set */}
        {adsenseClient && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}


