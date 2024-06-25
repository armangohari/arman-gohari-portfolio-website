"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ClientSectionProps = {
  children: ReactNode;
};

export default function ClientSection({ children }: ClientSectionProps) {
  return (
    <motion.div
      className="grid place-items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
