import type { Metadata } from "next";
import { Inter, Fira_Code, Antic } from "next/font/google"; // Import new fonts
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-fira-code" });
const antic = Antic({ subsets: ["latin"], weight: "400", variable: "--font-antic" });

export const metadata: Metadata = {
  title: "Adithya - Portfolio",
  description: "Portfolio of Adithya CK - Creative Video Editor, AI Ads Maker, and Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} ${antic.variable}`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover scale-[1.35] -z-10 pointer-events-none opacity-70"
        >
          <source src="/spiderman.mov" type="video/mp4" />
        </video>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}