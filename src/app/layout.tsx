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
  icons: {
    icon: "/me.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} ${antic.variable}`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}