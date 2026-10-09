import type { Metadata, Viewport } from "next";
import { Andika, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

// Atkinson Hyperlegible was designed by the Braille Institute for low-vision readers.
const ui = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-ui" });
// Andika was designed by SIL for people learning to read (single-storey a and g).
const reading = Andika({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-read" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.readaloud.si"),
  title: "ReadAloud: any page, read out loud",
  description:
    "Snap a photo of a book, a letter or a label and hear it read aloud, with hard words explained. Made for young readers and anyone who finds small print hard.",
  openGraph: {
    title: "ReadAloud: any page, read out loud",
    description: "Snap a photo of any page and hear it read aloud, with hard words explained.",
    url: "https://www.readaloud.si",
    siteName: "ReadAloud",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#14213D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ui.variable} ${reading.variable}`}>
      <body>{children}</body>
    </html>
  );
}
