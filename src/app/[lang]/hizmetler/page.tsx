"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, Locale } from "@/i18n/dictionaries";
import trDict from "@/i18n/locales/tr.json";

const serviceImages = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598256989800-fea5ce5146c1?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590611936760-eeb9bcab58f2?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=900&auto=format&fit=crop",
];

export default function TedavilerPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang);
  const d = dict.treatmentsPage;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [treatments, setTreatments] = useState<any[]>(d.items);

  React.useEffect(() => {
    fetch('/api/treatments')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map((t: any) => {
            // Find corresponding treatment index in tr.json
            const index = trDict.treatmentsPage.items.findIndex(item => {
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
            const localized = index !== -1 ? d.items[index] : null;
            return {
              title: localized?.title || t.title,
              category: localized?.category || t.category,
              shortDesc: localized?.shortDesc || t.shortDesc,
              longDesc: localized?.longDesc || t.longDesc,
              benefits: localized?.benefits || (typeof t.benefits === 'string' ? t.benefits.split(',').map((b: string) => b.trim()) : t.benefits),
              imageUrl: t.imageUrl || '',
              slug: t.slug
            };
          });
          setTreatments(formatted);
        }
      })
      .catch(err => console.error(err));
  }, [d.items]);

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-end pb-20 pt-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1600&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/50 to-charcoal/20" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {d.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight drop-shadow-lg max-w-3xl">
              {d.hero.title}{" "}
              <span className="text-brand-green">{d.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              {d.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TEDAVİ LİSTESİ ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-6">
            {treatments.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group bg-offWhite rounded-2xl overflow-hidden border border-border/50 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Collapsed Header */}
                <button
                  className="w-full flex items-center gap-6 p-6 md:p-8 text-left"
                  onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md bg-gray-100">
                    <img src={item.imageUrl || serviceImages[idx % serviceImages.length]} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="inline-block text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full mb-2">
                      {item.category}
                    </span>
                    <h2 className="text-xl font-bold text-charcoal group-hover:text-brand-green transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-charcoal/60 text-sm mt-1 line-clamp-1">{item.shortDesc}</p>
                  </div>
                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-charcoal/50 transition-transform duration-300 ${activeIdx === idx ? "rotate-180 text-brand-green" : ""}`}
                  />
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {activeIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-auto min-h-[280px] bg-gray-100">
                          <img
                            src={item.imageUrl || serviceImages[idx % serviceImages.length]}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                        </div>
                        {/* Text */}
                        <div className="p-8 md:p-10 bg-white">
                          <p className="text-charcoal/75 leading-relaxed mb-8 text-[1.02rem]">
                            {item.longDesc}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {item.benefits.map((benefit: string, bIdx: number) => (
                              <div key={bIdx} className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                                <span className="text-sm font-semibold text-charcoal">{benefit}</span>
                              </div>
                            ))}
                          </div>
                          <a
                            href="tel:+902225020026"
                            className="mt-8 inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-green/90 transition-colors"
                          >
                            <Phone size={15} />
                            {dict.treatmentsPage.cta.button}
                            <ArrowRight size={15} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-green/5 rounded-full blur-2xl translate-y-1/2" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              {d.cta.title}{" "}
              <span className="text-brand-green">{d.cta.titleHighlight}</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">{d.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+902225020026"
                className="group flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded-full font-bold text-base hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
              >
                <Phone size={18} />
                {d.cta.button}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={`/${lang}/iletisim`}
                className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-all"
              >
                {dict.location.contactTitle}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
