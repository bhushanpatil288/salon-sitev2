import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import StoreProvider from "./store/StoreProvider";
import "./globals.css";
import dbConnect from "../lib/db";
import Theme from "../models/Theme";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pooja Beauty Salon — Premium Salon & Spa",
  description:
    "Experience the finest beauty services at Pooja Beauty Salon. From luxe hair color and signature cuts to spa services and bridal beauty — your premiere salon experience.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetch Theme
  await dbConnect();
  let themeConfig = await Theme.findOne();
  if (!themeConfig) {
    themeConfig = {
      primaryColor: "#2a9d8f",
      primaryDarkColor: "#1a7a6d",
      primaryLightColor: "#3dbdad",
      accentColor: "#3b82c4",
      accentDarkColor: "#2a6ba8"
    };
  }

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      style={{
        "--color-primary": themeConfig.primaryColor,
        "--color-primary-dark": themeConfig.primaryDarkColor,
        "--color-primary-light": themeConfig.primaryLightColor,
        "--color-accent": themeConfig.accentColor,
        "--color-accent-dark": themeConfig.accentDarkColor,
      } as React.CSSProperties}
    >
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
