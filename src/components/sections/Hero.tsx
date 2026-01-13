'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { usePreloader } from '@/components/ClientWrapper';

interface HeroProps {
  onOpenQuiz?: () => void;
}

// Dados do carrossel - cada slide tem imagem, título, subtítulo e posição da imagem
// IMG_7130.jpg é o primeiro para sincronizar com o Preloader
const slides = [
  {
    image: '/home/carrossel/IMG_7130.jpg',
    title: ['Aprenda', 'com os Melhores'],
    subtitle: 'Professores experientes e dedicados que vão te guiar durante toda a sua preparação com material atualizado.',
    objectPosition: 'center 25%',
  },
  {
    image: '/home/carrossel/home-image.jpeg',
    title: ['Simplifique', 'a sua Jornada'],
    subtitle: 'O curso preparatório com 84% de aprovação e 4 primeiros lugares nas últimas Jornadas. Somos muito mais que um cursinho, somos uma família.',
    objectPosition: 'center 25%',
  },
  {
    image: '/home/carrossel/IMG_1865.jpg',
    title: ['Conquiste', 'seu Objetivo'],
    subtitle: 'Metodologia exclusiva desenvolvida por alunos da Link para maximizar seu desempenho no processo seletivo.',
    objectPosition: 'center center', // Centralizado
    wrapperWidth: '100%',
    wrapperHeight: '130%',

  },
  {
    image: '/home/carrossel/IMG_0906.jpg',
    title: ['Transforme', 'seu Futuro'],
    subtitle: 'Uma jornada de crescimento pessoal e acadêmico que vai além da aprovação, preparando você para os desafios da universidade.',
    objectPosition: 'center 25%',
  },
  {
    image: '/home/carrossel/home-carrossel2.jpg',
    title: ['Faça Parte', 'dessa História'],
    subtitle: 'Junte-se a mais de 255 alunos aprovados e transforme seu sonho em realidade com a nossa metodologia comprovada.',
    objectPosition: 'center 25%',
    wrapperTop: '-10%', // Ajuste específico para esta imagem - sobe um pouco
  },
];

const SLIDE_DURATION = 10000; // 10 segundos por slide (mais tempo entre trocas)

export default function Hero({ onOpenQuiz }: HeroProps) {
  const { isLoading } = usePreloader(); // Sincroniza com Preloader
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Animação de texto com mask
  const textAnimation = {
    initial: { y: '100%' },
    enter: (i: number) => ({
      y: '0%',
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        delay: 0.075 * i,
      },
    }),
    exit: (i: number) => ({
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        delay: 0.05 * i,
      },
    }),
  };

  // Função para avançar slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // Animação da barra de progresso - só roda se não estiver carregando (Preloader)
  useEffect(() => {
    if (isLoading) {
      // Se Preloader ainda está ativo, não inicia a animação
      return;
    }

    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        nextSlide();
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentSlide, nextSlide, isLoading]);

  // Ir para slide específico
  const goToSlide = (index: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setCurrentSlide(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  return (
    <>
      <style jsx global>{`
        .hero-carousel {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          padding: 0 4rem;
          padding-bottom: 4rem;
          position: relative;
          overflow: hidden;
          background: #000; /* Background preto para evitar flash cinza */
        }

        .hero-carousel-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #000; /* Fallback preto */
        }

        .hero-carousel-image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 130%; /* Maior para permitir parallax */
        }

        .hero-carousel-image {
          object-fit: cover;
          object-position: center 25%; /* Foca na parte superior para mostrar cabeças/rostos */
        }

        .hero-carousel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 1;
        }

        .hero-carousel-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
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
          align-self: flex-start;
        }

        .hero-title-carousel {
          margin-bottom: 1.5rem;
          text-align: left;
          line-height: 1.1;
          min-height: 200px; /* Previne layout shift */
        }

        .hero-line-mask {
          overflow: hidden;
          display: block;
          margin-bottom: -0.05em; /* Aproxima as linhas do título */
        }

        .hero-line-mask p {
          margin: 0;
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .hero-subtitle-carousel {
          max-width: 500px;
          margin: 0 0 2.5rem;
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          text-align: left;
          min-height: 80px; /* Previne layout shift */
        }

        .hero-cta-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 1rem;
        }

        .hero-btn-primary {
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          background: white;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .hero-btn-secondary {
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Slide Indicator (01 / 04) */
        .hero-slide-indicator {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-slide-current {
          font-size: 1rem;
          font-weight: 700;
          color: white;
        }

        .hero-slide-divider {
          width: 12px;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
        }

        .hero-slide-total {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Progress Bar - Bottom */
        .hero-progress-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          z-index: 3;
        }

        .hero-progress-bar {
          height: 100%;
          background: var(--color-primary);
          will-change: width;
        }

        /* Slide Dots Navigation */
        .hero-dots {
          position: absolute;
          right: 4rem;
          bottom: 6rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          z-index: 3;
        }
        
        .hero-dots-row {
          display: flex;
          gap: 0.75rem;
        }

        .hero-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-dot:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .hero-dot.active {
          background: var(--color-primary);
          transform: scale(1.2);
        }

        @media (max-width: 900px) {
          .hero-carousel {
            padding: 0 2rem;
            padding-bottom: 4rem;
          }

          .hero-slide-indicator {
            left: 2rem;
            bottom: 5rem;
          }

          .hero-dots {
            right: 2rem;
            bottom: 5rem;
          }
          
          .hero-title-carousel {
            min-height: 150px;
          }
        }

        @media (max-width: 600px) {
          .hero-carousel {
            padding: 0 1.5rem;
            padding-bottom: 4rem;
            justify-content: center;
          }

          .hero-slide-indicator {
            left: 1.5rem;
            bottom: 4rem;
          }

          .hero-dots {
            right: 1.5rem;
            bottom: 4rem;
          }

          .hero-slide-current {
            font-size: 1.25rem;
          }
          
          .hero-title-carousel {
            min-height: 120px;
          }
          
          .hero-subtitle-carousel {
            min-height: 60px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="hero-carousel hero-section">
        {/* Background Images - Crossfade com Parallax */}
        <div className="hero-carousel-bg">
          {/* Imagem atual com parallax */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="hero-carousel-image-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                y: parallaxY,
                top: (slides[currentSlide] as any).wrapperTop || '0%',
              }}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title.join(' ')}
                fill
                priority
                className="hero-carousel-image"
                sizes="100vw"
                style={{
                  objectPosition: slides[currentSlide].objectPosition,
                  transform: `scale(${(slides[currentSlide] as any).scale || 1})`,
                }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="hero-carousel-overlay" />
        </div>

        {/* Content */}
        <div className="hero-carousel-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-badge"
          >
            <span>🚀</span>
            <span>+255 alunos aprovados na Link</span>
          </motion.div>

          {/* Título com Text Mask Animation */}
          <div className="hero-title-carousel">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide}>
                {slides[currentSlide].title.map((line, index) => (
                  <div key={index} className="hero-line-mask">
                    <motion.p
                      custom={index}
                      variants={textAnimation}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    >
                      {line}
                    </motion.p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtítulo com animação */}
          <div className="hero-subtitle-carousel">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="hero-cta-wrapper">
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

        {/* Navigation: Indicator + Dots */}
        <div className="hero-dots">
          {/* Slide Indicator (01 / 05) */}
          <div className="hero-slide-indicator">
            <span className="hero-slide-current">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <div className="hero-slide-divider" />
            <span className="hero-slide-total">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Dots */}
          <div className="hero-dots-row">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar - Bottom */}
        <div className="hero-progress-container">
          <div
            className="hero-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>
    </>
  );
}
