import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Studio — Estude e treine inglês",
  description: "Plataforma para estudar e treinar as quatro habilidades do inglês (Listening, Speaking, Reading, Writing).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <header className="experience-header">
          <div className="brand">
            <img src="/assets/logo_david.png" alt="Logo" className="brand-logo" />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
