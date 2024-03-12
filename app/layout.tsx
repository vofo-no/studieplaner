import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PoweredByVercel } from "@/components/poweredbyvercel";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studieplaner",
  description:
    "Søkbar katalog med alle godkjente studieplaner i studieforbundet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={inter.className}>
        <div className="space-y-6">
          <Header />
          <div className="max-w-screen-lg mx-auto px-2 md:px-4">{children}</div>
          <footer className="bg-gray-800 text-gray-200 py-8 print:hidden">
            <div className="max-w-screen-lg mx-auto px-2 md:px-4 text-sm flex flex-wrap items-center justify-center gap-4">
              <div>
                ❤ Laget av Vofo med data fra studieforbundets kurssystem.
              </div>
              <PoweredByVercel />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
