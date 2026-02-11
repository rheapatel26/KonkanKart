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


      {/* Timeline Container */}
      <div className="relative w-full px-4 md:px-8">
        {/* Horizontal Timeline Line - Centered */}
        {/* With 4 items, each is 25%. Center is at 12.5% and 87.5% */}
        <div className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 h-0.5 bg-navy/5 z-0" />

        {/* Animated Progress Line */}
        <motion.div
          style={{ width: useTransform(lineProgress, (v) => `${v * 0.75}%`) }}
          className="absolute left-[12.5%] top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-primary-orange via-primary-orange/80 to-primary-orange origin-left z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-orange rounded-full shadow-lg shadow-primary-orange/50"
          />
        </motion.div>

        {/* Timeline Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 relative z-20">
          {allItems.map((step, i) => {
            const stepProgress = (i / (allItems.length - 1)) * 100;
            const isAbove = i % 2 === 0;
            const isEnd = 'isEnd' in step && step.isEnd;

            return (
              <div key={i} className="relative h-[500px] flex justify-center">
                {/* Timeline Node - Always in absolute center */}
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white flex items-center justify-center font-ganttie text-base shadow-lg z-30"
                >
                  {isEnd ? "✓" : i + 1}
                </motion.div>

                {/* Connecting Line */}
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
                  className={`absolute left-1/2 -translate-x-1/2 w-0.5 h-[60px] ${isAbove ? 'bottom-[50%] origin-bottom' : 'top-[50%] origin-top'}`}
                />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: isAbove ? -40 : 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`absolute w-full ${isAbove ? 'bottom-[calc(50%+60px)]' : 'top-[calc(50%+60px)]'}`}
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
                    className={`${step.color} p-8 rounded-[3rem] border border-navy/5 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[4/5] flex flex-col justify-center gap-6 items-center text-center`}
                  >
                    {/* Icon */}
                    <motion.div
                      style={{
                        scale: useTransform(lineProgress, (v) =>
                          v >= stepProgress - 8 && v <= stepProgress + 8 ? 1.2 : 1
                        ),
                      }}
                      className="text-6xl lg:text-7xl leading-none flex justify-center drop-shadow-sm"
                    >
                      {step.icon}
                    </motion.div>

                    {/* Title */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl lg:text-4xl font-ganttie text-navy leading-tight px-1">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-navy/70 text-base lg:text-lg leading-relaxed px-1 font-manrope">
                        {step.desc}
                      </p>
                    </div>

                    {/* Hover Glow */}
                    <motion.div
                      style={{
                        opacity: useTransform(lineProgress, (v) =>
                          v >= stepProgress - 8 && v <= stepProgress + 8 ? 0.1 : 0
                        ),
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 to-transparent pointer-events-none rounded-[3rem]"
                    />

                    {/* Decorative Corner */}
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-navy/10 rounded-tr-lg" />
                  </motion.div>
                </motion.div>

                {/* Date/Label below node (optional) - positioned relative to card or node?
                    Actually, if we want it, we can pos absolute it too.
                    For now, I'll omit it or place it near the card if needed, but it was previously just "Step X".
                    The node serves as the step indicator now.
                 */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}