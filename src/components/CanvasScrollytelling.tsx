// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

// interface CanvasScrollytellingProps {
//   frameCount: number;
//   basePath: string; // e.g., "/images/mango/ezgif-frame-"
//   extension: string; // e.g., ".jpg"
// }

// const CanvasScrollytelling: React.FC<CanvasScrollytellingProps> = ({
//   frameCount,
//   basePath,
//   extension,
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [images, setImages] = useState<HTMLImageElement[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Smooth out the scroll progress
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 500, // Increased for snappier response
//     damping: 50,    // Adjusted for smooth settling
//     restDelta: 0.001
//   });

//   // Map scroll progress to frame index
//   const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

//   useEffect(() => {
//     // Preload images
//     const loadImages = async () => {
//       const loadedImages: HTMLImageElement[] = [];
//       const promises = [];

//       for (let i = 1; i <= frameCount; i++) {
//         const img = new Image();
//         const p = new Promise((resolve, reject) => {
//           img.onload = () => resolve(img);
//           img.onerror = reject;
//         });
//         // Pad numbers if necessary, but based on listing they are 001, 002...
//         const frameNum = String(i).padStart(4, '0');
//         img.src = `${basePath}${frameNum}${extension}`;
//         loadedImages[i] = img;
//         promises.push(p);
//       }

//       try {
//         await Promise.all(promises);
//         setImages(loadedImages);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to load images", error);
//       }
//     };

//     loadImages();
//   }, [frameCount, basePath, extension]);

//   useEffect(() => {
//     if (images.length === 0 || !canvasRef.current) return;

//     const render = () => {
//       const context = canvasRef.current?.getContext('2d');
//       if (!context) return;

//       const currentIndex = Math.floor(frameIndex.get());
//       const image = images[currentIndex];

//       if (image) {
//         const canvas = canvasRef.current!;
//         const { width, height } = canvas;

//         // Clear canvas
//         context.clearRect(0, 0, width, height);

//         // Draw image (contain logic)
//         const imgRatio = image.width / image.height;
//         const canvasRatio = width / height;
//         let dWidth, dHeight, dx, dy;

//         if (imgRatio > canvasRatio) {
//           dWidth = width;
//           dHeight = width / imgRatio;
//           dx = 0;
//           dy = (height - dHeight) / 2;
//         } else {
//           dHeight = height;
//           dWidth = height * imgRatio;
//           dx = (width - dWidth) / 2;
//           dy = 0;
//         }

//         context.drawImage(image, dx, dy, dWidth, dHeight);
//       }

//       requestAnimationFrame(render);
//     };

//     const animationId = requestAnimationFrame(render);
//     return () => cancelAnimationFrame(animationId);
//   }, [images, frameIndex]);

//   // Handle Resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (canvasRef.current) {
//         canvasRef.current.width = window.innerWidth;
//         canvasRef.current.height = window.innerHeight;
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div ref={containerRef} className="relative h-[400vh] w-full">
//       <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary-cream">
//         {isLoading && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <span className="text-navy font-serif italic text-xl animate-pulse">
//               Ripening the harvest...
//             </span>
//           </div>
//         )}
//         <canvas
//           ref={canvasRef}
//           className="h-full w-full object-contain"
//         />

//         {/* Overlay Content fades in/out based on scroll */}
//         <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
//           {/* We can add dynamic text here later */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CanvasScrollytelling;

"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring, animate, useMotionValue } from 'framer-motion';

interface CanvasScrollytellingProps {
  frameCount: number;
  basePath: string;
  extension: string;
  onAnimationComplete: () => void;
}

const CanvasScrollytelling: React.FC<CanvasScrollytellingProps> = ({
  frameCount,
  basePath,
  extension,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  // Motion values for frame control
  const autoPlayFrame = useMotionValue(1);
  const scrollFrame = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress for the second phase
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll to frame index (starts from full after auto-play is done)
  const mappedScrollFrame = useTransform(smoothScrollProgress, [0, 1], [1, frameCount]);

  // The actual frame index we use for rendering
  const [currentFrame, setCurrentFrame] = useState(1);

  // Story phases - mapped to BOTH auto-play and scroll
  // Phase 1: 0 - 25% of animation
  // Phase 2: 25 - 50%
  // Phase 3: 50 - 75%
  // Phase 4: 75 - 100%

  // We'll use a single progress value for text animations
  const storyProgress = useMotionValue(0);

  const phase1Opacity = useTransform(storyProgress, [0, 0.05, 0.15, 0.25], [0, 1, 1, 0]);
  const phase1Y = useTransform(storyProgress, [0, 0.05, 0.25], [30, 0, -30]);

  const phase2Opacity = useTransform(storyProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const phase2Y = useTransform(storyProgress, [0.25, 0.3, 0.5], [30, 0, -30]);

  const phase3Opacity = useTransform(storyProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const phase3Y = useTransform(storyProgress, [0.5, 0.55, 0.75], [30, 0, -30]);

  const phase4Opacity = useTransform(storyProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const phase4Scale = useTransform(storyProgress, [0.75, 0.8, 1], [0.9, 1, 1.05]);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loaded = 0;

      const promises = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const p = new Promise((resolve, reject) => {
          img.onload = () => {
            loaded++;
            setLoadProgress(Math.round((loaded / frameCount) * 100));
            resolve(img);
          };
          img.onerror = reject;
        });
        const frameNum = String(i).padStart(4, '0');
        img.src = `${basePath}${frameNum}${extension}`;
        loadedImages[i] = img;
        promises.push(p);
      }

      try {
        await Promise.all(promises);
        setImages(loadedImages);
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };

    loadImages();
  }, [frameCount, basePath, extension]);

  // Handle Auto-play Logic
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    // Start auto-play animation
    const controls = animate(autoPlayFrame, frameCount, {
      duration: 4, // 4 seconds for 18 frames is a nice cinematic slow movement
      ease: "linear",
      onUpdate: (latest) => {
        setCurrentFrame(Math.round(latest));
        storyProgress.set(latest / frameCount);
      },
      onComplete: () => {
        setIsAutoPlaying(false);
        setVideoEnded(true);
      }
    });

    return () => controls.stop();
  }, [isLoading, images, frameCount, autoPlayFrame, storyProgress]);

  // Handle Scroll Logic (syncing frame after auto-play)
  useEffect(() => {
    if (isAutoPlaying) return;

    const unsubscribe = mappedScrollFrame.on("change", (latest) => {
      setCurrentFrame(Math.round(latest));
      // Only update story progress via scroll if we haven't completed the site entry
      // but here we keep it synced to scroll for secondary viewings
      storyProgress.set(latest / frameCount);

      // If user scrolls near the end, signal completion to parent
      if (latest / frameCount >= 0.95) {
        onAnimationComplete();
      }
    });

    return () => unsubscribe();
  }, [isAutoPlaying, mappedScrollFrame, frameCount, onAnimationComplete, storyProgress]);

  // Canvas rendering
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const render = () => {
      const context = canvasRef.current?.getContext('2d');
      if (!context || !canvasRef.current) return;

      const currentIndex = Math.min(Math.max(1, currentFrame), frameCount);
      const image = images[currentIndex];

      if (image && image.complete) {
        const canvas = canvasRef.current;
        const { width, height } = canvas;

        context.clearRect(0, 0, width, height);

        const imgRatio = image.width / image.height;
        const canvasRatio = width / height;
        let dWidth, dHeight, dx, dy;

        if (imgRatio > canvasRatio) {
          dHeight = height;
          dWidth = height * imgRatio;
          dx = (width - dWidth) / 2;
          dy = 0;
        } else {
          dWidth = width;
          dHeight = width / imgRatio;
          dx = 0;
          dy = (height - dHeight) / 2;
        }

        context.drawImage(image, dx, dy, dWidth, dHeight);
      }
    };

    render();
  }, [images, currentFrame, frameCount]);

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
    <div ref={containerRef} className="relative w-full" style={{ height: videoEnded ? '300vh' : '100vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary-cream">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-primary-cream"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🥭
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-ganttie text-army-green mb-6">
                Harvesting the Story
              </h3>
              <div className="w-64 h-2 bg-mango-8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-primary-orange to-mango-7"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-4 text-mango-4 font-manrope font-bold">{loadProgress}%</p>
            </motion.div>
          </motion.div>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-6 md:px-12">

          <motion.div
            style={{ opacity: phase1Opacity, y: phase1Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-ganttie text-white drop-shadow-2xl leading-tight mb-6">
              THE KING OF
              <br />
              <span className="text-primary-orange">MANGOES</span>
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: phase2Opacity, y: phase2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-ganttie text-white drop-shadow-2xl mb-6">
              Devgad Alphonso
            </h2>
            <p className="text-xl md:text-3xl font-crustaceans text-mango-2 drop-shadow-lg max-w-4xl">
              Born in the golden orchards of Konkan
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: phase3Opacity, y: phase3Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <div className="max-w-3xl space-y-6">
              <p className="text-2xl md:text-4xl font-serif italic text-white drop-shadow-lg">
                Naturally ripened
              </p>
              <p className="text-2xl md:text-4xl font-serif italic text-white drop-shadow-lg">
                Chemical-free
              </p>
              <p className="text-2xl md:text-4xl font-serif italic text-white drop-shadow-lg">
                Farm to your doorstep
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: phase4Opacity, scale: phase4Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white drop-shadow-2xl mb-12 max-w-4xl leading-relaxed">
              "Taste the sunshine<br />of Konkan"
            </p>

            {videoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col items-center"
              >
                <p className="text-xl md:text-2xl text-mango-2 font-manrope mb-4 uppercase tracking-[0.2em] font-bold">
                  Scroll to Enter Website
                </p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <svg className="w-10 h-10 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CanvasScrollytelling;