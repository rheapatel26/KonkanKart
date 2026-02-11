"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineStep {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

interface HorizontalTimelineProps {
  steps: TimelineStep[];
}

export default function HorizontalTimeline({ steps }: HorizontalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Create array with steps + end card
  const allItems = [...steps, {
    title: "Ready to Enjoy!",
    desc: "Fresh at your doorstep",
    icon: "🥭",
    color: "bg-primary-orange/5",
    isEnd: true
  }];

  return (
    <div
      ref={containerRef}
      className="relative py-32 overflow-visible w-full"
    >
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 px-6"
      >
        <p className="text-navy/40 text-sm font-manrope tracking-wider uppercase">
          Scroll to explore the journey →
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative w-full px-12 lg:px-20">
        {/* Horizontal Timeline Line - Centered */}
        <div className="absolute left-12 lg:left-20 right-12 lg:right-20 top-1/2 -translate-y-1/2 h-0.5 bg-navy/15 z-0" />

        {/* Animated Progress Line */}
        <motion.div
          style={{ width: useTransform(lineProgress, (v) => `${v}%`) }}
          className="absolute left-12 lg:left-20 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-primary-orange via-primary-orange/80 to-primary-orange origin-left z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-orange rounded-full shadow-lg shadow-primary-orange/50"
          />
        </motion.div>

        {/* Timeline Items Grid */}
        <div className="grid grid-cols-5 gap-4 lg:gap-6 relative z-20">
          {allItems.map((step, i) => {
            const stepProgress = (i / (allItems.length - 1)) * 100;
            const isAbove = i % 2 === 0;
            const isEnd = 'isEnd' in step && step.isEnd;

            return (
              <div key={i} className="relative flex flex-col items-center">
                {/* Content Card - Alternating Above/Below */}
                <motion.div
                  initial={{ opacity: 0, y: isAbove ? -40 : 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`${isAbove ? 'mb-20' : 'mt-20 order-2'} w-full`}
                >
                  <motion.div
                    style={{
                      scale: useTransform(lineProgress, (v) =>
                        v >= stepProgress - 8 && v <= stepProgress + 8 ? 1.05 : 1
                      ),
                      y: useTransform(lineProgress, (v) =>
                        v >= stepProgress - 8 && v <= stepProgress + 8
                          ? isAbove ? -8 : 8
                          : 0
                      ),
                    }}
                    className={`${step.color} p-8 rounded-3xl border border-navy/10 relative overflow-hidden group transition-all duration-300 min-h-[280px] flex flex-col items-center justify-center`}
                  >
                    {/* Icon */}
                    <motion.div
                      style={{
                        scale: useTransform(lineProgress, (v) =>
                          v >= stepProgress - 8 && v <= stepProgress + 8 ? 1.2 : 1
                        ),
                      }}
                      className="text-6xl mb-5 flex justify-center"
                    >
                      {step.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-ganttie text-navy mb-3 text-center leading-tight px-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-navy/60 text-sm lg:text-base leading-relaxed text-center px-2">
                      {step.desc}
                    </p>

                    {/* Hover Glow */}
                    <motion.div
                      style={{
                        opacity: useTransform(lineProgress, (v) =>
                          v >= stepProgress - 8 && v <= stepProgress + 8 ? 0.15 : 0
                        ),
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-primary-orange/30 to-transparent pointer-events-none rounded-3xl"
                    />

                    {/* Decorative Corner */}
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-navy/10 rounded-tr-lg" />
                  </motion.div>
                </motion.div>

                {/* Timeline Node - Always in center */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: i * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  viewport={{ once: true }}
                  style={{
                    scale: useTransform(lineProgress, (v) =>
                      v >= stepProgress - 5 ? 1.3 : 1
                    ),
                    backgroundColor: useTransform(lineProgress, (v) =>
                      v >= stepProgress - 5 ? "#FA8112" : "#1E3A5F"
                    ),
                    boxShadow: useTransform(lineProgress, (v) =>
                      v >= stepProgress - 5
                        ? "0 0 20px rgba(250, 129, 18, 0.6)"
                        : "0 0 8px rgba(30, 58, 95, 0.3)"
                    ),
                  }}
                  className={`${isAbove ? 'order-1' : 'order-1'} w-12 h-12 rounded-full text-white flex items-center justify-center font-ganttie text-base shadow-lg z-30 relative`}
                >
                  {isEnd ? "✓" : i + 1}
                </motion.div>

                {/* Connecting Line to Node */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{
                    delay: i * 0.1 + 0.3,
                    duration: 0.4,
                  }}
                  viewport={{ once: true }}
                  style={{
                    backgroundColor: useTransform(lineProgress, (v) =>
                      v >= stepProgress - 5 ? "#FA8112" : "#1E3A5F20"
                    ),
                  }}
                  className={`${isAbove ? 'order-0' : 'order-3'} w-0.5 ${isAbove ? 'h-16' : 'h-16'} origin-${isAbove ? 'bottom' : 'top'}`}
                />

                {/* Date/Label below node (optional) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                  className={`${isAbove ? 'order-3 mt-4' : 'order-0 mb-4'} text-center`}
                >
                  <p className="text-navy/40 text-xs font-manrope tracking-wide">
                    Step {isEnd ? allItems.length : i + 1}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}