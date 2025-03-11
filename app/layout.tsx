import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react"; // Importer le provider
import "./globals.css";

export const metadata: Metadata = {
  title: "IGC_Centre d'Excellence",
  description: "Created with Next.js",
  generator: "JosNath",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>{children}</SessionProvider> {/* Ajout de SessionProvider */}
      </body>
    </html>
  );
}
