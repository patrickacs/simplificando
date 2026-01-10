'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenQuiz?: () => void;
}

export default function Hero({ onOpenQuiz }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.from(chars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          delay: 0.3,
        });
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, '-=0.4');
      }

      if (ctaRef.current) {
        tl.from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6 }, '-=0.3');
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char" style={{ display: 'inline-block', opacity: 1 }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <style jsx global>{`
        .hero-section {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          text-align: left;
          padding: 0 4rem 4rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url('/home/home-image.jpeg');
          background-size: cover;
          background-position: center;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: white;
        }
        
        .hero-title {
          margin-bottom: 1.25rem;
          perspective: 1000px;
          text-align: left;
        }
        
        .hero-title-line {
          display: block;
        }
        
        .hero-title-gradient {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          max-width: 550px;
          margin: 0 0 2rem;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          text-align: left;
        }
        
        .hero-cta-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 1rem;
        }
        
        .hero-btn-primary {
          padding: 0.875rem 2rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text);
          background: white;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        .hero-btn-secondary {
          padding: 0.875rem 2rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: white;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        
        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
        
        @media (max-width: 900px) {
          .hero-section {
            padding: 0 2rem 3rem;
          }
          
          .hero-content {
            max-width: 100%;
          }
        }
        
        @media (max-width: 600px) {
          .hero-section {
            padding: 0 1.5rem 2.5rem;
            justify-content: center;
            text-align: center;
            align-items: center;
          }
          
          .hero-title,
          .hero-subtitle {
            text-align: center;
          }
          
          .hero-subtitle {
            margin: 0 auto 2rem;
          }
          
          .hero-cta-wrapper {
            justify-content: center;
            flex-direction: column;
            width: 100%;
          }
          
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
          }
          
          .hero-badge {
            font-size: 0.75rem;
            padding: 0.4rem 0.75rem;
          }
        }
      `}</style>

      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-badge"
          >
            <span>🚀</span>
            <span>+255 alunos aprovados na Link</span>
          </motion.div>

          <h1 ref={titleRef} className="hero-title">
            <span className="hero-title-line" style={{ color: 'white' }}>
              {splitText('Simplifique')}
            </span>
            <span className="hero-title-line hero-title-gradient">
              {splitText('sua Jornada')}
            </span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            O curso preparatório com <strong>84% de aprovação</strong> e{' '}
            <strong>4 primeiros lugares</strong> nas últimas Jornadas.
            Somos muito mais que um cursinho, somos uma família.
          </p>

          <div ref={ctaRef} className="hero-cta-wrapper">
            <motion.button
              className="hero-btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenQuiz}
            >
              Qual curso é pra mim?
            </motion.button>
            <motion.a
              href="#cursos"
              className="hero-btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conhecer os cursos
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
}
