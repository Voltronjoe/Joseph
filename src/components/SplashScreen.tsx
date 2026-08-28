import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // 2.5 seconds total duration for the splash screen sequence
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="flex flex-col items-center text-center px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.4 },
          },
        }}
      >
        {/* Step 1: Logo */}
        <motion.img
          src="https://i.ibb.co/1fNhY6LV/1-Naija-Mind-Logo.png"
          alt="NaijaMind AI Logo"
          className="mb-6 h-20 w-auto md:h-24 object-contain rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-950"
          variants={{
            hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        />

        {/* Step 2: Brand Name */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          NaijaMind AI
        </motion.h1>

        {/* Step 3: Tagline */}
        <motion.p
          className="mt-3 text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-500"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          Ask Nigeria Anything.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
