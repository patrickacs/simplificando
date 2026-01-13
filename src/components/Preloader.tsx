'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

interface PreloaderProps {
    onComplete?: () => void;
}

// Imagens ordenadas para que a do CENTRO (índice 2) seja a primeira do Hero
const images = [
    '/home/carrossel/home-image.jpeg',      // Esquerda 1
    '/home/carrossel/IMG_1865.jpg',          // Esquerda 2  
    '/home/carrossel/IMG_7130.jpg',          // CENTRO - Primeira imagem do Hero
    '/home/carrossel/IMG_0906.jpg',          // Direita 1
    '/home/carrossel/home-carrossel2.jpg',   // Direita 2
];

const overlayTexts = ['Bem-vindo', 'Simplificando', 'Sua Jornada'];

export default function Preloader({ onComplete }: PreloaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';

        const counterObj = { value: 0 };

        const tl = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
                document.body.style.overflow = '';
                setIsVisible(false);
                onComplete?.();
            }
        });

        // ===== FASE 1: Counter (0s - 2.5s) =====
        tl.to(counterObj, {
            value: 100,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => setCounter(Math.floor(counterObj.value))
        }, 0);

        // Overlay texts
        tl.to('.overlay-text', { y: '0', duration: 0.6 }, 0.3);
        tl.to('.overlay-text', { y: '-2rem', duration: 0.6 }, 0.9);
        tl.to('.overlay-text', { y: '-4rem', duration: 0.6 }, 1.5);
        tl.to('.overlay-text', { y: '-6rem', duration: 0.6 }, 2.1);

        // ===== FASE 2: Imagens aparecem (0.4s) =====
        tl.to('.preloader-img', {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: { from: 'center', amount: 0.3 },
            duration: 1.2,
            ease: 'power3.out'
        }, 0.4);

        // ===== FASE 3: Gap fecha (2s) =====
        tl.to('.hero-images-container', {
            gap: '0px',
            duration: 1.5,
            ease: 'power2.inOut'
        }, 2);

        // ===== FASE 4: Laterais somem (3s) =====
        tl.to('.preloader-img:not(.center-img)', {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.inOut'
        }, 3);

        // ===== FASE 5: Imagem central expande (3.2s) =====
        // Adiciona overlay gradiente igual ao Hero
        tl.to('.center-img-overlay', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, 3.2);

        tl.to('.center-img', {
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            duration: 1.5,
            ease: 'power4.inOut'
        }, 3.2);

        // Esconde counter e textos
        tl.to('.preloader-overlay', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, 4);

        // ===== FASE 6: Fade out (4.7s) =====
        tl.to('.preloader', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, 4.7);

        return () => {
            tl.kill();
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <style jsx global>{`
                        .preloader {
                            position: fixed;
                            inset: 0;
                            z-index: 9999;
                            overflow: hidden;
                            background: #0a0a0a;
                        }

                        .preloader-overlay {
                            position: absolute;
                            inset: 0;
                            z-index: 100;
                            pointer-events: none;
                        }

                        .counter {
                            position: absolute;
                            right: 3rem;
                            bottom: 3rem;
                            color: #fff;
                        }

                        .counter h1 {
                            font-size: 5rem;
                            font-weight: 300;
                            margin: 0;
                            font-variant-numeric: tabular-nums;
                        }

                        .overlay-text-container {
                            position: absolute;
                            top: 3rem;
                            left: 3rem;
                            height: 2rem;
                            overflow: hidden;
                        }

                        .overlay-text {
                            display: flex;
                            flex-direction: column;
                            transform: translateY(2rem);
                        }

                        .overlay-text p {
                            color: #fff;
                            height: 2rem;
                            display: flex;
                            align-items: center;
                            margin: 0;
                            font-size: 0.85rem;
                            font-weight: 500;
                            text-transform: uppercase;
                            letter-spacing: 0.1em;
                        }

                        /* Container das imagens - z-index baixo para ficar atrás do overlay de textos */
                        .hero-images-container {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 1.5vw;
                            z-index: 10;
                        }

                        .preloader-img {
                            width: 16vw;
                            height: 9vw;
                            transform: translateY(30px) scale(0.9);
                            opacity: 0;
                            position: relative;
                            border-radius: 12px;
                            overflow: hidden;
                            flex-shrink: 0;
                        }

                        .preloader-img img {
                            object-fit: cover;
                            object-position: center 30%;
                        }

                        /* Imagem central */
                        .center-img {
                            z-index: 20;
                        }

                        .center-img img {
                            object-position: center 25%; /* Mesmo do Hero */
                        }

                        /* Overlay gradiente igual ao Hero - aparece durante expansão */
                        .center-img-overlay {
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(
                                180deg,
                                rgba(0, 0, 0, 0.3) 0%,
                                rgba(0, 0, 0, 0.5) 50%,
                                rgba(0, 0, 0, 0.7) 100%
                            );
                            opacity: 0;
                            z-index: 2;
                            pointer-events: none;
                        }

                        @media (max-width: 1200px) {
                            .preloader-img {
                                width: 18vw;
                                height: 10.125vw;
                            }
                        }

                        @media (max-width: 768px) {
                            .counter {
                                right: 1.5rem;
                                bottom: 1.5rem;
                            }
                            .counter h1 {
                                font-size: 3rem;
                            }
                            .overlay-text-container {
                                left: 1.5rem;
                                top: 1.5rem;
                            }
                            .hero-images-container {
                                gap: 1vw;
                            }
                            .preloader-img {
                                width: 20vw;
                                height: 11.25vw;
                            }
                        }
                    `}</style>

                    <div className="preloader">
                        {/* Overlay com counter e textos - acima das imagens */}
                        <div className="preloader-overlay">
                            <div className="counter">
                                <h1>{String(counter).padStart(2, '0')}</h1>
                            </div>
                            <div className="overlay-text-container">
                                <div className="overlay-text">
                                    {overlayTexts.map((text, i) => (
                                        <p key={i}>{text}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Container das 5 imagens */}
                        <div className="hero-images-container">
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className={`preloader-img ${index === 2 ? 'center-img' : ''}`}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        priority
                                        sizes={index === 2 ? '100vw' : '20vw'}
                                        quality={100}
                                    />
                                    {/* Overlay gradiente só na imagem central */}
                                    {index === 2 && (
                                        <div className="center-img-overlay" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
