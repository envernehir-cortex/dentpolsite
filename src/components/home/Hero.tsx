"use client";

import React from "react";
import { Dictionary, Locale } from "@/i18n/dictionaries";

interface HeroProps {
  dict: Dictionary["hero"];
  lang: Locale;
}

export const Hero = ({ dict, lang }: HeroProps) => {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-screen overflow-hidden bg-brand-dark">
      {/* Full-bleed Background Image with subtle entrance scale & hover zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-[1.02] transform transition-transform duration-[20s] ease-out hover:scale-105"
        style={{ backgroundImage: 'url("/dentpol-building.jpg")' }}
      />
      
      {/* Delicate vignette gradient at the bottom and top for smooth integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 via-transparent to-charcoal/10 pointer-events-none z-10" />
    </section>
  );
};
