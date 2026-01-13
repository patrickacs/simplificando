import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Simplificando a Jornada | Preparatório para Link School of Business",
  description: "O curso preparatório com 84% de aprovação e +255 alunos aprovados na Jornada Link. Extensivo, Intensivo, Imersão e 360 - Simplifique sua jornada até a Link School of Business.",
  keywords: ["Link School of Business", "Jornada Link", "Preparatório", "Cursinho", "Simplificando"],
  authors: [{ name: "Simplificando a Jornada" }],
  icons: {
    icon: "/favi.svg",
    shortcut: "/favi.svg",
    apple: "/favi.svg",
  },
  openGraph: {
    title: "Simplificando a Jornada",
    description: "O curso preparatório que mais aprova na Jornada Link",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <SmoothScroll>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
