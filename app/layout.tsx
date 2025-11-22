import "./globals.css";
import Sidebar from "@/app/components/Layout/Sidebar";
import Header from "@/app/components/Layout/Header";
import { Jost, Oxanium } from "next/font/google";

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Shop electronics and more.",
};

// Load Google Fonts
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${oxanium.variable} flex h-screen bg-gray-50 antialiased`}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          <Header/>
          {children}
        </main>
      </body>
    </html>
  );
}
