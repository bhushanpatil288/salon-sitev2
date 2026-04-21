import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import StoreProvider from "./store/StoreProvider";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
