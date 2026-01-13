'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import QuizModal from './Quiz/QuizModal';
import { useScrollInfo } from './SmoothScroll';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Extensivo', href: '/extensivo' },
  { name: 'Intensivo', href: '/intensivo' },
  { name: 'Imersão', href: '/imersao' },
  { name: '360', href: '/360' },
];

// Logo mapping by route - using white logo for all
const logoConfig: Record<string, string> = {
  '/': '/logos/white/LOGO HORIZONTAL BRANCA.png',
  '/extensivo': '/logos/white/LOGO HORIZONTAL BRANCA.png',
  '/intensivo': '/logos/white/LOGO HORIZONTAL BRANCA.png',
  '/imersao': '/logos/white/LOGO HORIZONTAL BRANCA.png',
  '/360': '/logos/white/LOGO HORIZONTAL BRANCA.png',
};

// ============================
// CORES POR ROTA
// ============================
// Mapeamento de cores por rota - usado no header e page transition
export const routeColors: Record<string, string> = {
  '/': '#00B0FF',          // Azul - Home
  '/extensivo': '#9B59B6', // Roxo - Extensivo
  '/intensivo': '#27AE60', // Verde - Intensivo
  '/imersao': '#E67E22',   // Laranja - Imersão
  '/360': '#00B0FF',       // Azul - 360
};

// Verifica se é a home (para liquid glass)
const isHomePage = (pathname: string) => pathname === '/';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Usar scroll info do Lenis
  const { scrollY, direction } = useScrollInfo();

  const currentLogo = logoConfig[pathname] || logoConfig['/'];
  const routeColor = routeColors[pathname] || routeColors['/'];
  const isHome = isHomePage(pathname);

  // Simple scroll-based visibility
  useEffect(() => {
    const threshold = 100;

    if (scrollY < threshold) {
      setIsVisible(true);
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
      if (direction === 'down') {
        setIsVisible(false);
      } else if (direction === 'up') {
        setIsVisible(true);
      }
    }
  }, [scrollY, direction]);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Determinar o estilo do header baseado na rota e scroll
  const getHeaderStyle = () => {
    // Home: liquid glass no topo, solid quando scrollar
    if (isHome) {
      return isAtTop ? 'glass' : 'solid-home';
    }
    // Outras rotas: sempre cor sólida da rota
    return 'solid-route';
  };

  const headerStyle = getHeaderStyle();

  return (
    <>
      <style jsx global>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          padding: 1rem 2rem;
          transition: transform 0.5s ease-out, opacity 0.3s ease;
          transform: translateY(0);
          opacity: 1;
        }
        .nav-wrapper.hidden {
          transform: translateY(-110%);
          opacity: 0;
        }
        
        .nav-pill {
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Liquid Glass Effect - APENAS Home no topo */
        .nav-pill.glass {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        /* Solid Home - quando scroll na home */
        .nav-pill.solid-home {
          background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
          border: 1px solid transparent;
          box-shadow: 0 4px 30px rgba(0,0,0,0.25);
          backdrop-filter: none;
        }

        /* Solid Route - cor da rota (sem glass) */
        .nav-pill.solid-route {
          border: 1px solid transparent;
          box-shadow: 0 4px 30px rgba(0,0,0,0.25);
          backdrop-filter: none;
        }
        
        .nav-logo {
          height: 36px;
          width: auto;
          object-fit: contain;
          margin-left: 0.5rem;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .desktop-nav { 
          display: flex; 
          align-items: center; 
          gap: 1.75rem; 
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: white;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        
        /* CTA Button */
        .nav-cta {
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: white;
          border-radius: 9999px;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: 2px solid transparent;
        }
        .nav-cta.solid {
          border-color: currentColor;
        }
        .nav-cta.solid:hover {
          background: transparent !important;
          border-color: white;
        }
        
        .mobile-controls {
          display: none;
          align-items: center;
          gap: 0.75rem;
        }
        .mobile-cta {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          border-radius: 9999px;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: 2px solid transparent;
        }
        .mobile-cta:hover {
          background: transparent !important;
          border-color: white;
        }
        .mobile-menu-btn {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          z-index: 300;
          backdrop-filter: blur(10px);
        }
        .mobile-menu-btn span {
          width: 20px;
          height: 2px;
          background: white;
          display: block;
          transition: all 0.3s ease;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100vh;
          z-index: 250;
          padding: 100px 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: -10px 0 30px rgba(0,0,0,0.3);
        }
        .mobile-nav-link {
          font-size: 1.25rem;
          font-weight: 600;
          padding: 1rem 0;
          color: rgba(255,255,255,0.9);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          transition: color 0.2s ease;
          display: block;
        }
        .mobile-nav-link:hover {
          color: white;
        }
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 240;
        }
        @media (max-width: 1024px) {
          .desktop-nav { gap: 1.25rem; }
          .nav-link { font-size: 0.85rem; }
        }
        @media (max-width: 900px) {
          .nav-wrapper {
            padding: 0.75rem 1rem;
          }
          .nav-pill {
            padding: 0.6rem 1rem;
          }
          .desktop-nav { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-controls { display: flex !important; }
          .nav-logo { height: 28px; }
        }
        @media (max-width: 480px) {
          .nav-wrapper {
            padding: 0.5rem 0.75rem;
          }
          .nav-pill {
            padding: 0.5rem 0.75rem;
          }
          .nav-logo { height: 24px; }
          .mobile-cta { 
            font-size: 0.75rem;
            padding: 0.4rem 0.75rem;
          }
          .mobile-menu {
            width: 100%;
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`nav-wrapper ${isVisible ? 'visible' : 'hidden'}`}
      >
        <div
          className={`nav-pill ${headerStyle}`}
          style={headerStyle === 'solid-route' ? { background: routeColor } : undefined}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src={currentLogo}
                alt="Simplificando a Jornada"
                width={160}
                height={36}
                className="nav-logo"
                priority
              />
            </motion.div>
          </Link>

          <div className="nav-right">
            <div className="desktop-nav">
              {navLinks.map((link, index) => (
                <motion.div key={link.name} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + index * 0.1 }}>
                  <Link href={link.href} className="nav-link">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="nav-cta solid"
              style={{
                backgroundColor: isButtonHovered ? 'transparent' : (isHome ? routeColor : 'rgba(255,255,255,0.2)'),
                borderColor: isButtonHovered ? 'white' : (isHome ? routeColor : 'rgba(255,255,255,0.5)')
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsQuizOpen(true)}
            >
              Qual curso é pra mim?
            </motion.button>
          </div>

          {/* Mobile Controls - Button + Hamburger */}
          <div className="mobile-controls">
            <motion.button
              className="mobile-cta"
              style={{
                backgroundColor: isHome ? routeColor : 'rgba(255,255,255,0.2)',
                borderColor: isHome ? routeColor : 'rgba(255,255,255,0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsQuizOpen(true)}
            >
              Qual curso?
            </motion.button>

            <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Menu">
              <motion.span animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} />
              <motion.span animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }} />
              <motion.span animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              style={{ background: routeColor }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="mobile-nav-link"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
