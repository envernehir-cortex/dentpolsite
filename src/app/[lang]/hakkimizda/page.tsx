"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Smile, Heart, BookOpen, ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, Locale } from "@/i18n/dictionaries";

const valueIcons = [
  <Shield size={28} className="text-brand-green" />,
  <Sparkles size={28} className="text-brand-green" />,
  <Heart size={28} className="text-brand-green" />,
  <Smile size={28} className="text-brand-green" />,
  <Clock size={28} className="text-brand-green" />,
  <BookOpen size={28} className="text-brand-green" />,
];

export default function HakkimizdaPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang);
  const d = dict.aboutPage;

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-40 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {d.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight drop-shadow-lg max-w-3xl">
              {d.hero.title}{" "}
              <span className="text-brand-green">{d.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed drop-shadow-md">
              {d.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── KLİNİK HİKAYESİ ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative z-10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=900&auto=format&fit=crop"
                  alt="Dentpol Klinik"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-sage-light rounded-3xl z-0" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-brand-green/30 rounded-full z-0" />

              {/* Stats badge */}
              <div className="absolute bottom-8 left-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-border/50">
                <p className="text-3xl font-bold text-brand-green">2018</p>
                <p className="text-sm text-charcoal/70 font-medium">Kuruluş Yılı</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                {d.story.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8 leading-tight">
                {d.story.title}{" "}
                <span className="text-brand-green">{d.story.titleHighlight}</span>
              </h2>
              <div className="space-y-5 text-charcoal/75 leading-relaxed text-[1.05rem]">
                <p>{d.story.p1}</p>
                <p>{d.story.p2}</p>
                <p>{d.story.p3}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DEĞERLERİMİZ ── */}
      <section className="py-24 bg-sage-light/40">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {d.values.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
              {d.values.title}{" "}
              <span className="text-brand-green">{d.values.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.values.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-border/40 hover:shadow-lg hover:border-brand-green/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center mb-5 group-hover:bg-brand-green/10 transition-colors">
                  {valueIcons[idx]}
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-3 group-hover:text-brand-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Decorative orbs */}
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
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              {d.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+902225020026"
                className="group flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded-full font-bold text-base hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
              >
                <Phone size={18} />
                {d.cta.primaryButton}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={`/${lang}/iletisim`}
                className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-all"
              >
                {d.cta.secondaryButton}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
