import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

import { Dictionary } from "@/i18n/dictionaries";

export const Footer = ({ dict }: { dict: Dictionary["footer"] }) => {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-8 border-t-[8px] border-brand-green">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div>
            <Link href="/" className="mb-6 block max-w-[140px]">
              <img
                src="/dentpol-logo-white.png"
                alt="Dentpol Logo"
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
              {dict.description}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">{dict.quickLinks}</h4>
            <ul className="space-y-3">
              {["Ana Sayfa", "Hakkımızda", "Makaleler", "İletişim"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">{dict.services}</h4>
            <ul className="space-y-3">
              {["İmplant Tedavisi", "Zirkonyum Kaplama", "Gülüş Tasarımı", "Şeffaf Plak (Invisalign)", "Kanal Tedavisi", "Çocuk Diş Hekimliği"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">{dict.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-green shrink-0 mt-1" />
                <span className="text-white/70 text-sm leading-relaxed">
                  Zincirlikuyu Mah. 100. Yıl Bulvar No:42A, Tepebaşı / Eskişehir
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-green shrink-0" />
                <span className="text-white/70 text-sm">0222 502 00 26</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-green shrink-0" />
                <span className="text-white/70 text-sm">bilgi@dentpol.com.tr</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs text-center md:text-left">
            {dict.rights}
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <Link href="#" className="hover:text-white transition-colors">{dict.privacy}</Link>
            <Link href="#" className="hover:text-white transition-colors">{dict.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
