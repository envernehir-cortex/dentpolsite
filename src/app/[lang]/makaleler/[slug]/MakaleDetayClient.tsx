"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Makale } from "@/types/makale";
import { Calendar, Clock, ChevronLeft, User, ArrowRight, Tag } from "lucide-react";
import { Locale } from "@/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dictionary } from "@/i18n/dictionaries";

interface Props {
  makale: any;
  diger: any[];
  lang: Locale;
  dict: Dictionary;
}

export function MakaleDetayClient({ makale, diger, lang, dict }: Props) {
  const d = dict.articles;

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />

      {/* ── ARTICLE HERO ── */}
      <section className="relative min-h-[60vh] flex items-end pb-16 pt-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={makale.imageUrl}
            alt={makale.title}
            fill
            className="object-cover scale-[1.03]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/15" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link
              href={`/${lang}/makaleler`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors mb-6"
            >
              <ChevronLeft size={16} />
              {d.badge}
            </Link>

            <span className="inline-block px-4 py-1.5 bg-brand-green/80 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-5">
              {makale.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg max-w-3xl">
              {makale.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User size={14} />
                </div>
                <span className="font-semibold text-white">{makale.author}</span>
              </div>
              <div className="flex items-center gap-2"><Calendar size={14} />{makale.date}</div>
              <div className="flex items-center gap-2"><Clock size={14} />{(makale as any).readTime || '5 dk okuma'}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT + SIDEBAR ── */}
      <section className="py-16 bg-white flex-1">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">

            {/* Main Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="
                  [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-charcoal [&_h1]:leading-tight [&_h1]:mb-6 [&_h1]:mt-0
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-charcoal [&_h2]:leading-snug [&_h2]:mt-12 [&_h2]:mb-4
                  [&_h2]:border-l-4 [&_h2]:border-brand-green [&_h2]:pl-4
                  [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-charcoal [&_h3]:leading-snug [&_h3]:mt-8 [&_h3]:mb-3
                  [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-charcoal [&_h4]:mt-6 [&_h4]:mb-2
                  [&_p]:text-[1.05rem] [&_p]:leading-[1.85] [&_p]:text-charcoal/80 [&_p]:mb-5
                  [&_ul]:my-5 [&_ul]:space-y-2.5 [&_ul]:pl-0 [&_ul]:list-none
                  [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-charcoal/80 [&_li]:text-[1.02rem] [&_li]:leading-relaxed
                  [&_li]:before:content-['✦'] [&_li]:before:text-brand-green [&_li]:before:text-xs [&_li]:before:mt-1.5 [&_li]:before:shrink-0
                  [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol>li]:text-charcoal/80 [&_ol>li]:leading-relaxed
                  [&_strong]:font-bold [&_strong]:text-charcoal
                  [&_a]:text-brand-green [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-brand-green [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:bg-sage-light/40 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-charcoal/70
                  [&_hr]:my-10 [&_hr]:border-border/50
                "
                dangerouslySetInnerHTML={{ __html: makale.content }}
              />

              {/* Tags */}
              {makale.tags && makale.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={15} className="text-brand-green" />
                    <span className="text-sm font-bold text-charcoal/60 uppercase tracking-wider">Etiketler</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(typeof makale.tags === 'string' ? makale.tags.split(',') : makale.tags).map((tag: string) => (
                      <span
                        key={tag.trim()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sage-light hover:bg-brand-green/10 hover:text-brand-green border border-border/50 hover:border-brand-green/30 text-charcoal/70 text-sm font-medium rounded-full transition-colors cursor-default"
                      >
                        # {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar — Other Articles */}
            {diger.length > 0 && (
              <aside className="lg:sticky lg:top-28 flex flex-col gap-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-charcoal">
                    {d.title}<span className="text-brand-green">{d.titleHighlight}</span>
                  </h3>
                  <Link
                    href={`/${lang}/makaleler`}
                    className="flex items-center gap-1 text-xs font-bold text-brand-green hover:gap-2 transition-all"
                  >
                    {d.viewAll} <ArrowRight size={13} />
                  </Link>
                </div>

                {diger.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  >
                    <Link
                      href={`/${lang}/makaleler/${m.slug}`}
                      className="group flex gap-4 bg-offWhite border border-border/50 rounded-2xl p-4 hover:border-brand-green/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                        <Image src={m.imageUrl} alt={m.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[11px] font-bold text-brand-green mb-1.5 truncate">{m.category}</span>
                        <h4 className="text-sm font-bold text-charcoal line-clamp-2 leading-snug group-hover:text-brand-green transition-colors mb-2">
                          {m.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-charcoal/45 font-medium">
                          <span className="flex items-center gap-1"><Calendar size={10} />{m.date}</span>
                          <span className="flex items-center gap-1"><Clock size={10} />{(m as any).readTime || '5 dk okuma'}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-2 p-5 bg-brand-green/[0.08] border border-brand-green/20 rounded-2xl text-center">
                  <p className="text-sm font-semibold text-charcoal mb-3">Tüm makalelerimizi keşfedin</p>
                  <Link
                    href={`/${lang}/makaleler`}
                    className="inline-flex items-center gap-2 bg-brand-green text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-brand-green/90 transition-colors"
                  >
                    {d.viewAll} <ArrowRight size={13} />
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
