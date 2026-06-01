"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, GraduationCap, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, Locale } from "@/i18n/dictionaries";

const doctorPhotos = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=900&auto=format&fit=crop",
];

export default function HekimlerimizPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang);
  const d = dict.doctorsPage;
  const [doctors, setDoctors] = React.useState<any[]>(d.doctors);

  React.useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map((t: any) => ({
            name: t.name,
            title: t.title,
            bio: t.bio,
            specialties: typeof t.specialties === 'string' && t.specialties ? t.specialties.split(',').map((s: string) => s.trim()) : t.specialties || [],
            imageUrl: t.imageUrl
          }));
          setDoctors(formatted);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-end pb-20 pt-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1600&auto=format&fit=crop")' }}
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

      {/* ── HEKİMLER GRID ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-20">
            {doctors.map((doctor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Photo Side */}
                <div className={`relative ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-gray-100">
                    <img
                      src={doctor.imageUrl || doctorPhotos[idx % doctorPhotos.length]}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlay bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                    {/* Name tag */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="font-bold text-lg leading-tight">{doctor.name}</p>
                      <p className="text-white/80 text-sm font-medium">{doctor.title}</p>
                    </div>
                  </div>
                  {/* Decorative */}
                  {idx % 2 === 0 ? (
                    <>
                      <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-sage-light rounded-3xl z-0 hidden lg:block" />
                      <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-brand-green/30 rounded-full z-0 hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-sage-light rounded-3xl z-0 hidden lg:block" />
                      <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-brand-green/30 rounded-full z-0 hidden lg:block" />
                    </>
                  )}
                </div>

                {/* Info Side */}
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-5">
                    <GraduationCap size={15} />
                    {doctor.title}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                    {doctor.name}
                  </h2>

                  <p className="text-charcoal/70 leading-relaxed mb-8 text-[1.05rem]">
                    {doctor.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-8">
                    <p className="text-sm font-bold text-charcoal/50 uppercase tracking-wider mb-4">
                      {d.expertiseLabel}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {doctor.specialties.map((spec: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="flex items-center gap-2 px-4 py-2 bg-sage-light rounded-full text-sm font-semibold text-charcoal border border-border/50"
                        >
                          <CheckCircle2 size={14} className="text-brand-green" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-brand-green text-brand-green" />
                    ))}
                    <span className="text-sm text-charcoal/50 ml-2 font-medium">5.0</span>
                  </div>

                  <a
                    href="tel:+902225020026"
                    className="group inline-flex items-center gap-3 bg-brand-green text-white px-7 py-3.5 rounded-full font-bold hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                  >
                    <Phone size={16} />
                    {d.appointmentButton}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
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
