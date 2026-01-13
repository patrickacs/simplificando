'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './Preloader';
import Navigation, { routeColors } from './Navigation';
import { useScrollInfo } from './SmoothScroll';

// Context para compartilhar estado do preloader
const PreloaderContext = createContext({
    isLoading: false,
    showingPreloader: false
});

export function usePreloader() {
    return useContext(PreloaderContext);
}

interface ClientWrapperProps {
    children: React.ReactNode;
}

// ============================
// CURVE ANIMATION VARIANTS
// ============================

// Animação do SVG (translate) - COMEÇA IMEDIATAMENTE
const svgTranslateVariants = {
    initial: {
        top: '-300px',
    },
    animate: {
        top: '-100vh',
        transition: {
            duration: 0.6,
            delay: 0,
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
        },
        transitionEnd: { top: '100vh' }
    },
    exit: {
        top: '-300px',
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
        }
    }
};

// Fade in do conteúdo
const contentFadeVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.3,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15,
        }
    }
};

// ============================
// COMPONENTE SVG DA CURVA
// ============================
interface CurveSVGProps {
    width: number;
    height: number;
    color: string;
}

const CurveSVG = ({ width, height, color }: CurveSVGProps) => {
    // Path inicial - curva no topo e na base
    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    // Path final - curva no topo, base reta
    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

    const curvePathVariants = {
        initial: {
            d: initialPath,
        },
        animate: {
            d: targetPath,
            transition: {
                duration: 0.5,
                delay: 0.1,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
            }
        },
        exit: {
            d: initialPath,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <motion.svg
            className="curve-svg"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={svgTranslateVariants}
        >
            <motion.path
                fill={color}
                variants={curvePathVariants}
            />
        </motion.svg>
    );
};

export default function ClientWrapper({ children }: ClientWrapperProps) {
    const pathname = usePathname();
    const { lenis } = useScrollInfo();

    // Estados
    const [showPreloader, setShowPreloader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [dimensions, setDimensions] = useState<{ width: number | null; height: number | null }>({
        width: null,
        height: null
    });

    // Cor fixa azul escuro para todas as transições
    const transitionColor = '#1e3a5f';

    // ============================
    // WINDOW DIMENSIONS
    // ============================
    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        resize();
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    // ============================
    // SCROLL TO TOP ON ROUTE CHANGE
    // ============================
    useEffect(() => {
        if (!showPreloader && isInitialized) {
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, showPreloader, isInitialized, lenis]);

    // ============================
    // LÓGICA DO PRELOADER
    // ============================
    useEffect(() => {
        try {
            const hasVisited = sessionStorage.getItem('simplificando_visited');

            if (!hasVisited) {
                setShowPreloader(true);
                setIsLoading(true);
            } else {
                setShowPreloader(false);
                setIsLoading(false);
            }
        } catch (e) {
            console.error('Error checking visited status:', e);
            setShowPreloader(false);
            setIsLoading(false);
        }

        setIsInitialized(true);
    }, []);

    // Callback quando o Preloader termina
    const handlePreloaderComplete = () => {
        try {
            sessionStorage.setItem('simplificando_visited', 'true');
        } catch (e) {
            console.error('Error setting visited status:', e);
        }
        setShowPreloader(false);
        setIsLoading(false);
    };

    // Não renderizar nada até inicializar
    if (!isInitialized) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#0a0a0a',
                zIndex: 9999
            }} />
        );
    }

    return (
        <PreloaderContext.Provider value={{
            isLoading,
            showingPreloader: showPreloader
        }}>
            <style jsx global>{`
                .page-curve {
                    position: relative;
                    min-height: 100vh;
                    background-color: #FEFFFA;
                }

                /* Background temporário enquanto dimensions carrega */
                .curve-background {
                    position: fixed;
                    inset: 0;
                    z-index: 9997;
                    transition: opacity 0s linear 0.1s;
                    pointer-events: none;
                }

                /* SVG da curva */
                .curve-svg {
                    position: fixed;
                    height: calc(100vh + 600px);
                    width: 100vw;
                    pointer-events: none;
                    left: 0;
                    top: 0;
                    z-index: 9996;
                }

                /* Conteúdo da página */
                .page-content {
                    position: relative;
                    z-index: 1;
                    min-height: 100vh;
                    background-color: #FEFFFA;
                }
            `}</style>

            {/* ============================
                PRELOADER (z-index 9999)
                ============================ */}
            {showPreloader && (
                <Preloader onComplete={handlePreloaderComplete} />
            )}

            {/* ============================
                NAVIGATION (z-index 200)
                ============================ */}
            <Navigation />

            {/* ============================
                PAGE TRANSITIONS COM CURVA SVG
                Cor baseada na rota de destino
                ============================ */}
            <main>
                <AnimatePresence mode="wait" onExitComplete={() => {
                    if (lenis) {
                        lenis.scrollTo(0, { immediate: true });
                    } else {
                        window.scrollTo(0, 0);
                    }
                }}>
                    <motion.div
                        key={pathname}
                        className="page-curve"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* Background temporário - cor da rota */}
                        <div
                            className="curve-background"
                            style={{
                                opacity: dimensions.width === null ? 1 : 0,
                                backgroundColor: transitionColor
                            }}
                        />

                        {/* SVG da curva - COR BASEADA NA ROTA */}
                        {dimensions.width !== null && dimensions.height !== null && (
                            <CurveSVG
                                width={dimensions.width}
                                height={dimensions.height}
                                color={transitionColor}
                            />
                        )}

                        {/* Conteúdo da página com fade */}
                        <motion.div
                            className="page-content"
                            variants={contentFadeVariants}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </PreloaderContext.Provider>
    );
}
