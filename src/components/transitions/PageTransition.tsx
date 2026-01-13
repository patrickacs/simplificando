'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { routeText, svgTranslate, curvePath, contentFade, anim } from './anim';

// Mapeamento de rotas para nomes exibidos
const routes: Record<string, string> = {
    '/': 'Home',
    '/extensivo': 'Extensivo',
    '/intensivo': 'Intensivo',
    '/imersao': 'Imersão',
    '/360': '360',
};

interface PageTransitionProps {
    children: React.ReactNode;
}

// Componente SVG da curva
const CurveSVG = ({ width, height }: { width: number; height: number }) => {
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

    return (
        <motion.svg
            className="curve-svg"
            {...anim(svgTranslate)}
        >
            <motion.path
                fill="#0a0a0a"
                {...anim(curvePath(initialPath, targetPath))}
            />
        </motion.svg>
    );
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState<{ width: number | null; height: number | null }>({
        width: null,
        height: null
    });

    // Obtém o nome da rota atual
    const routeName = routes[pathname] || 'Página';

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

    return (
        <>
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
                    background-color: #0a0a0a;
                    z-index: 9999;
                    transition: opacity 0s linear 0.1s;
                }

                /* SVG da curva */
                .curve-svg {
                    position: fixed;
                    height: calc(100vh + 600px);
                    width: 100vw;
                    pointer-events: none;
                    left: 0;
                    top: 0;
                    z-index: 9998;
                }

                /* Texto da rota */
                .curve-route {
                    position: fixed;
                    left: 50%;
                    top: 40%;
                    transform: translateX(-50%);
                    color: white;
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    font-weight: 600;
                    z-index: 9999;
                    text-align: center;
                    pointer-events: none;
                    letter-spacing: 0.02em;
                }

                /* Conteúdo da página */
                .page-content {
                    position: relative;
                    z-index: 1;
                }
            `}</style>

            <div className="page-curve">
                {/* Background temporário - visível até dimensions carregar */}
                <div
                    className="curve-background"
                    style={{ opacity: dimensions.width === null ? 1 : 0 }}
                />

                {/* Texto da rota atual */}
                <motion.p className="curve-route" {...anim(routeText)}>
                    {routeName}
                </motion.p>

                {/* SVG da curva - só renderiza quando temos dimensions */}
                {dimensions.width !== null && dimensions.height !== null && (
                    <CurveSVG width={dimensions.width} height={dimensions.height} />
                )}

                {/* Conteúdo da página com fade */}
                <motion.div className="page-content" {...anim(contentFade)}>
                    {children}
                </motion.div>
            </div>
        </>
    );
}
