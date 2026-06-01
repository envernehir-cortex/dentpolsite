"use client";

import React, { useState } from "react";
import { MessageCircle, CalendarDays, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      <div 
        className={cn(
          "flex flex-col gap-3 transition-all duration-300 origin-bottom-right",
          isOpen ? "opacity-100 scale-100 mb-2" : "opacity-0 scale-75 pointer-events-none h-0 mb-0"
        )}
      >
        <button className="flex items-center gap-3 bg-white text-charcoal hover:text-brand-green px-4 py-3 rounded-2xl shadow-lg border border-border/50 transition-all hover:scale-105 group">
          <div className="bg-brand-green/10 p-2 rounded-full group-hover:bg-brand-green group-hover:text-white transition-colors">
            <CalendarDays size={20} />
          </div>
          <span className="font-semibold text-sm">Randevu Al</span>
        </button>
        
        <button className="flex items-center gap-3 bg-white text-charcoal hover:text-brand-green px-4 py-3 rounded-2xl shadow-lg border border-border/50 transition-all hover:scale-105 group">
          <div className="bg-brand-green/10 p-2 rounded-full text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
            <MessageCircle size={20} />
          </div>
          <span className="font-semibold text-sm">WhatsApp</span>
        </button>
      </div>

      {/* Main Toggle Button */}
      <div className="relative">
        {/* Ping Animation Ring */}
        {!isOpen && (
          <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-75" />
        )}
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-10",
            isOpen ? "bg-white text-charcoal border border-border" : "bg-brand-green text-white"
          )}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </div>
  );
};
