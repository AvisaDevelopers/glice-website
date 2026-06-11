"use client";

import { GliceLogoMotion } from "@/components/brand/glice-logo-motion";
import { motion } from "framer-motion";

export function RouteLoader() {
  return (
    <motion.div
      className="route-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="route-loader-backdrop" aria-hidden />
      <GliceLogoMotion size={88} />
    </motion.div>
  );
}
