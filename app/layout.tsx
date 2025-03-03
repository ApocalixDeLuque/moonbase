import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Precios de Desarrollo Web & Hosting | Nightly Software",
  description: "Conoce nuestros planes de desarrollo web todo incluido con hosting, dominio y SSL. Despliega tu sitio web profesional con Nightly Software a precios competitivos.",
  keywords: "desarrollo web, precios hosting, dominio incluido, SSL, despliegue sitio web, Nightly Software, diseño web profesional, hosting web, planes desarrollo web",
  openGraph: {
    title: "Precios de Desarrollo Web Todo Incluido | Nightly Software",
    description: "Sitios web profesionales con hosting, dominio y SSL incluidos. Precios transparentes sin costos ocultos.",
    type: "website",
    locale: "es_ES",
    url: "https://pricing.nightlysoftware.com",
  },
  alternates: {
    canonical: "https://pricing.nightlysoftware.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased theme-transition`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
