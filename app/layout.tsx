'use client';

import "./globals.css";
import Sidebar from "@/app/components/Layout/Sidebar";
import Header from "@/app/components/Layout/Header";
import { Jost, Oxanium } from "next/font/google";
import { useState } from "react";

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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${oxanium.variable} flex h-screen bg-gray-50 antialiased`}
      >
        {/* Sidebar - Hidden on mobile by default */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen} 
          onClose={closeMobileSidebar} 
        />

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={toggleMobileSidebar} />
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}