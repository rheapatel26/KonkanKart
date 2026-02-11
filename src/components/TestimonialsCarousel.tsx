"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
    name: string;
    review: string;
    rating: number;
    location?: string;
}

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = testimonials.length - 1;
            if (next >= testimonials.length) next = 0;
            return next;
        });
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto px-4">
            {/* Main Card Container */}
            <div className="relative h-[400px] md:h-[450px] flex items-center justify-center perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                            rotateY: { duration: 0.6 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full cursor-grab active:cursor-grabbing"
                    >
                        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] border-2 border-mango-8 hover:border-primary-orange/40 transition-all">
                            {/* Stars */}
                            <div className="flex gap-2 mb-8 justify-center">
                                {[...Array(testimonials[currentIndex].rating)].map((_, j) => (
                                    <motion.span
                                        key={j}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: j * 0.1, type: "spring" }}
                                        className="text-3xl text-primary-orange"
                                    >
                                        ★
                                    </motion.span>
                                ))}
                            </div>

                            {/* Review Text */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-navy/80 text-xl md:text-2xl leading-relaxed font-manrope mb-10 italic text-center"
                            >
                                "{testimonials[currentIndex].review}"
                            </motion.p>

                            {/* Customer Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center justify-center gap-5"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-orange to-mango-7 flex items-center justify-center shadow-lg">
                                    <span className="text-3xl">🥭</span>
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-navy font-ganttie text-2xl">
                                        {testimonials[currentIndex].name}
                                    </div>
                                    <div className="text-sm text-navy/50 font-manrope">
                                        Verified Customer
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Background Cards (Stack Effect) */}
                <div className="absolute w-full h-full pointer-events-none">
                    <motion.div
                        animate={{ scale: 0.95, y: 20, opacity: 0.5 }}
                        className="absolute inset-0 bg-white/40 rounded-[3rem] blur-sm"
                    />
                    <motion.div
                        animate={{ scale: 0.9, y: 40, opacity: 0.3 }}
                        className="absolute inset-0 bg-white/20 rounded-[3rem] blur-md"
                    />
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center items-center gap-8 mt-12">
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => paginate(-1)}
                    className="w-14 h-14 rounded-full bg-primary-orange text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </motion.button>

                {/* Dots Indicator */}
                <div className="flex gap-3">
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`transition-all ${index === currentIndex
                                    ? "w-12 h-3 bg-primary-orange"
                                    : "w-3 h-3 bg-navy/20 hover:bg-navy/40"
                                } rounded-full`}
                        />
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => paginate(1)}
                    className="w-14 h-14 rounded-full bg-primary-orange text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </motion.button>
            </div>

            {/* Swipe Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-8 text-navy/40 text-sm font-manrope"
            >
                👆 Swipe or drag to navigate
            </motion.div>
        </div>
    );
}
