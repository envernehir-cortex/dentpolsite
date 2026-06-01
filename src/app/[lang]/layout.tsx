import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { FloatingContact } from "@/components/layout/FloatingContact";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-dm-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: '--font-playfair-display' });

export const metadata: Metadata = {
  title: "Dentpol Söğütönü Ağız ve Diş Sağlığı Polikliniği | Eskişehir",
  description: "Özgüvenli gülüşler Dentpol'de başlar. Eskişehir'de dijital diş hekimliği, implant, zirkonyum ve ortodonti hizmetleri.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased bg-offWhite text-charcoal`}>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
