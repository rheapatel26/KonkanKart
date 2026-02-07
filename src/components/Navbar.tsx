// "use client";
// import Image from 'next/image';
// import logo from '../../public/images/logo.png';


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// const Navbar = () => {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isVisible, setIsVisible] = useState(false);
//     const { scrollY } = useScroll();

//     useMotionValueEvent(scrollY, "change", (latest) => {
//         // Show navbar after hero scrollytelling (around 300vh)
//         // Adjusting threshold to roughly 3 * viewport height
//         const threshold = window.innerHeight * 3;
//         setIsVisible(latest > threshold);
//         setIsScrolled(latest > 50);
//     });

//     return (
//         <motion.nav
//             initial={{ y: -100, opacity: 0 }}
//             animate={{
//                 y: isVisible ? 0 : -100,
//                 opacity: isVisible ? 1 : 0
//             }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-8 py-6 flex justify-between items-center ${isScrolled ? 'bg-primary-cream/80 backdrop-blur-md shadow-sm py-4' : ''
//                 }`}
//         >
//             {/* <div className="font-serif text-2xl font-bold text-navy tracking-tight">
//                 Konkan<span className="text-primary-orange">Kart</span>
//             </div> */}


//             <div className="flex items-center">
//                 <Image
//                     src={logo}
//                     alt="KonkanKart Logo"
//                     className="h-15 w-auto"
//                 />
//             </div>


//             <div className="hidden md:flex space-x-8 text-navy/80 font-medium">
//                 <a href="#about" className="hover:text-primary-orange transition-colors">Our Story</a>
//                 <a href="#process" className="hover:text-primary-orange transition-colors">The Harvest</a>
//                 <a href="#quality" className="hover:text-primary-orange transition-colors">Quality</a>
//             </div>

//             <button className="bg-primary-orange text-white px-6 py-2 rounded-full font-medium hover:bg-mango-15 transition-all transform hover:scale-105 active:scale-95 shadow-md">
//                 Order Now
//             </button>
//         </motion.nav>
//     );
// };

// export default Navbar;
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

interface NavbarProps {
    show: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ show }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!show) return;

        if (latest > lastScrollY && latest > 100) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setLastScrollY(latest);
        setIsScrolled(latest > 50);
    });

    return (
        <AnimatePresence>
            {show && (
                <motion.nav
                    initial={{ y: -100, opacity: 0, scale: 0.98 }}
                    animate={{
                        y: isHidden ? -100 : 0,
                        opacity: isHidden ? 0 : 1,
                        scale: 1
                    }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.5 }
                    }}
                    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 ${isScrolled
                        ? 'bg-primary-cream/95 backdrop-blur-xl shadow-lg border-b border-mango-8'
                        : 'bg-transparent'
                        }`}
                >
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center z-10"
                        >
                            <div className="font-ganttie text-2xl md:text-3xl text-army-green tracking-tight">
                                Konkan<span className="text-primary-orange">Kart</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="hidden md:flex items-center space-x-8 text-navy/80 font-manrope font-medium"
                        >
                            {['Our Story', 'The Harvest', 'Quality', 'Testimonials'].map((item, i) => (
                                <motion.a
                                    key={item}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    whileHover={{ y: -2 }}
                                    className="hover:text-primary-orange transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-orange group-hover:w-full transition-all duration-300" />
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(250, 129, 18, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary-orange text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg hover:bg-mango-15 transition-all"
                        >
                            Order Now
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            whileTap={{ scale: 0.9 }}
                            className="md:hidden flex flex-col gap-1.5 z-10"
                        >
                            <span className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-navy' : 'bg-army-green'}`} />
                            <span className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-navy' : 'bg-army-green'}`} />
                            <span className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-navy' : 'bg-army-green'}`} />
                        </motion.button>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;