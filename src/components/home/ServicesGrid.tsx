"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import trDict from "@/i18n/locales/tr.json";
import { Dictionary } from "@/i18n/dictionaries";

export const ServicesGrid = ({ dict, dbTreatments }: { dict: Dictionary["services"], dbTreatments?: any[] }) => {
  const [activeCategory, setActiveCategory] = useState(dict.categories[0]);

  const sourceItems = dbTreatments && dbTreatments.length > 0
    ? dbTreatments.map(t => {
        // Find corresponding treatment index in tr.json
        const index = trDict.services.items.findIndex(item => {
          const dictSlug = item.title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
          return dictSlug === t.slug;
        });
        const localized = index !== -1 ? dict.items[index] : null;
        return {
          title: localized?.title || t.title,
          category: localized?.category || t.category,
          desc: localized?.desc || t.shortDesc,
          imageUrl: t.imageUrl || '',
          slug: t.slug
        };
      })
    : dict.items;

  const filteredServices = activeCategory === dict.categories[0]
    ? sourceItems
    : sourceItems.filter((s: { category: string }) => s.category === activeCategory);

  const imgs = [
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598256989800-fea5ce5146c1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590611936760-eeb9bcab58f2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            {dict.title} <span className="text-brand-green">{dict.titleHighlight}</span>
          </h2>
          <p className="text-charcoal/70 text-lg font-light">
            {dict.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {dict.categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-sage-light text-charcoal hover:bg-sage-light/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service: any, index: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={service.title}
                className="group bg-white border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative group-hover:shadow-inner">
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-brand-dark shadow-sm">
                    {service.category}
                  </div>
                  <div className="absolute inset-0 bg-brand-green/30 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-0" />
                  <img
                    src={(service as any).imageUrl || imgs[index % imgs.length]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%]"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-brand-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/70 text-sm mb-6 flex-grow leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="flex items-center text-brand-green font-medium text-sm mt-auto">
                    {dict.learnMore}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
