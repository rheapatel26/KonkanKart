"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
  show: boolean;
}

export default function AnnouncementBar({ show }: AnnouncementBarProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-primary-orange text-white overflow-hidden"
        >
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="whitespace-nowrap py-3 px-4 text-center font-bold tracking-wider text-sm md:text-base"
          >
            🥭 THE PREMIUM QUALITY IS HERE - SHOP NOW!!! 🥭 END OF SEASON LAST CATCH 🥭 THE PREMIUM QUALITY IS HERE - SHOP NOW!!! 🥭 END OF SEASON LAST CATCH 🥭 THE PREMIUM QUALITY IS HERE - SHOP NOW!!! 🥭
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
