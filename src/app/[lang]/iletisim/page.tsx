"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Bus,
  Train,
  Car,
  Send,
  CheckCircle,
  MessageCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, Locale } from "@/i18n/dictionaries";

export default function IletisimPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(lang);
  const d = dict.contactPage;
  const loc = dict.location;
  const appt = dict.appointment;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setSending(false);
    setSubmitted(true);
  };

  const transportIcons = [
    <Bus size={22} className="text-brand-green" />,
    <Train size={22} className="text-brand-green" />,
    <Car size={22} className="text-brand-green" />,
  ];

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-end pb-20 pt-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{
            backgroundImage: 'url("/dentpol-building.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/20" />

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

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="tel:+902225020026"
                className="group flex items-center gap-3 bg-brand-green text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/25"
              >
                <Phone size={16} />
                {d.phoneValue}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`https://wa.me/902225020026`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/15 backdrop-blur-sm text-white border border-white/30 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/25 transition-all"
              >
                <MessageCircle size={16} />
                {d.whatsapp}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT INFO + MAP ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                {d.infoTitle}
              </div>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4 p-5 bg-sage-light/40 rounded-2xl border border-brand-green/10 hover:border-brand-green/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green/20 transition-colors">
                    <MapPin size={22} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-1">{loc.address}</p>
                    <p className="text-charcoal font-medium leading-snug">{loc.addressValue}</p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:+902225020026"
                  className="flex items-center gap-4 p-5 bg-sage-light/40 rounded-2xl border border-brand-green/10 hover:border-brand-green/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green/20 transition-colors">
                    <Phone size={22} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-1">{loc.phone}</p>
                    <p className="text-charcoal font-medium">{d.phoneValue}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${d.emailValue}`}
                  className="flex items-center gap-4 p-5 bg-sage-light/40 rounded-2xl border border-brand-green/10 hover:border-brand-green/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green/20 transition-colors">
                    <Mail size={22} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-1">{loc.email}</p>
                    <p className="text-charcoal font-medium">{d.emailValue}</p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-4 p-5 bg-sage-light/40 rounded-2xl border border-brand-green/10">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-1">{loc.hours}</p>
                    <p className="text-charcoal font-medium">{loc.hoursValue}</p>
                    <p className="text-charcoal/60 text-sm mt-0.5">{loc.closed}</p>
                  </div>
                </div>

                {/* Map link */}
                <a
                  href="https://maps.google.com/?q=Aşağı+Söğütönü+Mah+1528+Sk+No+4A+Tepebaşı+Eskişehir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-brand-green text-brand-green font-semibold hover:bg-brand-green hover:text-white transition-all duration-300"
                >
                  <ExternalLink size={16} />
                  {d.mapLink}
                </a>
              </div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-full min-h-[500px]"
            >
              <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.23!2d30.5099!3d39.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc1786e7cb1faf%3A0x2d4a7b5d7b9a3b4f!2zQcWfYcSfxLEgU8O2xJ_DvXTDtm7DvSBNYWguIDEwMC4gWcSxbCBCdWx2YXIgTm86NDJBICBUZXBLYMFZXLE!5e0!3m2!1str!2str!4v1680000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dentpol Söğütönü Konum"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NASIL ULAŞIRIM ── */}
      <section className="py-24 bg-sage-light/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {d.howToTitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              {d.howToTitle}
            </h2>
            {loc.tramInfo && (
              <p className="text-charcoal/65 mt-4 leading-relaxed">{loc.tramInfo}</p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loc.transportOptions.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-border/40 hover:shadow-lg hover:border-brand-green/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center mb-5 group-hover:bg-brand-green/10 transition-colors">
                  {transportIcons[idx]}
                </div>
                <p className="text-charcoal/75 text-sm leading-relaxed">{option}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RANDEVU FORMU ── */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-green/5 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14 text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {appt.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {d.appointmentTitle}{" "}
              <span className="text-brand-green">{d.appointmentHighlight}</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">{d.appointmentSubtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            {submitted ? (
              /* Success state */
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle size={48} className="text-brand-green" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{appt.success}</h3>
                <p className="text-white/65 leading-relaxed">
                  {d.appointmentSubtitle}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", date: "", note: "" }); }}
                  className="mt-8 px-8 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Yeni Randevu
                </button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">{appt.name}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={appt.namePlaceholder}
                      required
                      className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">{appt.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={appt.phonePlaceholder}
                      required
                      className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">{loc.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                    />
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">{appt.date}</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-white/10 border border-white/20 text-white/80 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors [color-scheme:dark]"
                    />
                  </div>

                  {/* Service */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">{appt.service}</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors [color-scheme:dark]"
                    >
                      <option value="" disabled className="text-charcoal bg-white">{appt.servicePlaceholder}</option>
                      {appt.services.map((s) => (
                        <option key={s} value={s} className="text-charcoal bg-white">{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Note */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">{appt.note}</label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      placeholder={appt.notePlaceholder}
                      rows={4}
                      className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group mt-6 w-full flex items-center justify-center gap-3 bg-brand-green text-white py-4 rounded-xl font-bold text-base hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    <>
                      <Send size={18} />
                      {appt.submit}
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
