"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Dictionary, Locale } from "@/i18n/dictionaries";

export const Navbar = ({ dict, currentLang }: { dict: Dictionary["nav"], currentLang: Locale }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "about", label: dict.about, href: `/${currentLang}/hakkimizda` },
    { key: "services", label: dict.services, href: `/${currentLang}/hizmetler` },
    // { key: "doctors", label: dict.doctors, href: `/${currentLang}/hekimlerimiz` },
    { key: "articles", label: dict.articles, href: `/${currentLang}/makaleler` },
    { key: "contact", label: dict.contact, href: `/${currentLang}/iletisim` }
  ];

  return (
    <header className="fixed top-0 md:top-6 left-0 right-0 z-50 px-6 lg:px-12 pointer-events-none transition-all duration-300">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        
        {/* Logo (Left, outside the transparent box) */}
        <Link href="/" className="pointer-events-auto shrink-0 flex items-center relative h-12 md:h-14 w-[160px]">
          {/* White logo */}
          <Image
            src="/dentpol-logo-white.png"
            alt="Dentpol Logo"
            fill
            priority
            className={cn(
              "object-contain object-left transition-all duration-300",
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100 drop-shadow-md"
            )}
          />
          {/* Dark logo */}
          <Image
            src="/dentpol-logo-dark.png"
            alt="Dentpol Logo"
            fill
            priority
            className={cn(
              "object-contain object-left transition-all duration-300",
              isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
        </Link>

        {/* Center Navigation Container (Narrow transparent box) */}
        <nav 
          className={cn(
            "pointer-events-auto hidden lg:flex items-center gap-8 transition-all duration-500",
            isScrolled 
              ? "bg-white/85 backdrop-blur-xl border border-white/50 shadow-lg md:rounded-xl py-[18px] px-10" 
              : "bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm md:rounded-xl py-[18px] px-10"
          )}
        >
          {navLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-all hover:text-brand-green relative group",
                isScrolled ? "text-charcoal" : "text-white/90 hover:text-white drop-shadow-sm"
              )}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Right Container: Language Selector & Mobile Menu Toggle */}
        <div className="pointer-events-auto flex items-center gap-3 shrink-0">
          
          {/* Language Selector (Small Button) */}
          <div className="relative group/lang">
            <button 
              className={cn(
                "flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300", 
                isScrolled 
                  ? "bg-white/85 backdrop-blur-md shadow-md border border-white/50 hover:bg-white" 
                  : "bg-white/10 backdrop-blur-sm shadow-sm border border-white/20 hover:bg-white/20"
              )}
            >
              <span className="text-xl drop-shadow-sm leading-none flex items-center justify-center">
                {currentLang === 'tr' ? '🇹🇷' : currentLang === 'en' ? '🇬🇧' : currentLang === 'de' ? '🇩🇪' : '🇫🇷'}
              </span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-3 w-36 bg-white rounded-xl shadow-xl border border-border/50 py-2 opacity-0 translate-y-2 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-hover/lang:pointer-events-auto transition-all duration-200">
              {[
                { code: "tr", name: "Türkçe", flag: "🇹🇷" },
                { code: "en", name: "English", flag: "🇬🇧" },
                { code: "de", name: "Deutsch", flag: "🇩🇪" },
                { code: "fr", name: "Français", flag: "🇫🇷" }
              ].map((lang) => (
                <button 
                  key={lang.code} 
                  onClick={() => switchLanguage(lang.code)}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-charcoal hover:bg-sage-light/50 hover:text-brand-green flex items-center gap-3 transition-colors"
                >
                  <span className="text-base">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300", 
              isScrolled 
                ? "bg-white/85 backdrop-blur-md shadow-md border border-white/50 text-charcoal hover:bg-white" 
                : "bg-white/10 backdrop-blur-sm shadow-sm border border-white/20 text-white hover:bg-white/20"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-white shadow-2xl overflow-hidden transition-all duration-300 md:rounded-b-[2rem] pointer-events-auto",
          isMobileMenuOpen ? "max-h-[500px] border-t border-border/50 opacity-100 mt-4 md:mt-6" : "max-h-0 opacity-0 mt-4 md:mt-6"
        )}
      >
        <div className="flex flex-col gap-2 p-6">
          {navLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-lg font-medium text-charcoal py-3 px-4 rounded-xl hover:bg-sage-light/50 transition-colors hover:text-brand-green"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-border/50 my-2" />
        </div>
      </div>
    </header>
  );
};
