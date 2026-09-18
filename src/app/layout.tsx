import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import FloatingDock from "@/components/FloatingDock";
import Preloader from "@/components/Preloader";
import FilmGrain from "@/components/FilmGrain";
import { LightboxProvider } from "@/components/LightboxProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Romy | Mechatronics Engineer & Full-Stack Developer",
  description: "Portfolio of Mohamed Ahmed Romy, specializing in Hardware-Software Co-design, distributed automation, Next.js, and Django.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased selection:bg-neon-cyan/30 selection:text-white`}>
        <Preloader />
        <FilmGrain />
        <MagneticCursor />
        <FloatingDock />
        <LightboxProvider>
          {children}
        </LightboxProvider>
      </body>
    </html>
  );
}
