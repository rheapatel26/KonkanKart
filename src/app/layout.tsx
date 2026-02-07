import type { Metadata } from "next";
import {
  Manrope,
  Outfit,
  Press_Start_2P,
  Rubik_Mono_One,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: "400",
  subsets: ["latin"],
});

const rubikMonoOne = Rubik_Mono_One({
  variable: "--font-rubik-mono",
  weight: "400",
  subsets: ["latin"],
});

const kgBlankSpaceSolid = localFont({
  src: "../../public/fonts/KGBlankSpaceSketch.ttf",
  variable: "--font-kg",
});

export const metadata: Metadata = {
  title: "KonkanKart | Alphonso Mangoes",
  description: "Authentic Ratnagiri Alphonso Mangoes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${manrope.variable}
          ${outfit.variable}
          ${pressStart2P.variable}
          ${rubikMonoOne.variable}
          ${kgBlankSpaceSolid.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
