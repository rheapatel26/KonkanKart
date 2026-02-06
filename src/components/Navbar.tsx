"use client";
import Image from 'next/image';
import logo from '../../public/images/logo.png';


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-8 py-6 flex justify-between items-center ${isScrolled ? 'bg-primary-cream/80 backdrop-blur-md shadow-sm py-4' : ''
                }`}
        >
            {/* <div className="font-serif text-2xl font-bold text-navy tracking-tight">
                Konkan<span className="text-primary-orange">Kart</span>
            </div> */}


            <div className="flex items-center">
                <Image
                    src={logo}
                    alt="KonkanKart Logo"
                    className="h-15 w-auto"
                />
            </div>


            <div className="hidden md:flex space-x-8 text-navy/80 font-medium">
                <a href="#about" className="hover:text-primary-orange transition-colors">Our Story</a>
                <a href="#process" className="hover:text-primary-orange transition-colors">The Harvest</a>
                <a href="#quality" className="hover:text-primary-orange transition-colors">Quality</a>
            </div>

            <button className="bg-primary-orange text-white px-6 py-2 rounded-full font-medium hover:bg-mango-15 transition-all transform hover:scale-105 active:scale-95 shadow-md">
                Order Now
            </button>
        </motion.nav>
    );
};

export default Navbar;
