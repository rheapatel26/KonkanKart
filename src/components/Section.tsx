// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';

// interface SectionProps {
//     children: React.ReactNode;
//     className?: string;
//     id?: string;
// }

// const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
//     return (
//         <section
//             id={id}
//             className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 ${className}`}
//         >
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="max-w-4xl w-full"
//             >
//                 {children}
//             </motion.div>
//         </section>
//     );
// };

// export default Section;

"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    id?: string;
    delay?: number;
}

const Section: React.FC<SectionProps> = ({
    children,
    className = "",
    contentClassName = "",
    id,
    delay = 0
}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id={id}
            ref={ref}
            className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 md:py-32 ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className={`w-full ${contentClassName || 'max-w-6xl'}`}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Section;