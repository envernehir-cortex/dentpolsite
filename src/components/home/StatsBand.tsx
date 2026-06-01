"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Yıllık Deneyim" },
  { value: "23", label: "Farklı Tedavi" },
  { value: "2", label: "Uzman Hekim" },
  { value: "6/7", label: "Gün Açık" },
];

export const StatsBand = () => {
  return (
    <div className="bg-brand-green py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <span className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                {stat.value}
              </span>
              <span className="text-sage-light text-sm md:text-base font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
