"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Phone, Calendar, Stethoscope, User, MessageSquare, Send } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";

export const AppointmentForm = ({ dict }: { dict: Dictionary["appointment"] }) => {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="appointment" className="py-24 bg-sage-light/40">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            {dict.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {dict.title}{" "}
            <span className="text-brand-green">{dict.titleHighlight}</span>
          </h2>
          <p className="text-charcoal/60 text-lg font-light">{dict.subtitle}</p>
        </motion.div>

        {/* Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-border/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── LEFT: Image + overlay info ── */}
            <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
                alt="Dentpol Klinik"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" />

              {/* Overlay content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                <h3 className="text-white text-2xl font-bold mb-3 leading-tight">
                  Sağlıklı gülüşünüz<br />
                  <span className="text-brand-green">bir adım uzakta.</span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                  Formu doldurun, uzman ekibimiz sizinle en kısa sürede iletişime geçsin.
                </p>

                {/* Contact quick info */}
                <div className="space-y-3">
                  <a
                    href="tel:+902225020026"
                    className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-green/25 flex items-center justify-center text-brand-green shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wider">Hemen Ara</p>
                      <p className="text-white font-bold text-sm">0222 502 00 26</p>
                    </div>
                    <ChevronRight size={16} className="text-white/30 ml-auto group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-green/25 flex items-center justify-center text-brand-green shrink-0">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wider">Çalışma Saatleri</p>
                      <p className="text-white font-bold text-sm">Pzt - Cmt: 09:00 - 19:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-5"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-brand-green/15 flex items-center justify-center">
                        <CheckCircle size={42} className="text-brand-green" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-brand-green/10 animate-ping" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal">Teşekkürler!</h3>
                    <p className="text-charcoal/60 text-sm max-w-xs leading-relaxed">{dict.success}</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", service: "", date: "", note: "" }); }}
                      className="text-xs text-brand-green hover:text-brand-green/80 transition-colors font-semibold border border-brand-green/30 px-5 py-2 rounded-full hover:bg-brand-green/5"
                    >
                      Yeni Talep Oluştur
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-charcoal/70 text-sm font-semibold mb-2">{dict.name}</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                          name="name" required value={form.name} onChange={handleChange}
                          placeholder={dict.namePlaceholder}
                          className="w-full pl-11 pr-4 py-3.5 bg-sage-light/60 border border-border/60 rounded-xl text-charcoal text-sm placeholder:text-charcoal/35 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-charcoal/70 text-sm font-semibold mb-2">{dict.phone}</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input
                          name="phone" required type="tel" value={form.phone} onChange={handleChange}
                          placeholder={dict.phonePlaceholder}
                          className="w-full pl-11 pr-4 py-3.5 bg-sage-light/60 border border-border/60 rounded-xl text-charcoal text-sm placeholder:text-charcoal/35 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-charcoal/70 text-sm font-semibold mb-2">{dict.service}</label>
                      <div className="relative">
                        <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 pointer-events-none" />
                        <select
                          name="service" required value={form.service} onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3.5 bg-sage-light/60 border border-border/60 rounded-xl text-charcoal text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>{dict.servicePlaceholder}</option>
                          {dict.services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-charcoal/70 text-sm font-semibold mb-2">{dict.date}</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 pointer-events-none" />
                        <input
                          name="date" type="date" value={form.date} onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full pl-11 pr-4 py-3.5 bg-sage-light/60 border border-border/60 rounded-xl text-charcoal text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-charcoal/70 text-sm font-semibold mb-2">{dict.note}</label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-4 top-4 text-charcoal/30" />
                        <textarea
                          name="note" rows={3} value={form.note} onChange={handleChange}
                          placeholder={dict.notePlaceholder}
                          className="w-full pl-11 pr-4 py-3.5 bg-sage-light/60 border border-border/60 rounded-xl text-charcoal text-sm placeholder:text-charcoal/35 outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden bg-brand-green text-white py-4 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/20 disabled:opacity-60 mt-2"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-3">
                        {loading ? (
                          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={16} />
                            {dict.submit}
                          </>
                        )}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
