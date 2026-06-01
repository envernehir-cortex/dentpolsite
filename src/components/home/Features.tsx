"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Smile } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";

const icons = [
  <Sparkles size={32} className="text-brand-green" />,
  <Shield size={32} className="text-brand-green" />,
  <Clock size={32} className="text-brand-green" />,
  <Smile size={32} className="text-brand-green" />,
];

export const Features = ({ dict }: { dict: Dictionary["features"] }) => {
  return (
    <section className="py-24 bg-sage-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            {dict.title}
          </h2>
          <p className="text-charcoal/70 text-lg font-light">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.items.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-white/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-sage-light flex items-center justify-center mb-6">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{feature.title}</h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
