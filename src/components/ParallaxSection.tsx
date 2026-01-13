'use client';

import { useRef, ReactNode } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

interface ParallaxSectionProps {
    children: ReactNode;
    imageSrc: string;
    imageAlt?: string;
    overlayOpacity?: number;
    parallaxIntensity?: number; // 0.1 = subtle, 0.3 = strong
    className?: string;
    minHeight?: string;
}

/**
 * ParallaxSection - Componente de seção com imagem de fundo parallax
 * 
 * Usage:
 * <ParallaxSection imageSrc="/path/to/image.jpg">
 *   <YourContent />
 * </ParallaxSection>
 */
export default function ParallaxSection({
    children,
    imageSrc,
    imageAlt = 'Background',
    overlayOpacity = 0.5,
    parallaxIntensity = 0.15,
    className = '',
    minHeight = '100vh',
}: ParallaxSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Parallax effect: image moves slower than scroll
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${parallaxIntensity * 100}%`, `${parallaxIntensity * 100}%`]
    );

    return (
        <>
            <style jsx global>{`
        .parallax-section {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .parallax-section-clip {
          clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%);
        }

        .parallax-bg-container {
          position: fixed;
          top: -15vh;
          left: 0;
          height: 130vh;
          width: 100%;
          z-index: 0;
        }

        .parallax-bg-image {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .parallax-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .parallax-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }
      `}</style>

            <div
                ref={containerRef}
                className={`parallax-section parallax-section-clip ${className}`}
                style={{ minHeight }}
            >
                {/* Fixed Background with Parallax */}
                <div className="parallax-bg-container">
                    <motion.div style={{ y }} className="parallax-bg-image">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </motion.div>
                </div>

                {/* Overlay */}
                <div
                    className="parallax-overlay"
                    style={{
                        background: `rgba(0, 0, 0, ${overlayOpacity})`,
                    }}
                />

                {/* Content */}
                <div className="parallax-content">{children}</div>
            </div>
        </>
    );
}

/**
 * ParallaxImage - Componente de imagem com efeito parallax standalone
 * Para uso dentro de containers existentes
 */
interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    intensity?: number;
}

export function ParallaxImage({
    src,
    alt,
    className = '',
    intensity = 0.1,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${intensity * 100}%`, `${intensity * 100}%`]
    );

    return (
        <div
            ref={containerRef}
            className={`parallax-image-container ${className}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
            }}
        >
            <motion.div
                style={{
                    y,
                    position: 'relative',
                    width: '100%',
                    height: '120%',
                    top: '-10%',
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </motion.div>
        </div>
    );
}
