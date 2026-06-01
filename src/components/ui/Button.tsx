import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "white" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 active:scale-[0.98]";
    
    const variants = {
      primary: "bg-brand-green text-white hover:bg-brand-dark shadow-sm hover:shadow-md",
      outline: "border-[1.5px] border-charcoal bg-transparent text-charcoal hover:bg-sage-light/80",
      ghost: "bg-transparent text-charcoal hover:bg-sage-light/80",
      white: "bg-white text-charcoal hover:bg-gray-50 shadow-sm hover:shadow-md",
      glass: "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
