"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

interface CircleButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "white" | "slate" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const SIZE_MAP = {
  sm: { outer: "w-9 h-9", icon: 14 },
  md: { outer: "w-11 h-11", icon: 16 },
  lg: { outer: "w-14 h-14", icon: 20 },
};

const VARIANT_MAP = {
  white: {
    background: "rgba(255,255,255,0.95)",
    color: "#374151",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
  slate: {
    background: "linear-gradient(135deg, #7D9BB3, #64829A)",
    color: "white",
    boxShadow: "0 4px 16px rgba(100,130,154,0.40)",
  },
  dark: {
    background: "rgba(0,0,0,0.88)",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },
  ghost: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid rgba(255,255,255,0.3)",
  },
};

export default function CircleButton({
  children,
  variant = "white",
  size = "md",
  glow = false,
  className,
  ...props
}: CircleButtonProps) {
  const sizeConfig = SIZE_MAP[size];
  const variantConfig = VARIANT_MAP[variant];

  return (
    <motion.button
      whileTap={{ scale: 0.90 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={clsx(
        "flex items-center justify-center rounded-full border-none cursor-pointer flex-shrink-0 outline-none",
        sizeConfig.outer,
        className
      )}
      style={{
        background: variantConfig.background,
        color: variantConfig.color,
        boxShadow: glow
          ? `${variantConfig.boxShadow}, 0 0 20px rgba(125,155,179,0.3)`
          : variantConfig.boxShadow,
        ...(variant === "ghost" ? { border: "1px solid rgba(255,255,255,0.3)" } : {}),
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
