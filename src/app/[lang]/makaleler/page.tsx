"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { makaleler as staticMakaleler } from "@/data/makaleler";
import { Calendar, Clock, ChevronRight, Search, User } from "lucide-react";
import { getDictionary, Locale } from "@/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MakalelerPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang);
  const d = dict.articles;

  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<any[]>(staticMakaleler);

  React.useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const filtered = articles.filter(
    (m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.category?.toLowerCase().includes(search.toLowerCase()) ||
      m.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  // Featured = first article, rest = remaining
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />

      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex items-end pb-16 pt-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1600&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/55 to-charcoal/20" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {d.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight drop-shadow-lg max-w-3xl">
              {d.title}
              <span className="text-brand-green">{d.titleHighlight}</span>
            </h1>
            <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
              Uzman hekimlerimiz tarafından hazırlanan, diş sağlığı ve estetik hakkındaki güncel yazılarımızı keşfedin.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Makale ara..."
                className="w-full pl-12 pr-5 py-4 bg-white/95 backdrop-blur-md text-charcoal rounded-2xl font-medium text-sm outline-none focus:ring-2 focus:ring-brand-green shadow-lg placeholder:text-charcoal/40"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-charcoal/50">
              <p className="text-xl font-semibold">Sonuç bulunamadı.</p>
            </div>
          ) : (
            <>
              {/* ── FEATURED ARTICLE ── */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group mb-16"
                >
                  <Link href={`/${lang}/makaleler/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-offWhite rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl hover:border-brand-green/30 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
                      <Image
                        src={featured.imageUrl}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-offWhite/20" />
                      <div className="absolute top-5 left-5">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-brand-green text-xs font-bold rounded-full shadow-sm">
                          {featured.category}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-10 lg:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs font-medium text-charcoal/50 mb-5">
                        <div className="flex items-center gap-1.5"><Calendar size={13} />{featured.date}</div>
                        <div className="flex items-center gap-1.5"><Clock size={13} />{featured.readTime || '5 dk okuma'}</div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug group-hover:text-brand-green transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-charcoal/65 leading-relaxed mb-7 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between border-t border-border/50 pt-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center">
                            <User size={14} className="text-brand-green" />
                          </div>
                          <span className="text-sm font-semibold text-charcoal">{featured.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-bold text-brand-green group-hover:gap-2 transition-all">
                          {d.readMore}
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* ── OTHER ARTICLES GRID ── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((makale, index) => (
                    <motion.div
                      key={makale.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-offWhite rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 flex flex-col"
                    >
                      <Link href={`/${lang}/makaleler/${makale.slug}`} className="block relative h-52 overflow-hidden">
                        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors z-10" />
                        <Image
                          src={makale.imageUrl}
                          alt={makale.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-brand-green text-xs font-bold rounded-full shadow-sm">
                            {makale.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-7 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs font-medium text-charcoal/50 mb-4">
                          <div className="flex items-center gap-1.5"><Calendar size={12} />{makale.date}</div>
                          <div className="flex items-center gap-1.5"><Clock size={12} />{makale.readTime || '5 dk okuma'}</div>
                        </div>

                        <Link href={`/${lang}/makaleler/${makale.slug}`}>
                          <h3 className="text-lg font-bold text-charcoal mb-3 line-clamp-2 leading-snug group-hover:text-brand-green transition-colors">
                            {makale.title}
                          </h3>
                        </Link>

                        <p className="text-charcoal/65 text-sm leading-relaxed mb-5 line-clamp-2 flex-grow">
                          {makale.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center">
                              <User size={12} className="text-brand-green" />
                            </div>
                            <span className="text-xs font-semibold text-charcoal">{makale.author}</span>
                          </div>
                          <Link
                            href={`/${lang}/makaleler/${makale.slug}`}
                            className="flex items-center gap-1 text-xs font-bold text-brand-green hover:gap-2 transition-all"
                          >
                            {d.readMore}
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
