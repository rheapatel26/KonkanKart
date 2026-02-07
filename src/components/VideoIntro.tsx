"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoIntroProps {
    videoSrc: string;
    onVideoEnd: () => void;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ videoSrc, onVideoEnd }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.warn("Autoplay was prevented. User interaction might be required.", error);
            });
        }
    }, [isLoaded]);

    const handleEnded = () => {
        setIsFading(true);
        // Allow fade animation to play before signaling end
        setTimeout(() => {
            onVideoEnd();
        }, 1000);
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <AnimatePresence>
                {!isFading && (
                    <motion.video
                        ref={videoRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        onLoadedData={() => setIsLoaded(true)}
                        onEnded={handleEnded}
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </motion.video>
                )}
            </AnimatePresence>

            {!isLoaded && !isFading && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary-cream">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="text-6xl"
                    >
                        🥭
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default VideoIntro;
