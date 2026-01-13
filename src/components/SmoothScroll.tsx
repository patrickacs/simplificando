'use client';

import { useEffect, useRef, ReactNode, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Context para compartilhar scroll info
interface ScrollContextType {
    scrollY: number;
    direction: 'up' | 'down' | null;
    lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({ scrollY: 0, direction: null, lenis: null });

export function useScrollInfo() {
    return useContext(ScrollContext);
}

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const [direction, setDirection] = useState<'up' | 'down' | null>(null);
    const lastScrollY = useRef(0);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Handler de scroll
        const handleScroll = (e: { scroll: number; velocity: number }) => {
            ScrollTrigger.update();

            const currentY = e.scroll;
            const delta = currentY - lastScrollY.current;

            // Threshold para detectar mudança de direção
            const directionThreshold = 1;

            // Atualizar apenas se houver movimento significativo
            if (Math.abs(delta) > directionThreshold) {
                const newDirection = delta > 0 ? 'down' : 'up';

                // Atualizar scrollY
                setScrollY(currentY);

                // Atualizar direction apenas se mudou
                setDirection(prev => prev !== newDirection ? newDirection : prev);

                lastScrollY.current = currentY;
            }
        };

        lenis.on('scroll', handleScroll);

        // RAF loop para o Lenis
        function raf(time: number) {
            lenis.raf(time);
            rafId.current = requestAnimationFrame(raf);
        }

        rafId.current = requestAnimationFrame(raf);

        return () => {
            lenis.off('scroll', handleScroll);
            lenis.destroy();
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    // Valor do contexto com lenis ref
    const contextValue: ScrollContextType = {
        scrollY,
        direction,
        lenis: lenisRef.current
    };

    return (
        <ScrollContext.Provider value={contextValue}>
            {children}
        </ScrollContext.Provider>
    );
}
