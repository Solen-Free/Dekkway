'use client';

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import IA_bouton from "@/components/UI/IA_bouton";
import { AuthProvider } from './context/AuthContext';
import CookieConsent from '../components/UI/CookieConsent';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Header />
          <main className="flex-1 mt-16">
            {children}
            <CookieConsent />
          </main>
          <div className="w-full mt-20">
            <IA_bouton/>
            <Footer/>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
