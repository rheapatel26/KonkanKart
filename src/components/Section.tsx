"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
    return (
        <section
            id={id}
            className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
