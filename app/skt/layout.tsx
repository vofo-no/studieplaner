import { PoweredByVercel } from "@/components/poweredbyvercel";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studieplaner",
};

export default function SktLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <header className="bg-fuchsia-700 text-white shadow py-4 print:hidden">
        <div className="max-w-screen-lg mx-auto px-2 md:px-4">
          Studieforbundet kultur og tradisjon
          <br />
          <Link className="text-2xl font-semibold hover:underline" href="/skt">
            Studieplaner
          </Link>
        </div>
      </header>
      <div className="max-w-screen-lg mx-auto px-2 md:px-4">{children}</div>
      <footer className="bg-gray-800 text-gray-200 py-8 print:hidden">
        <div className="max-w-screen-lg mx-auto px-2 md:px-4 text-sm flex flex-wrap items-center justify-center gap-4">
          <div>❤ Laget av Vofo med data fra studieforbundets kurssystem.</div>
          <PoweredByVercel />
        </div>
      </footer>
    </div>
  );
}
