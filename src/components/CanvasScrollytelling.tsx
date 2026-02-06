"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

interface CanvasScrollytellingProps {
  frameCount: number;
  basePath: string; // e.g., "/images/mango/ezgif-frame-"
  extension: string; // e.g., ".jpg"
}

const CanvasScrollytelling: React.FC<CanvasScrollytellingProps> = ({
  frameCount,
  basePath,
  extension,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const p = new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
        // Pad numbers if necessary, but based on listing they are 001, 002...
        const frameNum = String(i).padStart(3, '0');
        img.src = `${basePath}${frameNum}${extension}`;
        loadedImages[i] = img;
        promises.push(p);
      }

      try {
        await Promise.all(promises);
        setImages(loadedImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };

    loadImages();
  }, [frameCount, basePath, extension]);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const render = () => {
      const context = canvasRef.current?.getContext('2d');
      if (!context) return;

      const currentIndex = Math.floor(frameIndex.get());
      const image = images[currentIndex];

      if (image) {
        const canvas = canvasRef.current!;
        const { width, height } = canvas;
        
        // Clear canvas
        context.clearRect(0, 0, width, height);

        // Draw image (contain logic)
        const imgRatio = image.width / image.height;
        const canvasRatio = width / height;
        let dWidth, dHeight, dx, dy;

        if (imgRatio > canvasRatio) {
          dWidth = width;
          dHeight = width / imgRatio;
          dx = 0;
          dy = (height - dHeight) / 2;
        } else {
          dHeight = height;
          dWidth = height * imgRatio;
          dx = (width - dWidth) / 2;
          dy = 0;
        }

        context.drawImage(image, dx, dy, dWidth, dHeight);
      }
      
      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [images, frameIndex]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary-cream">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <span className="text-navy font-serif italic text-xl animate-pulse">
              Ripening the harvest...
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-contain"
        />
        
        {/* Overlay Content fades in/out based on scroll */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
           {/* We can add dynamic text here later */}
        </div>
      </div>
    </div>
  );
};

export default CanvasScrollytelling;
