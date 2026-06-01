"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { makaleler } from "@/data/makaleler";
import { Calendar, ChevronRight } from "lucide-react";
import { Dictionary, Locale } from "@/i18n/dictionaries";

export const LatestArticles = ({ dict, currentLang, dbArticles }: { dict: Dictionary["articles"], currentLang: Locale, dbArticles?: any[] }) => {
  // Tüm makaleleri yatay kaydırılabilir olarak gösteriyoruz (son 6 makale)
  const latestArticles = dbArticles && dbArticles.length > 0 ? dbArticles.slice(0, 6) : makaleler.slice(0, 6);

  return (
    <section className="py-24 bg-offWhite/50 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {dict.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              {dict.title} <span className="text-brand-green">{dict.titleHighlight}</span>
            </h2>
          </div>
          
          <Link 
            href={`/${currentLang}/makaleler`}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-charcoal font-bold rounded-full shadow-sm border border-border/50 hover:border-brand-green hover:text-brand-green transition-all"
          >
            {dict.viewAll}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles Scroll Container */}
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-10 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 lg:-mx-12 lg:px-12">
          {latestArticles.map((makale, index) => (
            <motion.div
              key={makale.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[360px] group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 flex flex-col"
            >
              <Link href={`/${currentLang}/makaleler/${makale.slug}`} className="block relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors z-10" />
                <Image
                  src={makale.imageUrl}
                  alt={makale.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-green text-xs font-bold rounded-full shadow-sm">
                    {makale.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-charcoal/50 mb-3">
                  <Calendar size={14} />
                  {makale.date}
                </div>

                <Link href={`/${currentLang}/makaleler/${makale.slug}`} className="group-hover:text-brand-green transition-colors">
                  <h3 className="text-lg font-bold text-charcoal mb-2 line-clamp-2 leading-snug">
                    {makale.title}
                  </h3>
                </Link>
                
                <p className="text-charcoal/70 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                  {makale.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <Link 
                    href={`/${currentLang}/makaleler/${makale.slug}`}
                    className="flex items-center gap-1 text-sm font-bold text-brand-green hover:text-brand-green-dark transition-colors"
                  >
                    {dict.readMore}
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
